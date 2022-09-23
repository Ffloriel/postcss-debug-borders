import * as postcss from "postcss";
import debugBorders, { UserDefinedOptions } from "postcss-debug-borders";

export type Options = {
  color: string;
};

export async function addDebugBorder(
  css: string,
  options: UserDefinedOptions
): Promise<string> {
  return (await postcss.default([debugBorders(options)]).process(css)).css;
}
