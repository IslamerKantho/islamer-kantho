/**
 * @fileoverview Secure Sanity Webhook Revalidation Endpoint (/api/revalidate)
 * Authenticates incoming Sanity publish/update/delete events via HMAC signature
 * (`sanity-webhook-signature`) or Bearer secret (`SANITY_REVALIDATE_SECRET`),
 * then purges both Next.js cache tags (`revalidateTag`) and Pages Router ISR routes (`res.revalidate`).
 */
import crypto from "crypto";
import { revalidateTag } from "next/cache";

/**
 * Constant-time string comparison to prevent timing attacks.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Verifies Sanity webhook HMAC signature (`t=<timestamp>,v1=<signature>`) or Bearer/header token.
 * @param {import("next").NextApiRequest} req
 * @param {string} secret
 * @returns {boolean}
 */
function verifyWebhookRequest(req, secret) {
  // 1. Check Authorization: Bearer <secret> or x-sanity-webhook-secret header
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    if (safeCompare(token, secret)) return true;
  }

  const customSecretHeader = req.headers["x-sanity-webhook-secret"];
  if (
    typeof customSecretHeader === "string" &&
    safeCompare(customSecretHeader.trim(), secret)
  ) {
    return true;
  }

  // 2. Check Sanity HMAC signature header: sanity-webhook-signature: t=1680000000,v1=...
  const signatureHeader = req.headers["sanity-webhook-signature"];
  if (typeof signatureHeader === "string") {
    const parts = Object.fromEntries(
      signatureHeader.split(",").map((part) => {
        const [k, ...v] = part.trim().split("=");
        return [k, v.join("=")];
      })
    );
    const timestamp = parts.t;
    const providedSignature = parts.v1;

    if (timestamp && providedSignature) {
      const rawBody =
        typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body || {});
      const payloadToSign = `${timestamp}.${rawBody}`;

      const expectedBase64Url = crypto
        .createHmac("sha256", secret)
        .update(payloadToSign)
        .digest("base64url");
      const expectedHex = crypto
        .createHmac("sha256", secret)
        .update(payloadToSign)
        .digest("hex");

      if (
        safeCompare(providedSignature, expectedBase64Url) ||
        safeCompare(providedSignature, expectedHex)
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Attempts to call Next.js revalidateTag() safely without throwing if invoked outside an incremental cache context.
 * @param {string[]} tags
 * @returns {string[]} List of tags processed
 */
function purgeCacheTags(tags) {
  const purged = [];
  for (const tag of tags) {
    if (!tag || typeof tag !== "string") continue;
    try {
      revalidateTag(tag);
      purged.push(tag);
    } catch {
      // In Pages Router dev or standalone mode without an incremental cache store,
      // revalidateTag may be a no-op while res.revalidate handles path purging.
      purged.push(tag);
    }
  }
  return purged;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      revalidated: false,
      message: "Method Not Allowed. Use POST.",
    });
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return res.status(503).json({
      revalidated: false,
      message:
        "SANITY_REVALIDATE_SECRET is not configured on the server.",
    });
  }

  if (!verifyWebhookRequest(req, secret)) {
    return res.status(401).json({
      revalidated: false,
      message: "Invalid webhook signature or authentication token.",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const docType = body._type || "post";
    const rawSlug =
      typeof body.slug === "string" ? body.slug : body.slug?.current;
    const slug =
      typeof rawSlug === "string" && /^[a-zA-Z0-9_-]+$/.test(rawSlug)
        ? rawSlug
        : null;

    const tagsToPurge = new Set(["sanity"]);
    const pathsToRevalidate = new Set(["/"]);

    if (Array.isArray(body.tags)) {
      for (const customTag of body.tags) {
        if (typeof customTag === "string" && customTag.length < 128) {
          tagsToPurge.add(customTag);
        }
      }
    }

    switch (docType) {
      case "post": {
        tagsToPurge.add("post");
        tagsToPurge.add("featured");
        tagsToPurge.add("recommended");
        if (slug) {
          tagsToPurge.add(`post:${slug}`);
          pathsToRevalidate.add(`/article/${slug}`);
        }
        if (Array.isArray(body.categories)) {
          for (const cat of body.categories) {
            const catSlug = typeof cat === "string" ? cat : cat?.slug?.current || cat?.slug;
            if (typeof catSlug === "string" && /^[a-zA-Z0-9_-]+$/.test(catSlug)) {
              tagsToPurge.add(`category:${catSlug}`);
            }
          }
        }
        break;
      }
      case "category": {
        tagsToPurge.add("category");
        tagsToPurge.add("post");
        if (slug) {
          tagsToPurge.add(`category:${slug}`);
        }
        break;
      }
      case "gallery": {
        tagsToPurge.add("gallery");
        pathsToRevalidate.add("/gallery");
        break;
      }
      case "page": {
        tagsToPurge.add("page");
        if (slug) {
          tagsToPurge.add(`page:${slug}`);
          pathsToRevalidate.add(`/${slug}`);
        }
        break;
      }
      case "siteSettings": {
        tagsToPurge.add("siteSettings");
        pathsToRevalidate.add("/gallery");
        break;
      }
      default: {
        tagsToPurge.add(docType);
        break;
      }
    }

    const revalidatedTags = purgeCacheTags(Array.from(tagsToPurge));

    const revalidatedPaths = [];
    for (const routePath of pathsToRevalidate) {
      try {
        await res.revalidate(routePath);
        revalidatedPaths.push(routePath);
      } catch {
        // Ignore path revalidation failure if a dynamic path hasn't been statically generated yet
      }
    }

    return res.status(200).json({
      revalidated: true,
      documentType: docType,
      slug,
      tags: revalidatedTags,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({
      revalidated: false,
      message: "Failed to process revalidation webhook.",
      error: err?.message || "Unknown error",
    });
  }
}
