<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    radiosGroupArgTypes,
    radiosGroupArgs,
    getRadiosGroupData,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radios-group-arg-types.js";

  import DsfrRadiosGroup from "$lib/dsfr/DsfrRadiosGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  delete radiosGroupArgs.elements;

  const { Story } = defineMeta({
    title: "Composants/DSFR/Radios Group",
    component: DsfrRadiosGroup,
    argTypes: {
      ...radiosGroupArgTypes,
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
      onvaluechanged: {
        description:
          "Déclenché lors du changement de la valeur sélectionnée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: { radios: getRadiosGroupData(), ...radiosGroupArgs },
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Les boutons radio permettent à l’utilisateur de sélectionner une seule option dans une liste.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bouton-radio)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-radios-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrRadiosGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-radios-group
    id={args.id}
    legend={args.legend}
    radios={args.radios}
    hint={args.hint}
    size={args.size}
    rich={args.rich || undefined}
    has-pictogram={args.hasPictogram || undefined}
    inline={args.inline || undefined}
    disabled={args.disabled || undefined}
    value={args.value || ""}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    legend-size={args.legendSize}
    legend-weight={args.legendWeight}
  ></dsfr-radios-group>
{/snippet}

<Story name="Défaut" />

<Story name="Texte d'aide de la légende" args={{ hint: "Texte de description additionnel" }} />

<Story name="Texte d'aide des radios" args={{ radios: getRadiosGroupData(3, true) }} />

<Story name="Désactivé" args={{ disabled: true }} />

<Story name="Valide" args={{ status: "valid" }} />

<Story name="Erreur" args={{ status: "error" }} />

<Story name="Taille MD" args={{ size: "md" }} />

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="En ligne" args={{ inline: true }} />

<!--
<Story name="Riche" args={{ rich: true }} />

<Story name="Riche avec indice" args={{ rich: true, hint: "Texte de description additionnel" }} />

<Story name="Riche en ligne" args={{ rich: true, inline: true }} />

<Story
  name="Riche en ligne avec indice"
  args={{ rich: true, inline: true, hint: "Texte de description additionnel" }}
/>

<Story name="Riche sans image" args={{ rich: true, hasPictogram: false }} />

<Story name="Riche sans image en ligne" args={{ rich: true, hasPictogram: false, inline: true }} />
-->
