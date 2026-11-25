import {
  groq,
  createClient,
  createImageUrlBuilder,
} from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const rawApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2023-05-03";

const PLACEHOLDER_PROJECT_ID_PATTERNS = [
  /^undefined$/i,
  /^null$/i,
  /^your[-_]/i,
  /project[-_]?id/i,
  /placeholder/i,
  /^unconfigured/i,
  /^example/i,
  /^changeme$/i,
];

const isPlaceholderProjectId = (id) =>
  !id || PLACEHOLDER_PROJECT_ID_PATTERNS.some((pattern) => pattern.test(id));

export const hasSanityConfig = Boolean(
  rawProjectId &&
    rawDataset &&
    !isPlaceholderProjectId(rawProjectId) &&
    rawDataset !== "undefined" &&
    rawDataset !== "null" &&
    /^[a-z0-9-]+$/.test(rawProjectId)
);

export const sanityConfig = {
  projectId: hasSanityConfig ? rawProjectId : "unconfigured-project-id",
  dataset: hasSanityConfig ? rawDataset : "production",
  apiVersion: rawApiVersion,
  useCdn: process.env.NODE_ENV === "production",
};

const createFallbackImageBuilder = (fallbackUrl = "/img/banner.jpg") => {
  const builder = {
    width: () => builder,
    height: () => builder,
    fit: () => builder,
    auto: () => builder,
    format: () => builder,
    quality: () => builder,
    crop: () => builder,
    focalPoint: () => builder,
    url: () => fallbackUrl,
  };
  return builder;
};

/**
 * Generates Sanity image URLs from a Sanity image source object with automatic
 * format negotiation (.auto('format')) and max fit, falling back cleanly when
 * local image paths or unconfigured credentials are used.
 */
export const imageBuilder = (source) => {
  if (!source) {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
  if (typeof source === "string") {
    if (source.startsWith("https://cdn.sanity.io/")) {
      const separator = source.includes("?") ? "&" : "?";
      const optimizedUrl = source.includes("auto=format")
        ? source
        : `${source}${separator}auto=format&fit=max&q=80`;
      return createFallbackImageBuilder(optimizedUrl);
    }
    return createFallbackImageBuilder(source);
  }
  if (typeof source?.url === "string") {
    return imageBuilder(source.url);
  }
  if (typeof source?.asset?.url === "string" && !source?.asset?._ref) {
    return imageBuilder(source.asset.url);
  }
  if (!hasSanityConfig) {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
  try {
    return createImageUrlBuilder(sanityConfig)
      .image(source)
      .auto("format")
      .fit("max")
      .quality(80);
  } catch {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
};

const configuredClient = hasSanityConfig ? createClient(sanityConfig) : null;
const configuredPreviewClient = hasSanityConfig
  ? createClient({
      ...sanityConfig,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

const createSafeClient = (underlyingClient) => ({
  config: () => sanityConfig,
  fetch: async (query, params = {}, options) => {
    if (!hasSanityConfig || !underlyingClient) {
      return null;
    }
    if (options) {
      return await underlyingClient.fetch(query, params, options);
    }
    return await underlyingClient.fetch(query, params);
  },
});

export const client = createSafeClient(configuredClient);
export const previewClient = createSafeClient(configuredPreviewClient);

export const getClient = (usePreview = false) =>
  usePreview ? previewClient : client;

/**
 * Unified Sanity fetch wrapper supporting Next.js tag-based cache invalidation (`next: { tags }`).
 *
 * @param {Object} options
 * @param {string} options.query - GROQ query string
 * @param {Record<string, any>} [options.params] - Parameterized GROQ variables
 * @param {string[]} [options.tags] - Cache tags for on-demand revalidation via revalidateTag()
 * @param {boolean} [options.preview] - Whether to use the uncached preview client
 * @returns {Promise<any>}
 */
export async function sanityFetch({
  query,
  params = {},
  tags = [],
  preview = false,
}) {
  if (!hasSanityConfig) {
    return null;
  }
  const activeClient = getClient(preview);
  const fetchOptions = preview
    ? { cache: "no-store", next: { revalidate: 0 } }
    : {
        next: {
          tags: Array.isArray(tags) && tags.length > 0 ? tags : ["sanity"],
        },
      };

  return await activeClient.fetch(query, params, fetchOptions);
}

/**
 * Helper to fetch content from the configured Sanity project ID and dataset.
 */
export async function fetchSanityContent(
  query,
  params = {},
  usePreview = false,
  tags = []
) {
  return await sanityFetch({
    query,
    params,
    tags,
    preview: usePreview,
  });
}

export { groq };
export default client;

