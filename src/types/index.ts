import * as CSS from "csstype";

/**
 * User defined options for debugBorders postCSS plugin
 *
 * @public
 */
export type UserDefinedOptions = {
  selectors: string[];
  borderStyle: CSS.Properties;
};
