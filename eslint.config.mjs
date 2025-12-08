import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Prettier config must come last to override conflicting rules
  prettierConfig,
  // Custom rule overrides
  {
    rules: {
      // Disable set-state-in-effect rule - we use it intentionally for:
      // - Detecting client-side mount (ThemeToggle hydration)
      // - Triggering animations after mount (Portfolio)
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
