import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ============================================================================
// Types
// ============================================================================

export interface Tokens {
  color?: ColorTokens;
  radius?: RadiusTokens;
  shadow?: ShadowTokens;
  spacing?: SpacingTokens;
  [key: string]: unknown;
}

export interface ColorTokens {
  palette?: Record<string, ColorToken>;
  [key: string]: ColorToken | Record<string, ColorToken> | undefined;
}

export interface ColorToken {
  $type: "color";
  $value: ColorValue;
}

export interface ColorValue {
  colorSpace: string;
  components: [number, number, number];
  alpha: number;
  hex: string;
}

export interface RadiusTokens {
  [key: string]: RadiusToken;
}

export interface RadiusToken {
  $type: "dimension";
  $value: string;
}

export interface ShadowTokens {
  [key: string]: ShadowToken;
}

export interface ShadowToken {
  $type: "shadow";
  $value: ShadowLayer[];
}

export interface ShadowLayer {
  color: ColorValue;
  offsetX: { value: number; unit: "rem" };
  offsetY: { value: number; unit: "rem" };
  blur: { value: number; unit: "rem" };
  spread: { value: number; unit: "rem" };
}

export interface SpacingTokens {
  [key: string]: SpacingToken;
}

export interface SpacingToken {
  $type: "dimension";
  $value: string;
}

// ============================================================================
// Constants
// ============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const TOKENS_PATH = join(__dirname, "../src/tokens.json");

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Reads tokens.json from disk, or creates a new one if it doesn't exist
 * @returns Parsed tokens object
 */
export function readTokens(): Tokens {
  try {
    // Check if file exists
    if (!fs.existsSync(TOKENS_PATH)) {
      console.log("tokens.json not found, creating new file...");
      return {};
    }

    const content = fs.readFileSync(TOKENS_PATH, "utf8");
    const tokens = JSON.parse(content) as Tokens;

    return tokens;
  } catch (error) {
    // If file exists but is invalid JSON, create a new one
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      console.log("tokens.json not found, creating new file...");
      return {};
    }

    // If JSON is invalid, warn and create new
    if (error instanceof SyntaxError) {
      console.warn(
        `Warning: tokens.json contains invalid JSON. Creating new file...`
      );
      return {};
    }

    throw new Error(
      `Failed to read tokens.json: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Writes tokens to tokens.json
 * @param tokens - The tokens object to write
 */
export function writeTokens(tokens: Tokens): void {
  try {
    const content = JSON.stringify(tokens, null, 2) + "\n";
    fs.writeFileSync(TOKENS_PATH, content, "utf8");
  } catch (error) {
    throw new Error(
      `Failed to write tokens.json: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
