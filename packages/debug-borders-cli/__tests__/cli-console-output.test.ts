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
      `a {
  color: blue;
}
* {
  border: 1px solid red;
}
`
    );
    console.log = originalConsoleLog;
  });
});
