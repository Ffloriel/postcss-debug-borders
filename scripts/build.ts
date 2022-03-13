import { rollup, RollupOptions } from "rollup";
import {
  Extractor,
  ExtractorConfig,
  ExtractorLogLevel,
  IExtractorConfigPrepareOptions,
} from "@microsoft/api-extractor";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import * as path from "path";
import { promises as asyncFs } from "fs";

const rollupBaseConfig: RollupOptions = {
  input: "./src/index.ts",
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: false,
    }),
    terser(),
  ],
};

export function createRollupConfig(
  packageName: string,
  external: RollupOptions["external"],
  isDevelopment: boolean
): RollupOptions {
  const fileName = isDevelopment ? `${packageName}.development` : packageName;

  return {
    ...rollupBaseConfig,
    plugins: [
      ...(rollupBaseConfig.plugins ? rollupBaseConfig.plugins : []),
      replace({
        preventAssignment: true,
        values: {
          __DEVELOPMENT__: isDevelopment.toString(),
        },
      }),
    ],
    external,
    output: [
      {
        file: `./lib/${fileName}.mjs`,
        format: "esm",
      },
      {
        exports: "auto",
        file: `./lib/${fileName}.js`,
        format: "cjs",
      },
    ],
  };
}

export async function buildRollup(rollupOptions: RollupOptions): Promise<void> {
  const bundle = await rollup(rollupOptions);
  if (rollupOptions.output) {
    if (Array.isArray(rollupOptions.output)) {
      for (const output of rollupOptions.output) {
        await bundle.write(output);
      }
    } else {
      await bundle.write(rollupOptions.output);
    }
  }
}

const extractorAPIBaseConfig: IExtractorConfigPrepareOptions = {
  configObjectFullPath: undefined,
  packageJsonFullPath: undefined,
  configObject: {
    projectFolder: "",
    compiler: {
      tsconfigFilePath: "tsconfig.json",
    },
    mainEntryPointFilePath: "<projectFolder>/lib/.temp/src/index.d.ts",
    apiReport: {
      enabled: false,
      reportFileName: "<unscopedPackageName>.api.md",
    },
    docModel: {
      enabled: true,
      apiJsonFilePath:
        "<projectFolder>/docs/.vuepress/.temp/api-reference/<unscopedPackageName>.api.json",
    },
    dtsRollup: {
      enabled: true,
      untrimmedFilePath: "",
      publicTrimmedFilePath: "<projectFolder>/lib/<unscopedPackageName>.d.ts",
    },
    tsdocMetadata: {
      enabled: false,
    },
    messages: {
      compilerMessageReporting: {
        default: {
          logLevel: ExtractorLogLevel.Warning,
        },
      },
      extractorMessageReporting: {
        default: {
          logLevel: ExtractorLogLevel.Warning,
        },
        "ae-internal-missing-underscore": {
          logLevel: ExtractorLogLevel.None,
        },
      },
      tsdocMessageReporting: {
        default: {
          logLevel: ExtractorLogLevel.Warning,
        },
      },
    },
  },
};

export async function extractAPI(packageFolder: string): Promise<void> {
  const extractorAPIConfig = ExtractorConfig.prepare({
    ...extractorAPIBaseConfig,
    packageJsonFullPath: path.resolve(packageFolder, "package.json"),
    configObject: {
      ...extractorAPIBaseConfig.configObject,
      projectFolder: packageFolder,
    },
  });
  await Extractor.invoke(extractorAPIConfig);
}

(async () => {
  await asyncFs.rm(path.resolve(__dirname, "../lib"), {
    recursive: true,
    force: true,
  });

  for (const isDevelopment of [false, true]) {
    await buildRollup(
      createRollupConfig("postcss-debug-borders", [], isDevelopment)
    );
  }

  await extractAPI(path.resolve(__dirname, "../"));
  await asyncFs.rm(path.resolve(__dirname, "../lib", ".temp"), {
    recursive: true,
    force: true,
  });
})();
