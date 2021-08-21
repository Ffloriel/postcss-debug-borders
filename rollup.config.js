import typescript from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  plugins: [typescript(), terser()],
  output: [
    {
      file: "./lib/postcss-debug-borders.esm.js",
      format: "esm",
      exports: "auto"
    },
    {
      file: "./lib/postcss-debug-borders.js",
      format: "cjs",
      exports: "auto"
    },
  ],
};
