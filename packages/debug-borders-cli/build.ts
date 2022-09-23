import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import { promises as asyncFs } from "fs";
import * as path from "path";
import { buildRollup } from "../../scripts/build";
import { RollupOptions } from "rollup";

const cliBundle: RollupOptions = {
  external: ["commander", "debug-borders", "fs"],
  input: "./src/index.ts",
  output: {
    banner: "#!/usr/bin/env node",
    file: "./lib/debug-borders-cli.js",
    footer: "main();",
    format: "cjs",
  },
  plugins: [
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      declarationDir: undefined,
      composite: false,
      sourceMap: false,
    }),
    terser(),
  ],
};

(async () => {
  await asyncFs.rm(path.resolve(__dirname, "lib"), {
    recursive: true,
    force: true,
  });

  await buildRollup(cliBundle);
})();
