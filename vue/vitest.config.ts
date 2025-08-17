import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['**/*.unit.test.ts'],
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, '**/*.browser.test.ts', 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['**/*.browser.test.ts'],
            browser: {
              enabled: true,
              provider: 'playwright',
              // https://vitest.dev/guide/browser/playwright
              instances: [{ browser: 'chromium' }],
              headless: true,
              screenshotFailures: false,
            },
          },
        },
      ],
    },
  }),
)
