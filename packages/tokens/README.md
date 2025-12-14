# Design Tokens

Design tokens package for the loki-form project, synced from Figma.

## Structure

```
packages/tokens/
├── src/
│   └── tokens.json          # Source design tokens (DTCG format)
├── scripts/
│   └── sync-figma.js       # Script to sync tokens from Figma
├── dist/                    # Generated output files
│   ├── index.css           # CSS variables
│   └── tailwind-theme.css  # Tailwind theme configuration
├── terrazzo.config.js      # Terrazzo configuration
└── package.json
```

## Usage

### Sync tokens from Figma

```bash
pnpm sync
```

This will fetch the latest design tokens from Figma and update `src/tokens.json`.

### Build tokens

```bash
pnpm build
```

This generates the CSS and Tailwind theme files in the `dist/` directory.

### Development mode

```bash
pnpm dev
```

Watches for changes and rebuilds automatically.

## Token Format

Tokens follow the [DTCG (Design Tokens Community Group)](https://design-tokens.github.io/community-group/format/) format with OKLCH color space:

```json
{
  "color": {
    "pink": {
      "filled": {
        "$type": "color",
        "$value": {
          "colorSpace": "oklch",
          "components": [0.6396, 0.1968, 3.19],
          "alpha": 1,
          "hex": "#e64980"
        }
      }
    }
  }
}
```

## Color Families

- **Base**: white, black
- **Semantic**: primary-contrast, bright, text, body, error, placeholder, anchor, default, dimmed, disabled
- **Color families**: dark, pink, indigo, teal, yellow, gray, grape, blue, green, orange, red, violet, cyan, lime

Each color family includes variants: text, filled, filled-hover, light, light-hover, light-color, outline, outline-hover.

