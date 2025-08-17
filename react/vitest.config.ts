import { fileURLToPath } from "node:url";
import { mergeConfig, configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            include: ["**/*.unit.test.tsx"],
            exclude: [...configDefaults.exclude, "e2e/**"],
            environment: "jsdom",
            globals: true,
            root: fileURLToPath(new URL("./", import.meta.url)),
          },
        },
        {
          extends: true,
          test: {
            name: "browser",
            include: ["**/*.browser.test.tsx"],
            browser: {
              enabled: true,
              provider: "playwright",
              // https://vitest.dev/guide/browser/playwright
              instances: [{ browser: "chromium" }],
              headless: true,
              screenshotFailures: false,
            },
          },
        },
      ],
    },
  })
);
