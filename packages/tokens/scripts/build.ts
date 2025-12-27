import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import type { DesignTokens } from './types';
import { transformToTailwindTheme } from './transform';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

const inputPath = join(rootDir, 'src', 'design.tokens.json');
const outputPath = join(rootDir, 'dist', 'tailwind-theme.css');

/**
 * Reads design tokens and transforms to Tailwind theme
 */
function transformDesignTokensToTailwind(inputPath: string, outputPath: string): void {
  const tokensJson = readFileSync(inputPath, 'utf-8');
  const tokens: DesignTokens = JSON.parse(tokensJson);

  const tailwindTheme = transformToTailwindTheme(tokens);

  writeFileSync(outputPath, tailwindTheme, 'utf-8');
  console.log(`✓ Generated Tailwind theme at ${outputPath}`);
}

// Ensure the dist directory exists before writing
mkdirSync(dirname(outputPath), { recursive: true });

transformDesignTokensToTailwind(inputPath, outputPath);
