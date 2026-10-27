import { parse, type AST } from "svelte/compiler";
import ts, { ScriptTarget } from "typescript";

type ConfigurationCustomElement = NonNullable<AST.SvelteOptions["customElement"]>;

const extraitNomDepuisConfiguration = (configuration: ConfigurationCustomElement): string => {
  if (!configuration.tag) {
    throw new Error("Impossible de déterminer le nom du web component");
  }

  return configuration.tag;
};

export const extraitConfigurationWebComponent = (contenuSvelteOptions: string) => {
  const configuration = parse(contenuSvelteOptions, { modern: true }).options?.customElement;

  if (!configuration) {
    throw new Error("Impossible de trouver la déclaration du web component");
  }

  return {
    nomWebComponent: extraitNomDepuisConfiguration(configuration),
    props: configuration.props ?? {},
  };
};

export const extraitPropsComposant = (
  contenuSvelteOptions: string,
  contenuSvelteScript: string,
) => {
  const configuration = extraitConfigurationWebComponent(contenuSvelteOptions);
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

  for (const [nom, configurationProp] of Object.entries(configuration.props)) {
    const nomRéel = configurationProp.attribute ?? nom;

    if (configurationProp.attribute && nomRéel.toLowerCase() !== nomRéel) {
      throw new Error(
        "Il est impossible d'utiliser des props avec majuscules pour les web components",
      );
    }

    const index = props.findIndex((prop) => prop.nom === nom);
    if (index !== -1) props[index].nom = nomRéel;
  }

  return {
    nomWebComponent: configuration.nomWebComponent,
    props,
  };
};
