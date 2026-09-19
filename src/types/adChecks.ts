// Copied from cs-web src/lib/adChecks.ts — keep in sync.
// The "is my ad OK?" checklist the campaign builder shows right after an
// upload, and the per-screen "will it fit?" check on the screens step. Pure,
// so the mobile app can share it later (see the mobile plan in PHASES.md).
// Dimensions/length come from cs-api, which measures the uploaded file itself
// (images via image-size, video via its MP4/MOV headers).
import { computeFit, getMediaShape, screenDimensions, type Dimensions, type MediaShape, type ScreenShapeSource } from "./orientation";

export const AD_FORMATS = ["JPG", "PNG", "GIF", "MP4", "MOV"] as const;
export const AD_MAX_FILE_MB = 50;
export const AD_MAX_VIDEO_SECONDS = 120;
/** Below this on the short edge an ad looks soft on most screens — a warning, never a block. */
const MIN_SHORT_EDGE_PX = 720;

export type CheckState = "ok" | "warn";

export interface AdCheck {
  key: "format" | "size" | "resolution" | "orientation" | "length";
  state: CheckState;
  /** Values for the i18n message (builder.checks.<key>.<state>). */
  values: Record<string, string | number>;
}

export interface AdFacts {
  contentType: string;
  fileSize: number;
  width: number | null;
  height: number | null;
  durationSeconds: number | null;
}

const formatOf = (contentType: string) =>
  ({ "image/jpeg": "JPG", "image/png": "PNG", "image/gif": "GIF", "video/mp4": "MP4", "video/quicktime": "MOV" })[contentType] ?? contentType;

export function isVideo(contentType: string) {
  return contentType.startsWith("video/");
}

export function adChecks(ad: AdFacts): AdCheck[] {
  const checks: AdCheck[] = [
    { key: "format", state: "ok", values: { format: formatOf(ad.contentType) } },
    { key: "size", state: ad.fileSize <= AD_MAX_FILE_MB * 1024 * 1024 ? "ok" : "warn", values: { mb: Math.max(0.1, Math.round((ad.fileSize / 1024 / 1024) * 10) / 10) } },
  ];
  if (ad.width && ad.height) {
    const shortEdge = Math.min(ad.width, ad.height);
    checks.push({ key: "resolution", state: shortEdge >= MIN_SHORT_EDGE_PX ? "ok" : "warn", values: { width: ad.width, height: ad.height } });
    checks.push({ key: "orientation", state: "ok", values: { shape: getMediaShape({ width: ad.width, height: ad.height }) } });
  }
  if (isVideo(ad.contentType) && ad.durationSeconds) {
    checks.push({ key: "length", state: ad.durationSeconds <= AD_MAX_VIDEO_SECONDS ? "ok" : "warn", values: { seconds: ad.durationSeconds } });
  }
  return checks;
}

export type Compatibility = "fits" | "bars" | "rotated" | "unknown";

/**
 * How an ad will sit on one screen. "rotated" (portrait ad on a landscape
 * screen or vice versa) is the case worth an "Action required" warning;
 * "bars" means it shows whole with thin empty edges. Warn-only — nothing is
 * ever blocked (the player always shows the whole ad, never crops it).
 */
export function compatibilityOf(ad: Dimensions | null, screen: ScreenShapeSource): Compatibility {
  const screenDims = screenDimensions(screen);
  if (!ad || !screenDims) return "unknown";
  const fit = computeFit(ad, screenDims);
  if (fit.orientationMismatch) return "rotated";
  return fit.fillsScreen ? "fits" : "bars";
}

export function shapeKey(shape: MediaShape) {
  return shape.toLowerCase() as "landscape" | "portrait" | "square";
}
