/**
 * Processors for different token types
 */

import type { Token, DesignTokens } from "./types";
import { pathToVarName, processTokenValue, pxToRem } from "./utils";

/**
 * Processes color primitives
 */
export function processColorPrimitives(
  primitives: Record<string, Token>,
  output: string[]
): void {
  for (const [colorName, colorValue] of Object.entries(primitives)) {
    if (colorValue.$value) {
      // Single color value (like white, black)
      const varName = pathToVarName(["color", colorName]);
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
export function processColorSemantic(semantic: Record<string, Token>): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};

  for (const [semanticName, semanticValue] of Object.entries(semantic)) {
    if (!semanticValue || typeof semanticValue !== "object") continue;

    if (semanticValue.$value) {
      // Simple semantic token (like scheme, primary-contrast, etc.)
      // Use --color-{name} format (without "semantic" prefix)
      const varName = pathToVarName(["color", semanticName]);

      // Get light mode value (prefer $extensions.mode.light, fallback to $value)
      const lightValue = semanticValue.$extensions?.mode?.light
        ? processTokenValue(
            semanticValue.$extensions.mode.light,
            semanticValue.$type
          )
        : processTokenValue(semanticValue.$value, semanticValue.$type);

      light[varName] = lightValue;

      // Generate dark mode override if available
      if (semanticValue.$extensions?.mode?.dark) {
        const darkValue = processTokenValue(
          semanticValue.$extensions.mode.dark,
          semanticValue.$type
        );
        dark[varName] = darkValue;
      }
    } else {
      // Nested semantic token (like color.semantic.red.filled)
      // Use --color-{colorName}-{variant} format
      for (const [nestedName, nestedValue] of Object.entries(semanticValue)) {
        if (
          nestedValue &&
          typeof nestedValue === "object" &&
          "$extensions" in nestedValue &&
          "mode" in (nestedValue as any).$extensions &&
          (nestedValue as any).$value
        ) {
          const varName = pathToVarName(["color", semanticName, nestedName]);

          // Get light mode value (prefer $extensions.mode.light, fallback to $value)
          const lightValue = (nestedValue as any).$extensions?.mode?.light
            ? processTokenValue(
                (nestedValue as any).$extensions.mode.light,
                (nestedValue as any).$type
              )
            : processTokenValue(
                (nestedValue as any).$value,
                (nestedValue as any).$type
              );

          light[varName] = lightValue;

          // Generate dark mode override if available
          if ((nestedValue as any).$extensions?.mode?.dark) {
            const darkValue = processTokenValue(
              (nestedValue as any).$extensions.mode.dark,
              (nestedValue as any).$type
            );
            dark[varName] = darkValue;
          }
        }
      }
    }
  }

  return { light, dark };
}

/**
 * Processes foundations (spacing, radius, etc.)
 */
export function processFoundations(
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
  }
}

/**
 * Processes typography primitives
 */
export function processTypographyPrimitives(
  primitives: NonNullable<DesignTokens["typography"]>["primitives"],
  output: string[]
): void {
  if (!primitives) return;

  // Process font families
  if (primitives["font-families"]) {
    for (const [key, value] of Object.entries(primitives["font-families"])) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["font", key]);
        output.push(`  ${varName}: ${value.$value};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process font sizes
  if (primitives["font-sizes"]) {
    for (const [key, value] of Object.entries(primitives["font-sizes"])) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["text", key]);
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process font weights
  if (primitives["font-weights"]) {
    for (const [key, value] of Object.entries(primitives["font-weights"])) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["font-weight", key]);
        output.push(`  ${varName}: ${value.$value.replace("px", "")};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process letter spacings
  if (primitives["letter-spacings"]) {
    for (const [key, value] of Object.entries(primitives["letter-spacings"])) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["tracking", key]);
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
    output.push(""); // Add spacing after group
  }

  // Process line heights
  if (primitives["line-heights"]) {
    for (const [key, value] of Object.entries(primitives["line-heights"])) {
      if (value && typeof value === "object" && "$value" in value) {
        const varName = pathToVarName(["leading", key]);
        const valueInRem = pxToRem(value.$value);
        output.push(`  ${varName}: ${valueInRem};`);
      }
    }
  }
}

/**
 * Processes shadow tokens
 */
export function processShadow(
  shadow: DesignTokens["shadow"],
  output: string[]
): void {
  if (!shadow) return;

  for (const [key, value] of Object.entries(shadow)) {
    if (
      value &&
      typeof value === "object" &&
      "$value" in value &&
      "$type" in value
    ) {
      const varName = pathToVarName([key]);
      const processedValue = processTokenValue(value.$value, value.$type);
      output.push(`  ${varName}: ${processedValue};`);
    }
  }
}
