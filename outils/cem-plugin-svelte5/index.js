import constants from "./const.js";
import { parse } from "svelte/compiler";

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 */
export default function sveltePlugin() {
  return {
    name: "svelte-plugin5",
    /**
     * Runs for each module
     * @param {import('@custom-elements-manifest/analyzer').AnalyzePhaseParams} params
     */
    analyzePhase({ ts, node, moduleDoc }) {
      if (node.kind === 312) {
        // You can use this phase to access a module's AST nodes and mutate the custom-elements-manifest.

        const sourceFile = node.getSourceFile();
        const fileName = sourceFile?.fileName.split("/").pop();
        if (!fileName?.endsWith(".svelte")) return;

        const svelteSource = sanitize(sourceFile.text?.trim() ?? "");
        const ast = parse(svelteSource);

        // Get the content of the script element that should be added to the component
        const scriptContent = getScriptContent(ast, svelteSource);
        if (!scriptContent) return;

        // Create a new script file, as svelte script files (may be) not valid for the typescript compiler.
        const scriptFile = createSourceFile(sourceFile.fileName, scriptContent, ts);

        const className = fileName.replace(".svelte", "");
        const tagName = extractTagName(ast) ?? className.toLowerCase();

        moduleDoc.declarations.push({
          kind: "class",
          name: className,
          tagName,
          attributes: extractAttributes(scriptFile, ts),
          // events: extractEvents(node),
          customElement: true,
        });
        moduleDoc.exports.push({
          kind: "custom-element-definition",
          name: tagName,
          declaration: {
            name: className,
            module: sourceFile?.fileName,
          },
        });
      }
    },
  };
}

/**
 * Replaces single line comments (// ...) with multiline comments (/* ... *\/)
 * inside <style lang>...</style> blocks.
 * @param {string} svelteSource
 * @returns {string}
 */
function sanitize(svelteSource) {
  return svelteSource.replace(
    /<style\s+lang=["'][^"']+["'][\s\S]*?>[\s\S]*?<\/style>/gi,
    (styleBlock) =>
      styleBlock.replace(/^(\s*)\/\/(.*)$/gm, (_, ws, comment) => `${ws}/*${comment} */`),
  );
}

/**
 * Locates the script tag inside the node, extracts it's content and returns it.
 * @param {Record<string,any>} ast
 * @returns {string|undefined}
 */
function getScriptContent(ast, html) {
  if (!ast || !ast.instance) return undefined;
  const scriptNode = ast.instance;
  return html.slice(scriptNode.content.start, scriptNode.content.end);
}

/**
 *
 * @param {Record<string,any>} ast
 * @returns {string|undefined}
 */
function extractTagName(ast) {
  const svelteOptions = ast.html.children.find((c) => c.name === "svelte:options");
  const customElement = svelteOptions?.attributes[0].value[0];
  if (!customElement) return undefined;
  if (customElement.type === "Text") return customElement.data;

  const tag = customElement.expression?.properties?.find((p) => p.key.name === "tag");
  return tag?.value.value;
}

/**
 * Creates a new source file from the given parameters.
 * @param {string} fileName
 * @param {string} content
 * @param {import("typescript")} ts
 * @returns {import("typescript").SourceFile}
 */
function createSourceFile(fileName, content, ts) {
  return ts.createSourceFile(fileName, content, constants.ScriptTarget, true);
}

/**
 * Extracts the export statements of a source file and maps them into an array.
 * @param {{import("typescript").SourceFile}} sourceFile
 * @param {import("typescript")} ts
 * @returns {Array<{name: string, optional: boolean, typeName: string}>}
 */
function extractAttributes(sourceFile) {
  const statement = sourceFile.statements.find(
    (statement) =>
      statement.kind === 243 &&
      statement.declarationList.declarations[0].initializer.getText() === "$props()",
  );
  const propsTypeName = statement?.declarationList.declarations[0].type.getText();
  if (!propsTypeName) return [];

  return sourceFile.statements
    .filter((statement) => statement.kind === 264 && statement.name.getText() === propsTypeName)
    .flatMap((statement) => {
      return statement.members;
    })
    .map((member) => {
      let type = member.type.getText();
      if (!["string", "number", "boolean"].includes(type)) {
        if (type.endsWith("[]")) type = "object[]";
        else type = "object";
      }
      return {
        name: member.name.getText(),
        required: !member.questionToken, // not used!
        type: { text: type },
      };
    });
}
