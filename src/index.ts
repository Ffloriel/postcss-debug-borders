import * as postcss from "postcss";
import { UserDefinedOptions } from "./types";

const PLUGIN_NAME = "postcss-debug-borders";

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
