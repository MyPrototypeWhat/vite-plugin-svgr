import { transformWithEsbuild } from "vite";
import { createFilter } from "@rollup/pluginutils";
import fs from "fs";

const _SVG_PATTERN = "**/*.svg";

const VitePluginSvgr = (SVG_PATTERN = _SVG_PATTERN) => {
  const filter = createFilter(SVG_PATTERN);
  return {
    name: "vite-plugin-svgr",
    enforce: "pre",
    async load(id) {
      if (!filter(id)) return null;
      const { transform } = await import("@svgr/core");
      const { default: jsx } = await import("@svgr/plugin-jsx");
      const code = fs.readFileSync(filePath, "utf-8");
      const svgrCode = await transform(
        code,
        {
          plugins: [
            "@svgr/plugin-svgo",
            "@svgr/plugin-jsx",
            "@svgr/plugin-prettier",
          ],
          icon: true,
        },
        {
          filePath,
          caller: {
            defaultPlugins: [jsx],
          },
        }
      );
      const result = await transformWithEsbuild(svgrCode, id, {
        loader: "jsx",
      });
      return {
        code: result.code,
        map: null,
      };
    },
  };
};
export default VitePluginSvgr;
