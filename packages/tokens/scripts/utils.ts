/**
 * Utility functions for token transformation
 */

import { converter, parse } from 'culori';
import { type Shadow } from './types';

/**
 * formats a number to a given precision
 */
const formatNumber = (value: number, precision: number): string => parseFloat(value.toFixed(precision)).toString();

/**
 * Converts RGB value to Tailwind v4 color() format
 */
export function rgbToTailwindColor(value: string): string {
  const toOklch = converter('oklch');
  const oklch = toOklch(parse(value));

  if (!oklch) {
    throw new Error(`Failed to parse RGBA color ${value} to OKLCH`);
  }

  return `oklch(${formatNumber(oklch.l, 4)} ${formatNumber(oklch.c ?? 0, 4)} ${formatNumber(oklch.h ?? 0, 2)}${oklch.alpha ? ` / ${formatNumber(oklch.alpha, 2)}` : ''})`;
}

/**
 * Converts a shadow value to a Tailwind shadow value
 */
export function shadowToTailwindShadow(value: Shadow[]): string {
  return `${value.map((shadow) => `${pxToRem(shadow.offsetX)} ${pxToRem(shadow.offsetY)} ${pxToRem(shadow.blur)} ${pxToRem(shadow.spread)} ${rgbToTailwindColor(shadow.color)}`).join(', ')}`;
}

/**
 * Converts a value in pixels to a value in rem
 */
export function pxToRem(value: string): string {
  return value === '0px' ? '0' : `${Number(value.replace('px', '')) / 16}rem`;
}

/**
 * Resolves token references like {color.primitives..white} or {color.semantic..dark.filled}
 */
export function resolveReference(ref: string): string {
  // Convert {color.primitives..gray.3} to var(--color-gray-3)
  // Convert {color.semantic..dark.filled} to var(--color-dark-filled)
  // Handle double dots (..) which means "parent" in the path
  let path = ref.replace(/[{}]/g, '');

  // Split by dots and filter out empty strings (from double dots)
  const parts = path.split('.').filter(Boolean);

  // Remove the first "color" part since we'll add it in the var name
  // If the second part is "semantic" or "primitives", also remove it
  // The path structure is:
  // - color.primitives..gray.3 -> gray-3
  // - color.semantic..dark.filled -> dark-filled
  let pathWithoutPrefix = parts.slice(1);
  if (pathWithoutPrefix[0] === 'semantic' || pathWithoutPrefix[0] === 'primitives') {
    pathWithoutPrefix = pathWithoutPrefix.slice(1);
  }

  // Convert to kebab-case and create variable name
  const varName = pathWithoutPrefix.map((part) => part.toLowerCase()).join('-');

  return `var(--color-${varName})`;
}

/**
 * Processes a token value, handling references and direct values
 */
export function processTokenValue(value: any, type?: string): string {
  if (typeof value === 'string') {
    // Check if it's a reference
    if (value.startsWith('{') && value.endsWith('}')) {
      return resolveReference(value);
    }

    // Check if it's a color value
    if (type === 'color' || value.startsWith('rgb')) {
      return rgbToTailwindColor(value);
    }

    return value;
  }

  // Check if it's a shadow value
  if (type === 'shadow') {
    return shadowToTailwindShadow(value as Shadow[]);
  }

  return String(value);
}

/**
 * Converts a path array to a CSS variable name
 * Uses lowercase with hyphens for consistency
 */
export function pathToVarName(path: string[]): string {
  return `--${path
    .map((part) => part.replace(/([A-Z])/g, '-$1').toLowerCase())
    .join('-')
    .replace(/^-+/, '')}`;
}
