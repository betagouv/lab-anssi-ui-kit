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
    argTypes: rangeArgTypes,
    args: rangeArgs,
    parameters: {
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
  ></dsfr-range>
{/snippet}

<Story name="Défaut" />
