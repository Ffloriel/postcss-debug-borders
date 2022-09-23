import { promises as asyncFs } from "fs";
import * as path from "path";
import {
  buildRollup,
  createRollupConfig,
  extractAPI,
} from "../../scripts/build";

(async () => {
  await asyncFs.rm(path.resolve(__dirname, "lib"), {
    recursive: true,
    force: true,
  });

  for (const isDevelopment of [false, true]) {
    await buildRollup(
      createRollupConfig(
        "debug-borders",
        ["postcss-debug-borders", "postcss"],
        isDevelopment
      )
    );
  }

  await extractAPI(__dirname);
  await asyncFs.rm(path.resolve(__dirname, "lib", ".temp"), {
    recursive: true,
    force: true,
  });
})();
