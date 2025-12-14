import type { Tokens, ShadowToken, ShadowLayer, ColorValue } from "./utils.js";
import { readTokens, writeTokens } from "./utils.js";

// ============================================================================
// Types
// ============================================================================

interface ShadowEffect {
  type: string;
  color: string;
  offset: [number, number];
  radius: number;
  spread: number;
}

// ============================================================================
// Constants
// ============================================================================

// Shadow values from Figma
// Format: Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0)
const SHADOW_VALUES: Record<string, string> = {
  xs: "Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0)",
  sm: "Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 10), radius: 15, spread: -5); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 7), radius: 7, spread: -5)",
  md: "Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 20), radius: 25, spread: -5); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 10), radius: 10, spread: -5)",
  lg: "Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 28), radius: 23, spread: -7); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 12), radius: 12, spread: -7)",
  xl: "Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 0); Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 36), radius: 28, spread: -7); Effect(type: DROP_SHADOW, color: #0000000A, offset: (0, 17), radius: 17, spread: -7)",
};

// ============================================================================
// Helper Functions
// ============================================================================

// Base pixel to rem conversion (16px = 1rem)
const PX_TO_REM = 16;

/**
 * Converts pixels to rem
 * @param px - Pixel value
 * @returns Rem value (e.g., 0.125)
 */
function pxToRem(px: number): number {
  if (px === 0) {
    return 0;
  }
  const rem = px / PX_TO_REM;
  // Round to 4 decimal places to match Figma precision
  return Number(rem.toFixed(4));
}

/**
 * Normalizes hex color to include alpha channel
 * @param hex - Hex color string (e.g., "#0000001A" or "#000000")
 * @returns Hex color string with alpha channel (8 digits)
 */
function normalizeHexWithAlpha(hex: string): string {
  // If already 8 digits (with alpha), return as is
  if (hex.length === 9) {
    return hex;
  }
  // If 6 digits (no alpha), append FF for full opacity
  if (hex.length === 7) {
    return `${hex}FF`;
  }
  throw new Error(`Invalid hex color: ${hex}`);
}

/**
 * Parses a single Effect string into a ShadowEffect object
 * @param effectStr - Effect string (e.g., "Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0)")
 * @returns Parsed shadow effect
 */
function parseEffect(effectStr: string): ShadowEffect {
  // Extract color
  const colorMatch = effectStr.match(/color:\s*(#[0-9A-Fa-f]+)/);
  if (!colorMatch || !colorMatch[1]) {
    throw new Error(`Could not parse color from effect: ${effectStr}`);
  }
  const color = colorMatch[1];

  // Extract offset
  const offsetMatch = effectStr.match(/offset:\s*\((-?\d+),\s*(-?\d+)\)/);
  if (!offsetMatch || !offsetMatch[1] || !offsetMatch[2]) {
    throw new Error(`Could not parse offset from effect: ${effectStr}`);
  }
  const offset: [number, number] = [
    parseInt(offsetMatch[1], 10),
    parseInt(offsetMatch[2], 10),
  ];

  // Extract radius
  const radiusMatch = effectStr.match(/radius:\s*(-?\d+)/);
  if (!radiusMatch || !radiusMatch[1]) {
    throw new Error(`Could not parse radius from effect: ${effectStr}`);
  }
  const radius = parseInt(radiusMatch[1], 10);

  // Extract spread
  const spreadMatch = effectStr.match(/spread:\s*(-?\d+)/);
  if (!spreadMatch || !spreadMatch[1]) {
    throw new Error(`Could not parse spread from effect: ${effectStr}`);
  }
  const spread = parseInt(spreadMatch[1], 10);

  return {
    type: "DROP_SHADOW",
    color,
    offset,
    radius,
    spread,
  };
}

/**
 * Converts a shadow effect to ShadowLayer format
 * @param effect - Shadow effect object
 * @returns ShadowLayer object
 */
function effectToShadowLayer(effect: ShadowEffect): ShadowLayer {
  // Convert hex to RGBA string for storage in tokens.json
  // Note: Terrazzo may convert this to color() function in CSS output
  const hex = normalizeHexWithAlpha(effect.color);
  let r: number, g: number, b: number, alpha: number;

  r = parseInt(hex.slice(1, 3), 16);
  g = parseInt(hex.slice(3, 5), 16);
  b = parseInt(hex.slice(5, 7), 16);
  alpha = parseInt(hex.slice(7, 9), 16) / 255;

  const rgba: ColorValue = {
    colorSpace: "srgb",
    components: [
      Number(r.toFixed(4)),
      Number(g.toFixed(4)),
      Number(b.toFixed(2)),
    ],
    alpha: Number(alpha.toFixed(2)),
    hex,
  };

  return {
    color: rgba,
    offsetX: { value: pxToRem(effect.offset[0]), unit: "rem" },
    offsetY: { value: pxToRem(effect.offset[1]), unit: "rem" },
    blur: { value: pxToRem(effect.radius), unit: "rem" },
    spread: { value: pxToRem(effect.spread), unit: "rem" },
  };
}

/**
 * Converts Figma effect string to array of ShadowLayer objects
 * @param effectString - Figma effect string with multiple effects separated by semicolons
 * @returns Array of ShadowLayer objects with RGBA color strings
 */
function convertFigmaShadowToLayers(effectString: string): ShadowLayer[] {
  // Split by semicolon to get individual effects
  const effects = effectString
    .split(";")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  // Parse each effect and convert to ShadowLayer
  return effects.map((effectStr) => {
    const effect = parseEffect(effectStr);
    return effectToShadowLayer(effect);
  });
}

/**
 * Creates or updates a shadow token in the tokens object
 * @param tokens - The tokens object
 * @param key - The shadow key (e.g., "xs", "sm", "md")
 * @param figmaEffectString - The Figma effect string
 * @returns The created/updated token value
 */
function createOrUpdateShadowToken(
  tokens: Tokens,
  key: string,
  figmaEffectString: string
): ShadowToken {
  // Ensure shadow object exists
  if (!tokens.shadow) {
    tokens.shadow = {};
  }

  const shadowLayers = convertFigmaShadowToLayers(figmaEffectString);

  // Create or update the token
  if (!tokens.shadow[key]) {
    tokens.shadow[key] = { $type: "shadow", $value: shadowLayers };
  } else {
    tokens.shadow[key].$value = shadowLayers;
  }

  return tokens.shadow[key];
}

/**
 * Syncs shadow tokens from Figma values
 * @param tokens - The tokens object to update
 * @returns Updated tokens object
 */
export function syncShadowTokens(tokens: Tokens): Tokens {
  let updatedCount = 0;
  let createdCount = 0;

  for (const [key, figmaEffectString] of Object.entries(SHADOW_VALUES)) {
    const existing = tokens.shadow?.[key];
    createOrUpdateShadowToken(tokens, key, figmaEffectString);

    if (existing) {
      updatedCount++;
    } else {
      createdCount++;
    }
  }

  console.log(
    `Shadow tokens: ${updatedCount + createdCount} total (${createdCount} created, ${updatedCount} updated)`
  );
  return tokens;
}

// ============================================================================
// Main Execution
// ============================================================================

/**
 * Main function to sync shadow tokens (reads and writes tokens.json)
 */
export function syncShadow(): Tokens {
  try {
    console.log("Reading tokens.json...");
    const tokens = readTokens();

    console.log("Syncing shadow tokens...");
    const updatedTokens = syncShadowTokens(tokens);

    console.log("Writing updated tokens to tokens.json...");
    writeTokens(updatedTokens);

    console.log("✅ Successfully synced shadow tokens");
    return updatedTokens;
  } catch (error) {
    console.error(
      "❌ Error syncing shadow tokens:",
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}

// If run directly, execute the sync
if (import.meta.url === `file://${process.argv[1]}`) {
  syncShadow();
}
