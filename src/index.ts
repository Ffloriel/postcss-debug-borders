import * as postcss from "postcss";
import { UserDefinedOptions } from "./types";

export { UserDefinedOptions };

const PLUGIN_NAME = "postcss-debug-borders";

/**
 * Create a postCSS plugin that add a colored border to the provided selectors
 *
 * @param opts - User defined options
 * @returns the postCSS plugin
 *
 * @public
 */
const debugBorders: postcss.PluginCreator<UserDefinedOptions> = (opts) => {
  if (__DEVELOPMENT__) {
    console.log(opts);
  }
  if (typeof opts === "undefined")
    throw new Error("Debug Borders plugin does not have the correct options");

  return {
    postcssPlugin: PLUGIN_NAME,
    Once(root, { Rule, Declaration }) {
      const rule = new Rule({ selectors: opts.selectors });
      const borderStyles = Object.entries(opts.borderStyle);
      for (const [prop, value] of borderStyles) {
        rule.append(
          new Declaration({
            prop,
            value,
          })
        );
      }
      root.append(rule);
    },
  };
};

debugBorders.postcss = true;

export default debugBorders;
