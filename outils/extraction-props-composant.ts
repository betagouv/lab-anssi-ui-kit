import { parse } from "svelte/compiler";
import ts, { ScriptTarget } from "typescript";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SvelteASTNode = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

export const extraitPropsComposant = (
  contenuSvelteOptions: string,
  contenuSvelteScript: string,
) => {
  const ast = parse(contenuSvelteOptions);
  const noeudOptions = (ast.html.children as SvelteASTNode[] | undefined)?.find(
    (noeud) => noeud.name === "svelte:options",
  );
  const noeudCustomElement = noeudOptions?.attributes.find(
    (attribut: SvelteASTNode) => (attribut.name = "customElement"),
  );

  const estDeclarationSimple = noeudCustomElement.value[0].type === "Text";

  const nomWebComponent = estDeclarationSimple
    ? noeudCustomElement.value[0].data
    : noeudCustomElement.value[0].expression.properties.find(
        (p: SvelteASTNode) => p.key.name === "tag",
      ).value.value;

  const props: { nom: string; optionnelle: boolean }[] = [];
  const source = ts.createSourceFile(
    "component.ts",
    contenuSvelteScript,
    ScriptTarget.Latest,
    true,
  );

  const parcoursAST = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.getText() === "Props") {
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && member.name && member.type) {
          const nom = member.name.getText();
          const optionnelle = !!member.questionToken;

          props.push({ nom, optionnelle });
        }
      }
      return;
    }

    ts.forEachChild(node, parcoursAST);
  };

  parcoursAST(source);

  if (!estDeclarationSimple) {
    const noeudProps = noeudCustomElement.value[0].expression.properties.find(
      (p: SvelteASTNode) => p.key.name === "props",
    );

    if (!noeudProps)
      return {
        nomWebComponent,
        props: [],
      };

    const propsAvecAttribut: { nom: string; nomReel: string }[] = noeudProps.value.properties.map(
      (p: SvelteASTNode) => {
        const nom = p.key.name;
        const nomReel = p.value.properties.find((v: SvelteASTNode) => v.key.name === "attribute")
          .value.value;

        if (nomReel.toLowerCase() !== nomReel)
          throw new Error(
            "Il est impossible d'utiliser des props avec majuscules pour les web components",
          );

        return { nom, nomReel };
      },
    );

    for (const propAvecAttribut of propsAvecAttribut) {
      const index = props.findIndex((p) => p.nom === propAvecAttribut.nom);
      if (index !== -1) props[index].nom = propAvecAttribut.nomReel;
    }
  }

  return {
    nomWebComponent,
    props,
  };
};
