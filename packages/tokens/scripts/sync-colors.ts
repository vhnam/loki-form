import { converter, parse } from "culori";
import type { Tokens } from "./utils.js";

// ============================================================================
// Types
// ============================================================================

interface ColorData {
  hex: string;
  oklch: {
    colorSpace: "oklch";
    components: [number, number, number];
    alpha: number;
  };
}

interface FigmaVars {
  [key: string]: ColorData;
}

type ColorFamily = keyof typeof COLOR_FAMILIES;
type ColorVariantFn = (base: string) => string;
type ColorVariantMap = Record<ColorFamily, string>;

// ============================================================================
// Constants
// ============================================================================

// Color families and their base hex values
const COLOR_FAMILIES = {
  dark: "#2e2e2e",
  pink: "#e64980",
  indigo: "#4c6ef5",
  teal: "#12b886",
  yellow: "#fab005",
  gray: "#868e96",
  grape: "#be4bdb",
  blue: "#228be6",
  green: "#40c057",
  orange: "#fd7e14",
  red: "#fa5252",
  violet: "#7950f2",
  cyan: "#15aabf",
  lime: "#82c91e",
} as const;

// Color variants with their hex modifiers
const COLOR_VARIANTS: Record<string, ColorVariantFn | ColorVariantMap> = {
  text: (base: string) => base,
  filled: (base: string) => base,
  "filled-hover": {
    dark: "#242424",
    pink: "#d6336c",
    indigo: "#4263eb",
    teal: "#0ca678",
    yellow: "#f59f00",
    gray: "#495057",
    grape: "#ae3ec9",
    blue: "#1c7ed6",
    green: "#37b24d",
    orange: "#f76707",
    red: "#f03e3e",
    violet: "#7048e8",
    cyan: "#1098ad",
    lime: "#74b816",
  },
  light: (base: string) => `${base}1a`,
  "light-hover": (base: string) => `${base}1f`,
  "light-color": (base: string) => base,
  outline: (base: string) => base,
  "outline-hover": (base: string) => `${base}0d`,
};

// Base colors (palette)
const BASE_COLORS = {
  white: "#ffffff",
  black: "#000000",
} as const;

// Semantic colors
const SEMANTIC_COLORS = {
  "primary-contrast": "#ffffff",
  bright: "#000000",
  text: "#000000",
  body: "#ffffff",
  error: "#fa5252",
  placeholder: "#adb5bd",
  anchor: "#228be6",
  default: "#ffffff",
  "default-hover": "#f8f9fa",
  "default-color": "#000000",
  "default-border": "#ced4da",
  dimmed: "#868e96",
  disabled: "#e9ecef",
  "disabled-color": "#adb5bd",
  "disabled-border": "#dee2e6",
} as const;

// Special cases (colors that don't follow the standard pattern)
const SPECIAL_COLORS = {
  "indigo/7": "#4263eb",
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Converts a hex color to OKLCH format with metadata
 * @param hex - Hex color string (supports alpha channel)
 * @returns Object containing hex and oklch representation
 */
function transformHexToOklch(hex: string): ColorData {
  const toOklch = converter("oklch");
  const oklch = toOklch(parse(hex));
  
  if (!oklch) {
    throw new Error(`Failed to parse hex color: ${hex}`);
  }

  return {
    hex,
    oklch: {
      colorSpace: "oklch",
      components: [
        Number(oklch.l.toFixed(4)),
        Number(oklch.c?.toFixed(4) ?? 0),
        Number(oklch.h?.toFixed(2) ?? 0),
      ] as [number, number, number],
      alpha: oklch.alpha ? Number(oklch.alpha.toFixed(2)) : 1,
    },
  };
}

/**
 * Generates color variants for a color family
 * @param family - Color family name (e.g., "pink", "blue")
 * @param baseHex - Base hex color for the family
 * @returns Object with variant keys and transformed color values
 */
function generateColorVariants(family: string, baseHex: string): FigmaVars {
  const variants: FigmaVars = {};
  
  for (const [variantName, variantFn] of Object.entries(COLOR_VARIANTS)) {
    let hex: string;
    
    if (typeof variantFn === "function") {
      hex = variantFn(baseHex);
    } else if (typeof variantFn === "object" && family in variantFn) {
      hex = variantFn[family as keyof typeof variantFn] as string;
    } else {
      hex = typeof variantFn === "function" ? variantFn(baseHex) : baseHex;
    }
    
    const key = `${family}/${variantName}`;
    variants[key] = transformHexToOklch(hex);
  }
  
  return variants;
}

/**
 * Builds the complete figmaVars object from color definitions
 * @returns Complete figmaVars mapping
 */
function buildFigmaVars(): FigmaVars {
  const figmaVars: FigmaVars = {};

  // Add base colors (palette)
  for (const [name, hex] of Object.entries(BASE_COLORS)) {
    figmaVars[name] = transformHexToOklch(hex);
  }

  // Add color family variants
  for (const [family, baseHex] of Object.entries(COLOR_FAMILIES)) {
    Object.assign(figmaVars, generateColorVariants(family, baseHex));
  }

  // Add semantic colors
  for (const [name, hex] of Object.entries(SEMANTIC_COLORS)) {
    figmaVars[name] = transformHexToOklch(hex);
  }

  // Add special cases
  for (const [key, hex] of Object.entries(SPECIAL_COLORS)) {
    figmaVars[key] = transformHexToOklch(hex);
  }

  return figmaVars;
}

/**
 * Creates a new token structure for a given key
 * @param tokens - The tokens object
 * @param key - The figmaVar key
 * @param colorData - The color data to use
 * @returns The created $value object or null
 */
function createToken(tokens: Tokens, key: string): Record<string, unknown> | null {
  const parts = key.split("/");
  
  // Ensure color object exists
  if (!tokens.color) {
    tokens.color = {};
  }

  // Handle palette colors (white, black)
  if (key === "white" || key === "black") {
    if (!tokens.color.palette) {
      tokens.color.palette = {};
    }
    if (!tokens.color.palette[key]) {
      tokens.color.palette[key] = { $type: "color", $value: {} };
    }
    return tokens.color.palette[key].$value as Record<string, unknown>;
  }

  // Handle top-level semantic colors
  if (parts.length === 1) {
    if (!tokens.color[key]) {
      tokens.color[key] = { $type: "color", $value: {} };
    }
    return (tokens.color[key] as { $value: Record<string, unknown> }).$value;
  }

  // Handle nested color families (e.g., "dark/text", "pink/filled")
  if (parts.length === 2) {
    const [family, variant] = parts;
    if (!tokens.color[family]) {
      tokens.color[family] = {};
    }
    const familyObj = tokens.color[family] as Record<string, { $value: Record<string, unknown> }>;
    if (!familyObj[variant]) {
      familyObj[variant] = { $type: "color", $value: {} };
    }
    return familyObj[variant].$value;
  }

  return null;
}

/**
 * Resolves the token path in tokens.json from a figmaVar key
 * @param tokens - The tokens object
 * @param key - The figmaVar key (e.g., "dark/text", "white", "primary-contrast")
 * @returns The $value object if found, null otherwise
 */
function resolveTokenPath(tokens: Tokens, key: string): Record<string, unknown> | null {
  const parts = key.split("/");
  const { color } = tokens;

  if (!color) {
    return null;
  }

  // Handle palette colors (white, black)
  if (key === "white" || key === "black") {
    const palette = color.palette;
    if (palette && key in palette) {
      return (palette[key] as { $value: Record<string, unknown> }).$value;
    }
    return null;
  }

  // Handle top-level semantic colors
  if (parts.length === 1) {
    const token = color[key];
    if (token && typeof token === "object" && "$value" in token) {
      return (token as { $value: Record<string, unknown> }).$value;
    }
    return null;
  }

  // Handle nested color families (e.g., "dark/text", "pink/filled")
  if (parts.length === 2) {
    const [family, variant] = parts;
    const familyObj = color[family];
    if (familyObj && typeof familyObj === "object" && variant in familyObj) {
      const variantToken = (familyObj as Record<string, { $value: Record<string, unknown> }>)[variant];
      if (variantToken && "$value" in variantToken) {
        return variantToken.$value;
      }
    }
    return null;
  }

  return null;
}

/**
 * Syncs color tokens from Figma values
 * @param tokens - The tokens object to update
 * @returns Updated tokens object
 */
export function syncColorTokens(tokens: Tokens): Tokens {
  const figmaVars = buildFigmaVars();
  let updatedCount = 0;
  let createdCount = 0;

  for (const [key, colorData] of Object.entries(figmaVars)) {
    let tokenValue = resolveTokenPath(tokens, key);

    // Create token if it doesn't exist
    if (!tokenValue) {
      tokenValue = createToken(tokens, key);
      if (tokenValue) {
        createdCount++;
      }
    }

    if (tokenValue) {
      tokenValue.colorSpace = colorData.oklch.colorSpace;
      tokenValue.components = colorData.oklch.components;
      tokenValue.alpha = colorData.oklch.alpha;
      tokenValue.hex = colorData.hex;
      updatedCount++;
    } else {
      console.warn(`Warning: Could not create token for key: ${key}`);
    }
  }

  console.log(`Color tokens: ${updatedCount} total (${createdCount} created, ${updatedCount - createdCount} updated)`);
  return tokens;
}

