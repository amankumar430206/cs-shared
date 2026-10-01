// The API returns smaller WebP copies of uploaded images next to the original (see cs-api
// shared/utils/imageVariants.js). Use the thumbnail in lists and small tiles, the preview on detail
// pages, and the original (downloadUrl) only for the full-size viewer, downloads and playback.
// Both are null for older images, videos and anything that could not be decoded, so these fall back
// to the original.
export interface ImageVariantUrls {
  thumbUrl?: string | null;
  previewUrl?: string | null;
}

type WithOriginal = ImageVariantUrls & { downloadUrl: string };

export const thumbSrc = (item: WithOriginal): string => item.thumbUrl ?? item.downloadUrl;
export const previewSrc = (item: WithOriginal): string => item.previewUrl ?? item.downloadUrl;
