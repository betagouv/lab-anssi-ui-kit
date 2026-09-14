<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
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

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");

    await step("Le composant est rendu avec la légende et les segments", async () => {
      const fieldset = el?.shadowRoot?.querySelector("fieldset.fr-segmented");
      await expect(fieldset).toBeTruthy();

      const legend = el?.shadowRoot?.querySelector(".fr-segmented__legend");
      await expect(legend).toBeTruthy();

      const radios = el?.shadowRoot?.querySelectorAll("input[type='radio']");
      await expect(radios?.length).toBeGreaterThan(0);
    });

    await step("Un clic sur un segment change la sélection", async () => {
      const labels = el?.shadowRoot?.querySelectorAll(".fr-segmented__element label");
      const secondLabel = labels?.[1] as HTMLLabelElement;
      await expect(secondLabel).toBeTruthy();
      await userEvent.click(secondLabel);

      const secondRadio = el?.shadowRoot?.querySelectorAll("input[type='radio']")[1] as HTMLInputElement;
      await expect(secondRadio?.checked).toBe(true);
    });
  }}
/>

<Story name="Avec icône" args={{ hasIcon: true }} />

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Légende en ligne" args={{ legendInline: true }} />

<Story
  name="Texte d'aide"
  args={{ hint: "Texte de description additionnel" }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const hint = el?.shadowRoot?.querySelector(".fr-hint-text");
    await expect(hint).toBeTruthy();
    await expect(hint?.textContent).toBe("Texte de description additionnel");
  }}
/>

<Story name="Sans légende" args={{ noLegend: true }} />

<Story
  name="Désactivé"
  args={{ elements: getSegmentedData(3, true) }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const radios = el?.shadowRoot?.querySelectorAll("input[type='radio']");
    const disabledRadios = Array.from(radios ?? []).filter((r) => (r as HTMLInputElement).disabled);
    await expect(disabledRadios.length).toBeGreaterThan(0);
  }}
/>
