import {
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const hasSanityConfig = Boolean(
  rawProjectId &&
    rawDataset &&
    rawProjectId !== "undefined" &&
    rawDataset !== "undefined" &&
    /^[a-z0-9-]+$/.test(rawProjectId)
);

const config = {
  dataset: hasSanityConfig ? rawDataset : "production",
  projectId: hasSanityConfig ? rawProjectId : "mock-project-id",
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

// Image Address Generator with safe fallback when Sanity is unconfigured or local image strings are used.
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
    return createImageUrlBuilder(config).image(source);
  } catch {
    return createFallbackImageBuilder("/img/banner.jpg");
  }
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

const realClient = hasSanityConfig ? createClient(config) : null;
const realPreviewClient = hasSanityConfig
  ? createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

const mockClient = {
  fetch: async () => null,
};

export const client = realClient || mockClient;
export const previewClient = realPreviewClient || mockClient;

export const getClient = (usePreview) =>
  usePreview ? previewClient : client;

export default client;