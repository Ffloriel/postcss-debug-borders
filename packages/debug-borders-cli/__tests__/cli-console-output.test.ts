import { Command } from "commander";
import { parseCommandOptions, run } from "../src/";
import { CLI_TEST_FOLDER } from "./utils";

describe("Debug Borders CLI console output", () => {
  const program = parseCommandOptions(new Command());

  it("should log the result if output is not specified", async () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    program.parse([
      "debug-borders",
      "",
      "--input",
      `${CLI_TEST_FOLDER}/input-cli-console-output.css`,
    ]);
    await run(program);
    expect(console.log).toHaveBeenCalledWith(
      `[{"css":".hello {\\n  color: red;\\n}\\n","file":"${CLI_TEST_FOLDER}/src/style.css"}]`
    );
    console.log = originalConsoleLog;
  });
});
