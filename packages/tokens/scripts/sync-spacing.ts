import type { Tokens, SpacingToken } from "./utils.js";
import { readTokens, writeTokens } from "./utils.js";

// ============================================================================
// Constants
// ============================================================================

// Base pixel to rem conversion (16px = 1rem)
const PX_TO_REM = 16;

// Spacing values from Figma (in px)
// TODO: Update these values from Figma variables when available
// These should match the Figma variables: spacing/xs, spacing/sm, spacing/md, etc.
const SPACING_VALUES: Record<string, number> = {
  // Placeholder values - update from Figma
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 32,
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
 * Creates or updates a spacing token in the tokens object
 * @param tokens - The tokens object
 * @param key - The spacing key (e.g., "xs", "sm", "md")
 * @param pxValue - The pixel value
 * @returns The created/updated token value
 */
function createOrUpdateSpacingToken(tokens: Tokens, key: string, pxValue: number): SpacingToken {
  // Ensure spacing object exists
  if (!tokens.spacing) {
    tokens.spacing = {};
  }

  const remValue = pxToRem(pxValue);

  // Create or update the token
  if (!tokens.spacing[key]) {
    tokens.spacing[key] = { $type: "dimension", $value: remValue };
  } else {
    tokens.spacing[key].$value = remValue;
  }

  return tokens.spacing[key];
}

/**
 * Syncs spacing tokens from Figma values
 * @param tokens - The tokens object to update
 * @returns Updated tokens object
 */
export function syncSpacingTokens(tokens: Tokens): Tokens {
  // If no spacing values are defined, skip syncing
  if (Object.keys(SPACING_VALUES).length === 0) {
    console.log("No spacing values defined. Skipping spacing token sync.");
    return tokens;
  }

  let updatedCount = 0;
  let createdCount = 0;

  for (const [key, pxValue] of Object.entries(SPACING_VALUES)) {
    const existing = tokens.spacing?.[key];
    createOrUpdateSpacingToken(tokens, key, pxValue);
    
    if (existing) {
      updatedCount++;
    } else {
      createdCount++;
    }
  }

  console.log(`Spacing tokens: ${updatedCount + createdCount} total (${createdCount} created, ${updatedCount} updated)`);
  return tokens;
}

// ============================================================================
// Main Execution
// ============================================================================

/**
 * Main function to sync spacing tokens (reads and writes tokens.json)
 */
export function syncSpacing(): Tokens {
  try {
    console.log("Reading tokens.json...");
    const tokens = readTokens();

    console.log("Syncing spacing tokens...");
    const updatedTokens = syncSpacingTokens(tokens);

    console.log("Writing updated tokens to tokens.json...");
    writeTokens(updatedTokens);

    console.log("✅ Successfully synced spacing tokens");
    return updatedTokens;
  } catch (error) {
    console.error("❌ Error syncing spacing tokens:", error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// If run directly, execute the sync
if (import.meta.url === `file://${process.argv[1]}`) {
  syncSpacing();
}

