/**
 * Main transformation functions
 *
 * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
 */

import type { DesignTokens } from "./types";
import {
  processColorPrimitives,
  processColorSemantic,
  processFoundations,
  processShadow,
  processTypographyPrimitives,
} from "./processors";

/**
 * Main transformation function
 */
export function transformToTailwindTheme(tokens: DesignTokens): string {
  // const output: string[] = ['@import "tailwindcss";', "", "@theme {"];
  let output: string[] = [
    "@custom-variant dark (&:where(.dark, .dark *));",
    "",
    "@theme {",
  ];

  // Process foundations
  if (tokens.foundations) {
    processFoundations(tokens.foundations, output);
    output.push(""); // Add spacing
  }

  // Process typography primitives
  if (tokens.typography?.primitives) {
    processTypographyPrimitives(tokens.typography.primitives, output);
    output.push(""); // Add spacing
  }

  // Process shadow
  if (tokens.shadow) {
    processShadow(tokens.shadow, output);
    output.push(""); // Add spacing
  }

  // Process color primitives
  if (tokens.color?.primitives) {
    processColorPrimitives(tokens.color.primitives, output);
    output.push(""); // Add spacing
  }

  // Process color semantic tokens
  if (tokens.color?.semantic) {
    const { light, dark } = processColorSemantic(tokens.color.semantic);
    output.push(
      ...Object.entries(light).map(([key, value]) => `  ${key}: ${value};`)
    );

    output = output.concat(["}", "", "@layer theme {", "", ".dark {"]);

    output.push(
      ...Object.entries(dark).map(([key, value]) => `  ${key}: ${value};`)
    );

    output.push("}");
  }

  output.push("}");

  return output.join("\n");
}
