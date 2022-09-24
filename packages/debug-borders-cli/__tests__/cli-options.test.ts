import { Command } from "commander";

import { parseCommandOptions, getOptions, Options } from "../src/";
import { CLI_TEST_FOLDER } from "./utils";

describe("Debug Borders CLI options", () => {
  const program = parseCommandOptions(new Command());

  it("should set the options correctly", async () => {
    program.parse([
      "debug-borders-cli",
      "",
      "--input",
      `${CLI_TEST_FOLDER}input-cli-options.css`,
      "--output",
      `${CLI_TEST_FOLDER}output-cli-options.css`,
      "--selectors",
      "a",
      "li",
      "p",
      "--border-style",
      "2px solid blue",
    ]);

    const options = await getOptions(program);
    const expectedOptions: Options = {
      input: `${CLI_TEST_FOLDER}input-cli-options.css`,
      output: `${CLI_TEST_FOLDER}output-cli-options.css`,
      selectors: ["a", "li", "p"],
      borderStyle: {
        border: "2px solid blue",
      },
    };
    expect(options).toEqual(expectedOptions);
  });
});
