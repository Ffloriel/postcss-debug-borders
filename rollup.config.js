import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

function getConfig(isDevelopment) {
  const fileName = isDevelopment
    ? "postcss-debug-borders.development"
    : "postcss-debug-borders";

  return {
    input: "src/index.ts",
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __DEVELOPMENT__: isDevelopment
        }
      }),
      typescript(),
      terser(),
    ],
    output: [
      {
        file: `./lib/${fileName}.esm.js`,
        format: "esm",
        exports: "auto"
      },
      {
        file: `./lib/${fileName}.js`,
        format: "cjs",
        exports: "auto"
      },
    ],
  };
}

export default [
  getConfig(false),
  getConfig(true)
];
