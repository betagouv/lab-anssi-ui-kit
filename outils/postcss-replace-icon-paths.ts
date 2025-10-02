import type { Declaration as PostCSSDeclaration } from "postcss";

const replaceIconPaths = ({ assetsPath }: { assetsPath: string }) => {
  return {
    postcssPlugin: "replace-icon-paths",
    Declaration(decl: PostCSSDeclaration) {
      if (decl.prop.includes("mask-image") || decl.prop.includes("-webkit-mask-image")) {
        decl.value = decl.value.replace(
          /url\("(\.\.\/)*icons\//g,
          `url("${assetsPath}/icones/dsfr/`,
        );
      }
    },
  };
};

export default replaceIconPaths;
