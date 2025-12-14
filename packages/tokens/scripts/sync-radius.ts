import type { Tokens, RadiusToken } from "./utils.js";
import { readTokens, writeTokens } from "./utils.js";

// ============================================================================
// Constants
// ============================================================================

// Base pixel to rem conversion (16px = 1rem)
const PX_TO_REM = 16;

// Radius values from Figma (in px)
// These should match the Figma variables: radius/xs, radius/sm, radius/md, radius/lg, radius/xl, radius/full
const RADIUS_VALUES: Record<string, number> = {
  none: 0,      // 0px
  xs: 2,        // 2px
  sm: 4,        // 4px
  md: 8,        // 8px
  lg: 16,       // 16px
  xl: 32,       // 32px
  full: 1000,   // 1000px
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Converts pixels to rem
 * @param px - Pixel value
 * @returns Rem value as string (e.g., "0.125rem")
 */
function pxToRem(px: number): string {
  if (px === 0) {
    return "0rem";
  }
  const rem = px / PX_TO_REM;
  // Round to 3 decimal places to avoid floating point issues
  return `${Number(rem.toFixed(3))}rem`;
}

/**
 * Creates or updates a radius token in the tokens object
 * @param tokens - The tokens object
 * @param key - The radius key (e.g., "none", "xs", "sm")
 * @param pxValue - The pixel value
 * @returns The created/updated token value
 */
function createOrUpdateRadiusToken(tokens: Tokens, key: string, pxValue: number): RadiusToken {
  // Ensure radius object exists
  if (!tokens.radius) {
    tokens.radius = {};
  }

  const remValue = pxToRem(pxValue);

  // Create or update the token
  if (!tokens.radius[key]) {
    tokens.radius[key] = { $type: "dimension", $value: remValue };
  } else {
    tokens.radius[key].$value = remValue;
  }

  return tokens.radius[key];
}

/**
 * Syncs radius tokens from Figma values
 * @param tokens - The tokens object to update
 * @returns Updated tokens object
 */
export function syncRadiusTokens(tokens: Tokens): Tokens {
  let updatedCount = 0;
  let createdCount = 0;

  for (const [key, pxValue] of Object.entries(RADIUS_VALUES)) {
    const existing = tokens.radius?.[key];
    createOrUpdateRadiusToken(tokens, key, pxValue);
    
    if (existing) {
      updatedCount++;
    } else {
      createdCount++;
    }
  }

  console.log(`Radius tokens: ${updatedCount + createdCount} total (${createdCount} created, ${updatedCount} updated)`);
  return tokens;
}

// ============================================================================
// Main Execution
// ============================================================================

/**
 * Main function to sync radius tokens (reads and writes tokens.json)
 */
export function syncRadius(): Tokens {
  try {
    console.log("Reading tokens.json...");
    const tokens = readTokens();

    console.log("Syncing radius tokens...");
    const updatedTokens = syncRadiusTokens(tokens);

    console.log("Writing updated tokens to tokens.json...");
    writeTokens(updatedTokens);

    console.log("✅ Successfully synced radius tokens");
    return updatedTokens;
  } catch (error) {
    console.error("❌ Error syncing radius tokens:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// If run directly, execute the sync
if (import.meta.url === `file://${process.argv[1]}`) {
  syncRadius();
}

