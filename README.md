# Loki Form

A Turborepo monorepo with TanStack Start applications.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

```markdown
.
├── packages/
│ ├── loki-form/ # ✅ publish to NPM
│ │ ├── src/
│ │ │ ├── schema/ # JSON schema, types
│ │ │ ├── runtime/ # resolve, normalize, condition
│ │ │ ├── validation/ # optional
│ │ │ ├── renderer/ # renderer contracts
│ │ │ ├── adapters/
│ │ │ │ └── react/ # React adapter (NO UI)
│ │ │ └── index.ts
│ │ └── package.json
│ ├── tokens/ # Design tokens (Terrazzo)
│ │ ├── tokens.json
│ │ └── dist/
│ │ └── tokens.css
│ ├── ui-core/ # 🔒 internal design system
│ │ ├── src/
│ │ │ ├── primitives/ # ButtonBase, InputBase (wrap shadcn)
│ │ │ ├── components/ # Button, TextField, SelectField
│ │ │ ├── patterns/ # Layouts, Tables, Filters
│ │ │ └── index.ts
│ │ └── styles/
│ │ └── base.css # Tailwind v4 layers
│ ├── ui-form/ # 🔑 glue: loki-form ↔ ui-core
│ │ ├── src/
│ │ │ ├── field-map.ts
│ │ │ ├── FormRenderer.tsx
│ │ │ └── index.ts
│ │ └── package.json
│ ├── ui-theme/ # Theme variants
│ │ ├── web.css
│ │ └── dashboard.css
│ └── storybook/ # Internal DS playground
├── apps/
│ ├── web/
│ └── dashboard/
└── turbo.json
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=web
yarn exec turbo build --filter=web
pnpm exec turbo build --filter=web
```

### Develop

To develop all apps and packages, run the following command:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Using Shared Configurations

### TypeScript Configuration

For TanStack Start applications, extend the shared TypeScript configuration:

```json
{
  "extends": "@repo/typescript-config/tanstack-start.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ESLint Configuration

For TanStack Start applications, use the shared ESLint configuration:

```js
// eslint.config.js
import { config } from "@repo/eslint-config/tanstack-start";

export default config;
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
