import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/**", "src/generated/**", "coverage/**", ".codex/**", ".agents/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
