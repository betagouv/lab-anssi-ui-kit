<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    segmentedArgTypes,
    segmentedArgs,
    getSegmentedData,
  } from "@gouvfr/dsfr/src/dsfr/component/segmented/template/stories/segmented-arg-types.js";

  import DsfrSegmented from "$lib/dsfr/DsfrSegmented.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Segmented",
    component: DsfrSegmented,
    argTypes: {
      ...segmentedArgTypes,
      onvaluechanged: {
        description:
          "Déclenché lors du changement de segment actif.<br>" + "`detail: number | string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<number | string>" },
        },
        control: false,
      },
    },
    args: { ...segmentedArgs, value: 1 },
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Le composant « contrôle segmenté » incite l'utilisateur à choisir entre plusieurs options d'affichage disponibles (vues), mutuellement exclusives avec une valeur sélectionnée par défaut.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/controle-segmente)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-segmented"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSegmented>;
</script>

{#snippet template(args: Args)}
  <dsfr-segmented
    size={args.size}
    legend={args.legend}
    legend-inline={args.legendInline || undefined}
    no-legend={args.noLegend || undefined}
    hint={args.hint}
    has-icon={args.hasIcon || undefined}
    elements={args.elements}
    value={args.value}
  ></dsfr-segmented>
{/snippet}

<Story name="Défaut" />

<Story name="Avec icône" args={{ hasIcon: true }} />

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Légende en ligne" args={{ legendInline: true }} />

<Story name="Texte d'aide" args={{ hint: "Texte de description additionnel" }} />

<Story name="Sans légende" args={{ noLegend: true }} />

<Story name="Désactivé" args={{ elements: getSegmentedData(3, true) }} />
