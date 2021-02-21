import typescript from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  plugins: [typescript(), terser()],
  output: [
    {
      file: "./lib/postcss-debug-borders.esm.js",
      format: "esm",
    },
    {
      file: "./lib/postcss-debug-borders.js",
      format: "cjs",
    },
  ],
};
