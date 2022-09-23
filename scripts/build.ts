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

const rollupBaseConfig: RollupOptions = {
  input: "./src/index.ts",
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: false,
      outputToFilesystem: true,
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
    mainEntryPointFilePath:
      "<projectFolder>/lib/.temp/packages/<unscopedPackageName>/src/index.d.ts",
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
