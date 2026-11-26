import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores([
    "node_modules",
    ".next",
    "build",
    "public/sw.js",
    "public/workbox-*.js",
    "**/*.stories.*",
    "**/.env",
    "**/*.env.*",
  ]),
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  prettier,
]);