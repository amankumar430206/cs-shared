// Fit maths for "will my ad fit this screen" — copied from cs-web
// src/lib/orientation.ts (the parts not already in ./screens). Keep in sync.
import { parseResolution, type ScreenOrientation } from "./screens";

export type MediaShape = ScreenOrientation | "SQUARE";

export interface Dimensions {
  width: number;
  height: number;
}

export interface ScreenShapeSource {
  orientation?: ScreenOrientation | null;
  resolutionWidth?: number | null;
  resolutionHeight?: number | null;
  resolution?: string | null;
}

const SQUARE_TOLERANCE = 0.05;

export function getMediaShape({ width, height }: Dimensions): MediaShape {
  const ratio = width / height;
  if (Math.abs(ratio - 1) <= SQUARE_TOLERANCE) return "SQUARE";
  return ratio > 1 ? "LANDSCAPE" : "PORTRAIT";
}

export function screenDimensions(screen: ScreenShapeSource): Dimensions | null {
  if (screen.resolutionWidth && screen.resolutionHeight) {
    return { width: screen.resolutionWidth, height: screen.resolutionHeight };
  }
  const parsed = parseResolution(screen.resolution);
  if (!parsed) return null;
  // An explicit orientation that contradicts the string wins — the panel is mounted rotated.
  if (screen.orientation && getMediaShape(parsed) !== "SQUARE" && getMediaShape(parsed) !== screen.orientation) {
    return { width: parsed.height, height: parsed.width };
  }
  return parsed;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const KNOWN_RATIOS: Array<[number, number]> = [
  [16, 9],
  [9, 16],
  [4, 3],
  [3, 4],
  [21, 9],
  [1, 1],
  [4, 5],
  [5, 4],
  [3, 2],
  [2, 3],
];

export function aspectLabel({ width, height }: Dimensions): string {
  const ratio = width / height;
  for (const [w, h] of KNOWN_RATIOS) {
    if (Math.abs(ratio - w / h) / (w / h) < 0.02) return `${w}:${h}`;
  }
  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;
  if (w <= 32 && h <= 32) return `${w}:${h}`;
  return ratio >= 1 ? `${ratio.toFixed(2)}:1` : `1:${(1 / ratio).toFixed(2)}`;
}

export function shapeLabel(shape: MediaShape): string {
  return shape === "LANDSCAPE" ? "Landscape" : shape === "PORTRAIT" ? "Portrait" : "Square";
}

export interface FitResult {
  /** The media fills the screen edge-to-edge (within 2%). */
  fillsScreen: boolean;
  /** Orientation differs (portrait on landscape or vice versa) — the case worth warning about. */
  orientationMismatch: boolean;
  /** Share of the screen's area the media actually covers, 0–100. */
  usedAreaPct: number;
  /** Where the black bars go under contain-fit. */
  bars: "sides" | "top-bottom" | null;
}

export function computeFit(media: Dimensions, screen: Dimensions): FitResult {
  const mediaRatio = media.width / media.height;
  const screenRatio = screen.width / screen.height;
  const usedArea = mediaRatio > screenRatio ? screenRatio / mediaRatio : mediaRatio / screenRatio;
  const fillsScreen = usedArea >= 0.98;
  const mediaShape = getMediaShape(media);
  const screenShape = getMediaShape(screen);
  return {
    fillsScreen,
    orientationMismatch:
      mediaShape !== "SQUARE" && screenShape !== "SQUARE" && mediaShape !== screenShape,
    usedAreaPct: Math.round(usedArea * 100),
    bars: fillsScreen ? null : mediaRatio > screenRatio ? "top-bottom" : "sides",
  };
}
