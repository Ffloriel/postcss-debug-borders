import { addDebugBorder } from "../src";

describe("add debug borders", () => {
  it("should add debug borders", async () => {
    const css = `
      .foo {
        color: red;
      }
    `;
    const expected = `
      .foo {
        color: red;
      }
.foo {
        border: 1px solid red!important;
}
    `;

    const result = await addDebugBorder(css, {
      selectors: [".foo"],
      borderStyle: {
        border: "1px solid red!important",
      },
    });
    expect(result).toBe(expected);
  });
});
