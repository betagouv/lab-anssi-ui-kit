import { parse } from "svelte/compiler";
import ts, { ScriptTarget } from "typescript";
import type { TemplateNode } from "svelte/types/compiler/interfaces";

export const extraitPropsComposant = (
  contenuSvelteOptions: string,
  contenuFichierDeclarationType: string,
) => {
  const ast = parse(contenuSvelteOptions);
  const noeudOptions = ast.html.children?.find(
    (noeud: TemplateNode) => noeud.name === "svelte:options",
  );
  const noeudCustomElement = noeudOptions?.attributes.find(
    (attribut: TemplateNode) => (attribut.name = "customElement"),
  );

  const estDeclarationSimple = noeudCustomElement.value[0].type === "Text";

  const nomWebComponent = estDeclarationSimple
    ? noeudCustomElement.value[0].data
    : noeudCustomElement.value[0].expression.properties.find(
        (p: TemplateNode) => p.key.name === "tag",
      ).value.value;

  const props: { nom: string; optionnelle: boolean }[] = [];
  const source = ts.createSourceFile(
    "declaration.d.ts",
    contenuFichierDeclarationType,
    ScriptTarget.Latest,
    true,
  );

  const parcoursAST = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText() === "__propDef" &&
      node.type &&
      ts.isTypeLiteralNode(node.type)
    ) {
      const noeudProps = node.type.members.find(
        (m): m is ts.PropertySignature =>
          ts.isPropertySignature(m) && m.name?.getText() === "props",
      );

      if (noeudProps && noeudProps.type && ts.isTypeLiteralNode(noeudProps.type)) {
        for (const member of noeudProps.type.members) {
          if (ts.isPropertySignature(member) && member.name && member.type) {
            const nom = member.name.getText();
            const optionnelle = !!member.questionToken;

            props.push({ nom, optionnelle });
          }
        }
        return;
      }
    }

    ts.forEachChild(node, parcoursAST);
  };

  parcoursAST(source);

  if (!estDeclarationSimple) {
    const noeudProps = noeudCustomElement.value[0].expression.properties.find(
      (p: TemplateNode) => p.key.name === "props",
    );

    if (!noeudProps)
      return {
        nomWebComponent,
        props: [],
      };

    const propsAvecAttribut: { nom: string; nomReel: string }[] = noeudProps.value.properties.map(
      (p: TemplateNode) => {
        const nom = p.key.name;
        const nomReel = p.value.properties.find((v: TemplateNode) => v.key.name === "attribute")
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
