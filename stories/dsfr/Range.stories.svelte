<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    rangeArgTypes,
    rangeArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/range/template/stories/range-arg-types.js";

  import DsfrRange from "$lib/dsfr/DsfrRange.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Range",
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

<Story name="Défaut" />
