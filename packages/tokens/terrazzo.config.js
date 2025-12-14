import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import tailwind from "@terrazzo/plugin-tailwind";

/** @type {import('@terrazzo/cli').Config} */
export default defineConfig({
  tokens: ["./src/tokens.json"],
  plugins: [
    css(),
    tailwind({
      theme: {
        /** @see https://tailwindcss.com/docs/configuration#theme */
        color: ["color.*"],
        spacing: ["spacing.*"],
        radius: ["radius.*"],
        shadow: ["shadow.*"],
      },
    }),
  ],
  outDir: "./dist/",
  lint: {
    /** @see https://terrazzo.app/docs/cli/lint */
  },
});
