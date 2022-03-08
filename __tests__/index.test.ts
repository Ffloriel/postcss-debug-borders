import * as fs from "fs";
import postcss from "postcss";
import debugBorders from "../src/index";

describe("Debug Borders postcss plugin", () => {
  const files = ["simple"];

  for (const file of files) {
    it(`remove unused css with content option successfully: ${file}`, async () => {
      const input = fs
        .readFileSync(`${__dirname}/fixtures/src/${file}.css`)
        .toString();
      const expected = fs
        .readFileSync(`${__dirname}/fixtures/expected/${file}.css`)
        .toString();
      const result = await postcss([
        debugBorders({
          selectors: [".hello", ".world"],
          borderStyle: {
            border: "1px solid red!important",
          },
        }),
      ]).process(input, { from: undefined });

      expect(result.css).toBe(expected);
      expect(result.warnings().length).toBe(0);
    });
  }
});
