<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    checkboxesGroupArgs,
    checkboxesGroupArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkboxes-group-arg-types.js";

  import DsfrCheckboxesGroup from "$lib/dsfr/DsfrCheckboxesGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const checkboxes3 = [
    { id: "chk1", value: "valeur1", label: "Checkbox 1" },
    { id: "chk2", value: "valeur2", label: "Checkbox 2" },
    { id: "chk3", value: "valeur3", label: "Checkbox 3" },
  ];

  const checkboxes3WithHint = [
    { id: "chk1", value: "valeur1", label: "Checkbox 1", hint: "Texte additionnel" },
    { id: "chk2", value: "valeur2", label: "Checkbox 2", hint: "Texte additionnel" },
    { id: "chk3", value: "valeur3", label: "Checkbox 3", hint: "Texte additionnel" },
  ];

  const checkboxes2 = [
    { id: "chk1", value: "valeur1", label: "Checkbox 1" },
    { id: "chk2", value: "valeur2", label: "Checkbox 2" },
  ];

  const args = {
    ...checkboxesGroupArgs,
    checkboxes: [
      {
        id: "chk1",
        value: "valeur1",
        label: "Checkbox 1",
      },
      {
        id: "chk2",
        value: "valeur2",
        label: "Checkbox 2",
        hint: "Aide additionnelle",
      },
      {
        id: "chk3",
        value: "valeur3",
        label: "Checkbox 3",
      },
    ],
  };

  const { Story } = defineMeta({
    title: "Composants/DSFR/Checkboxes Group",
    component: DsfrCheckboxesGroup,
    argTypes: {
      ...checkboxesGroupArgTypes,
      legendSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur la légende",
      },
      legendWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur la légende",
      },
      onvalueschanged: {
        description:
          "Déclenché lors du changement des valeurs sélectionnées.<br>" + "`detail: string[]`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string[]>" },
        },
        control: false,
      },
    },
    args,
    parameters: {
      actions: { handles: ["valueschanged"] },
      docs: {
        description: {
          component:
            "La case à cocher permet à l’utilisateur de sélectionner une ou plusieurs options dans une liste. Elle est utilisée pour effectuer des sélections multiples (de 0 à N éléments), ou bien pour permettre un choix binaire, lorsque l’utilisateur peut sélectionner ou désélectionner une seule option.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/case-a-cocher)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-checkboxes-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCheckboxesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-checkboxes-group
    id={args.id}
    legend={args.legend}
    checkboxes={args.checkboxes}
    hint={args.hint}
    size={args.size}
    inline={args.inline || undefined}
    disabled={args.disabled || undefined}
    values={args.values}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    legend-size={args.legendSize}
    legend-weight={args.legendWeight}
  ></dsfr-checkboxes-group>
{/snippet}

<Story name="Défaut" />

<Story
  name="Texte d'aide de la légende"
  args={{ ...args, hint: "Texte de description additionnel", checkboxes: checkboxes3 }}
/>

<Story name="Texte d'aide des checkboxes" args={{ ...args, checkboxes: checkboxes3WithHint }} />

<Story name="En ligne" args={{ ...args, inline: true, checkboxes: checkboxes2 }} />

<Story name="Taille MD" args={{ ...args, size: "md", checkboxes: checkboxes3 }} />

<Story name="Taille SM" args={{ ...args, size: "sm", checkboxes: checkboxes3 }} />

<Story name="Désactivé" args={{ ...args, disabled: true, checkboxes: checkboxes3 }} />

<Story name="Erreur" args={{ ...args, status: "error", checkboxes: checkboxes3 }} />

<Story name="Succès" args={{ ...args, status: "valid", checkboxes: checkboxes3 }} />
