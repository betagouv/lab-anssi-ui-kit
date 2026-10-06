<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const shadow = el?.shadowRoot;
    const { legend: legendText, elements: elementsData } = args as unknown as {
      legend: string;
      elements: { value?: string | number }[];
    };

    await step("La légende et les segments sont affichés", async () => {
      const legend = shadow?.querySelector(".fr-segmented__legend");

      await expect(legend?.textContent).toContain(legendText);

      const radios = shadow?.querySelectorAll("input[type='radio']");

      await expect(radios?.length).toBe(elementsData.length);
    });

    await step(
      "Un clic sur un segment change la sélection et émet l'événement valuechanged",
      async () => {
        const handler = fn();
        el?.addEventListener("valuechanged", handler);

        const labels = shadow?.querySelectorAll(".fr-segmented__element label");
        const secondLabel = labels?.[1] as HTMLLabelElement;

        await userEvent.click(secondLabel);

        const secondRadio = shadow?.querySelectorAll("input[type='radio']")[1] as HTMLInputElement;

        await expect(secondRadio?.checked).toBe(true);
        await expect(handler).toHaveBeenCalledOnce();

        el?.removeEventListener("valuechanged", handler);
      },
    );
  }}
/>

<Story
  name="Avec icône"
  args={{ hasIcon: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const shadow = el?.shadowRoot;

    await step("Les labels des segments ont une classe d'icône", async () => {
      const labels = shadow?.querySelectorAll(".fr-segmented__element label");

      labels?.forEach((label) => {
        const hasIconClass = Array.from(label.classList).some((c) => c.startsWith("fr-icon-"));

        expect(hasIconClass).toBe(true);
      });
    });
  }}
/>

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Légende en ligne" args={{ legendInline: true }} />

<Story
  name="Texte d'aide"
  args={{ hint: "Texte de description additionnel" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const shadow = el?.shadowRoot;

    await step("Le texte d'aide est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe((args as unknown as { hint: string }).hint);
    });
  }}
/>

<Story
  name="Sans légende"
  args={{ noLegend: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const shadow = el?.shadowRoot;

    await step("Le fieldset a la classe no-legend", async () => {
      const fieldset = shadow?.querySelector("fieldset.fr-segmented");

      await expect(fieldset?.classList.contains("fr-segmented--no-legend")).toBe(true);
    });
  }}
/>

<Story
  name="Désactivé"
  args={{ elements: getSegmentedData(3).map((el) => ({ ...el, disabled: true })) }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-segmented");
    const shadow = el?.shadowRoot;

    await step("Tous les radios sont désactivés", async () => {
      const radios = shadow?.querySelectorAll("input[type='radio']");

      radios?.forEach((radio) => {
        expect((radio as HTMLInputElement).disabled).toBe(true);
      });
    });
  }}
/>
