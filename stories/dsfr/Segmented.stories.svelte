<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    segmentedArgTypes,
    segmentedArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/segmented/template/stories/segmented-arg-types.js";

  import DsfrSegmented from "$lib/dsfr/DsfrSegmented.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Segmented",
    component: DsfrSegmented,
    argTypes: segmentedArgTypes,
    args: { ...segmentedArgs, value: 1 },
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
