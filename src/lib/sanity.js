import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const rawApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2023-05-03";

export const hasSanityConfig = Boolean(
  rawProjectId &&
    rawDataset &&
    rawProjectId !== "undefined" &&
    rawDataset !== "undefined" &&
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
 * Generates Sanity image URLs from a Sanity image source object,
 * falling back cleanly when local image paths or unconfigured credentials are used.
 */
export const imageBuilder = (source) => {
  if (!source) {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
  if (typeof source === "string") {
    return createFallbackImageBuilder(source);
  }
  if (typeof source?.url === "string") {
    return createFallbackImageBuilder(source.url);
  }
  if (typeof source?.asset?.url === "string") {
    return createFallbackImageBuilder(source.asset.url);
  }
  if (!hasSanityConfig) {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
  try {
    return createImageUrlBuilder(sanityConfig).image(source);
  } catch {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
};

export const usePreviewSubscription =
  createPreviewSubscriptionHook(sanityConfig);

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
  fetch: async (query, params = {}) => {
    if (!hasSanityConfig || !underlyingClient) {
      return null;
    }
    return await underlyingClient.fetch(query, params);
  },
});

export const client = createSafeClient(configuredClient);
export const previewClient = createSafeClient(configuredPreviewClient);

export const getClient = (usePreview = false) =>
  usePreview ? previewClient : client;

/**
 * Helper to fetch content from the configured Sanity project ID and dataset.
 */
export async function fetchSanityContent(query, params = {}, usePreview = false) {
  if (!hasSanityConfig) {
    return null;
  }
  const activeClient = getClient(usePreview);
  return await activeClient.fetch(query, params);
}

export { groq };
export default client;
