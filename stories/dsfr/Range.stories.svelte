<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    rangeArgTypes,
    rangeArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/range/template/stories/range-arg-types.js";

  import DsfrRange from "$lib/dsfr/DsfrRange.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Range",
    component: DsfrRange,
    argTypes: {
      ...rangeArgTypes,
      messagesgroup: {
        description: "Messages d'aide ou d'erreur personnalisés",
        control: false,
        table: { category: "Slots" },
      },
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur le label",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur le label",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de la valeur principale.<br>" + "`detail: number`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<number>" },
        },
        control: false,
      },
      onvalue2changed: {
        description:
          "Déclenché lors du changement de la seconde valeur (curseur double).<br>" +
          "`detail: number`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<number>" },
        },
        control: false,
      },
    },
    args: rangeArgs,
    parameters: {
      actions: { handles: ["valuechanged", "value2changed"] },
      docs: {
        description: {
          component:
            "Les curseurs sont des entrées numériques qui permettent de voir graphiquement une sélection par rapport à une valeur minimale et maximale. Ils servent à montrer en temps réel les options choisies et à éclairer la prise de décision.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/curseur)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-range"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrRange>;
</script>

{#snippet template(args: Args)}
  <dsfr-range
    id={args.id}
    label={args.label}
    hide-label={args.hideLabel || undefined}
    name={args.name}
    hint={args.hint}
    size={args.size}
    min={args.min}
    max={args.max}
    value={args.value}
    step={args.step}
    prefix={args.prefix}
    suffix={args.suffix}
    disabled={args.disabled || undefined}
    is-double={args.isDouble || undefined}
    value2={args.value2}
    min-value-label={args.minValueLabel}
    max-value-label={args.maxValueLabel}
    is-step={args.isStep || undefined}
    indicators={args.indicators ?? true}
    status={args.status}
    error-message={args.errorMessage}
    hide-output-label={args.hideOutputLabel || undefined}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-range>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-range");

    await step("Le groupe de curseur est rendu", async () => {
      const rangeGroup = el?.shadowRoot?.querySelector(".fr-range-group");
      await expect(rangeGroup).toBeTruthy();
    });

    await step("Le curseur est présent", async () => {
      const range = el?.shadowRoot?.querySelector(".fr-range");
      await expect(range).toBeTruthy();
      const input = el?.shadowRoot?.querySelector('input[type="range"]');
      await expect(input).toBeTruthy();
    });

    await step("Le label est affiché", async () => {
      const label = el?.shadowRoot?.querySelector("label.fr-label");
      await expect(label).toBeTruthy();
    });

    await step("Les indicateurs min et max sont affichés", async () => {
      const min = el?.shadowRoot?.querySelector(".fr-range__min");
      await expect(min).toBeTruthy();
      await expect(min?.textContent).toBe("0");
      const max = el?.shadowRoot?.querySelector(".fr-range__max");
      await expect(max).toBeTruthy();
      await expect(max?.textContent).toBe("100");
    });

    await step("La valeur de sortie est affichée", async () => {
      const output = el?.shadowRoot?.querySelector(".fr-range__output");
      await expect(output).toBeTruthy();
      await expect(output?.textContent).toBe("50");
    });
  }}
/>
