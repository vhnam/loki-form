/**
 * Transforms design tokens to Tailwind v4 theme
 * 
 * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { converter, parse } from "culori";

type DesignTokens = {
  color?: {
    primitives?: Record<string, any>;
    semantic?: Record<string, any>;
  };
  foundations?: {
    radius?: Record<string, { $value: string }>;
    zIndex?: Record<string, { $value: string }>;
    breakpoint?: Record<string, { $value: string }>;
    spacing?: Record<string, { $value: string }>;
  };
  typography?: {
    primitives?: Record<string, any>;
    semantic?: Record<string, any>;
  };
  [key: string]: any;
};

/**
 * Converts RGB value to Tailwind v4 color() format
 */
function rgbToTailwindColor(value: string): string {
  const toOklch = converter("oklch");
  const oklch = toOklch(parse(value));

  if (!oklch) {
    throw new Error(`Failed to parse RGBA color ${value} to OKLCH`);
  }

  return `oklch(${oklch.l.toFixed(4)} ${oklch.c?.toFixed(4) ?? 0} ${oklch.h?.toFixed(2) ?? 0}${oklch.alpha ? ` / ${oklch.alpha.toFixed(2)}` : ''})`;
}

/**
 * Converts a value in pixels to a value in rem
 */
function pxToRem(value: string): string {
  return `${Number(value.replace("px", "")) / 16}rem`;
}

/**
 * Resolves token references like {color.primitives..white} or {color.semantic..dark.filled}
 */
function resolveReference(ref: string): string {
  // Convert {color.primitives..gray.3} to var(--color-gray-3)
  // Convert {color.semantic..dark.filled} to var(--color-dark-filled)
  // Handle double dots (..) which means "parent" in the path
  let path = ref.replace(/[{}]/g, "");

  // Split by dots and filter out empty strings (from double dots)
  const parts = path.split(".").filter(Boolean);

  // Remove the first "color" part since we'll add it in the var name
  // If the second part is "semantic" or "primitives", also remove it
  // The path structure is:
  // - color.primitives..gray.3 -> gray-3
  // - color.semantic..dark.filled -> dark-filled
  let pathWithoutPrefix = parts.slice(1);
  if (
    pathWithoutPrefix[0] === "semantic" ||
    pathWithoutPrefix[0] === "primitives"
  ) {
    pathWithoutPrefix = pathWithoutPrefix.slice(1);
  }

  // Convert to kebab-case and create variable name
  const varName = pathWithoutPrefix.map((part) => part.toLowerCase()).join("-");

  return `var(--color-${varName})`;
}

/**
 * Processes a token value, handling references and direct values
 */
function processTokenValue(value: any, type?: string): string {
  if (typeof value === "string") {
    // Check if it's a reference
    if (value.startsWith("{") && value.endsWith("}")) {
      return resolveReference(value);
    }

    // Check if it's a color value
    if (type === "color" || value.startsWith("rgb")) {
      return rgbToTailwindColor(value);
    }

    return value;
  }

  return String(value);
}

/**
 * Converts a path array to a CSS variable name
 * Uses lowercase with hyphens for consistency
 */
function pathToVarName(path: string[]): string {
  return `--${path
    .map((part) => part.replace(/([A-Z])/g, "-$1").toLowerCase())
    .join("-")
    .replace(/^-+/, "")}`;
}

/**
 * Processes color primitives
 */
function processColorPrimitives(
  primitives: Record<string, any>,
  output: string[]
): void {
  for (const [colorName, colorValue] of Object.entries(primitives)) {
    if (colorValue.$value) {
      // Single color value (like white, black)
      const varName = pathToVarName(["color", "primitives", colorName]);
      const value = processTokenValue(colorValue.$value, colorValue.$type);
      output.push(`  ${varName}: ${value};`);
    } else if (typeof colorValue === "object") {
      // Color scale (0-9)
      for (const [scale, scaleValue] of Object.entries(colorValue)) {
        if (
          scaleValue &&
          typeof scaleValue === "object" &&
          "$value" in scaleValue &&
          typeof (scaleValue as any).$value !== "undefined"
        ) {
          const varName = pathToVarName(["color", colorName, scale]);
          const value = processTokenValue(
            (scaleValue as any).$value,
            (scaleValue as any).$type
          );
          output.push(`  ${varName}: ${value};`);
        }
      }
    }
  }
}

/**
 * Processes color semantic tokens
 */
function processColorSemantic(
  semantic: Record<string, any>,
  output: string[]
): void {
  for (const [semanticName, semanticValue] of Object.entries(semantic)) {
    if (!semanticValue || typeof semanticValue !== "object") continue;

    if (semanticValue.$value) {
      // Simple semantic token (like scheme, primary-contrast, etc.)
      // Use --color-{name} format (without "semantic" prefix)
      const varName = pathToVarName(["color", semanticName]);
      const value = processTokenValue(
        semanticValue.$value,
        semanticValue.$type
      );
      output.push(`  ${varName}: ${value};`);
    } else {
      // Nested semantic token (like color.semantic.red.filled)
      // Use --color-{colorName}-{variant} format
      for (const [nestedName, nestedValue] of Object.entries(semanticValue)) {
        if (
          nestedValue &&
          typeof nestedValue === "object" &&
          "$value" in nestedValue &&
          typeof (nestedValue as any).$value !== "undefined"
        ) {
          const varName = pathToVarName(["color", semanticName, nestedName]);
          const value = processTokenValue(
            (nestedValue as any).$value,
            (nestedValue as any).$type
          );
          output.push(`  ${varName}: ${value};`);
        }
      }
    }
  }
}

/**
 * Processes foundations (spacing, radius, etc.)
 */
function processFoundations(
  foundations: DesignTokens["foundations"],
  output: string[]
): void {
  if (!foundations) return;

  // Process spacing
  if (foundations.spacing) {
    for (const [key, value] of Object.entries(foundations.spacing)) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["spacing", key]);
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process radius
  if (foundations.radius) {
    for (const [key, value] of Object.entries(foundations.radius)) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["radius", key]);
        // Handle special case for "none" which should be 0
        const radiusValue = value.$value === "0px" ? "0" : value.$value;
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process zIndex
  if (foundations.zIndex) {
    for (const [key, value] of Object.entries(foundations.zIndex)) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["z", key]);
        output.push(`  ${varName}: ${value.$value.replace("px", "")};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process breakpoints
  if (foundations.breakpoint) {
    for (const [key, value] of Object.entries(foundations.breakpoint)) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["breakpoint", key]);
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
    output.push(""); // Add spacing after group
  }
}

/**
 * Main transformation function
 */
export function transformToTailwindTheme(tokens: DesignTokens): string {
  // const output: string[] = ['@import "tailwindcss";', "", "@theme {"];
  const output: string[] = ["@theme {"];

  // Process color primitives
  if (tokens.color?.primitives) {
    processColorPrimitives(tokens.color.primitives, output);
    output.push(""); // Add spacing
  }

  // Process color semantic tokens
  if (tokens.color?.semantic) {
    processColorSemantic(tokens.color.semantic, output);
    output.push(""); // Add spacing
  }

  // Process foundations
  if (tokens.foundations) {
    processFoundations(tokens.foundations, output);
  }

  output.push("}");

  return output.join("\n");
}

/**
 * Reads design tokens and transforms to Tailwind theme
 */
export function transformDesignTokensToTailwind(
  inputPath: string,
  outputPath: string
): void {
  const tokensJson = readFileSync(inputPath, "utf-8");
  const tokens: DesignTokens = JSON.parse(tokensJson);

  const tailwindTheme = transformToTailwindTheme(tokens);

  writeFileSync(outputPath, tailwindTheme, "utf-8");
  console.log(`✓ Generated Tailwind theme at ${outputPath}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const inputPath = join(process.cwd(), "src", "design.tokens.json");
  const outputPath = join(process.cwd(), "dist", "tailwind-theme.css");

  transformDesignTokensToTailwind(inputPath, outputPath);
}
