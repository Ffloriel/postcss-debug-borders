import { Command } from "commander";
import * as fs from "fs";
import packageJson from "./../package.json";
import { addDebugBorder } from "debug-borders";
import CSS from "csstype";

async function writeCSSToFile(filePath: string, css: string) {
  try {
    await fs.promises.writeFile(filePath, css);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err.message);
  }
}

type CommandOptions = {
  input?: string;
  output?: string;
  borderStyle?: string;
  selectors?: string[];
};

export type Options = {
  input: string;
  output?: string;
  borderStyle: CSS.Properties;
  selectors: string[];
};

export function parseCommandOptions(program: Command): Command {
  program
    .description(packageJson.description)
    .version(packageJson.version)
    .usage(
      "--input <css> --selectors <selectors...> --output <output> [options]"
    );

  program
    .option("-i, --input <file>", "file path to the input CSS file")
    .option("-o, --output <file>", "file path to the output CSS file")
    .option(
      "-b, --border-style <borderStyle>",
      "CSS property of the debug border (e.g. '2px solid blue')"
    )
    .option(
      "-s, --selectors <list...>",
      "selectors that should have the debug border"
    );

  return program;
}

export async function getOptions(program: Command): Promise<Options> {
  const { input, output, borderStyle, selectors } =
    program.opts<CommandOptions>();
  // place to validate the options
  // potentially calling program.help() if there is an error
  if (!input) {
    program.help();
  }
  const options = {
    input,
    output,
    borderStyle: {
      border: borderStyle || "1px solid red",
    },
    selectors: selectors || ["*"],
  };

  return options;
}

export async function run(program: Command) {
  const options = await getOptions(program);
  const inputCSS = await (await fs.promises.readFile(options.input)).toString();
  const outputCSS = await addDebugBorder(inputCSS, {
    borderStyle: options.borderStyle as CSS.Properties,
    selectors: options.selectors,
  });
  if (options.output) {
    await writeCSSToFile(options.output, outputCSS);
  } else {
    console.log(outputCSS);
  }
}

export async function main() {
  try {
    const program = parseCommandOptions(new Command());
    program.parse(process.argv);
    run(program);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
}
