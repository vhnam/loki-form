import { transformDesignTokensToTailwind } from './transform-to-tailwind.js';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

const inputPath = join(rootDir, 'src', 'design.tokens.json');
const outputPath = join(rootDir, 'dist', 'tailwind-theme.css');

transformDesignTokensToTailwind(inputPath, outputPath);

