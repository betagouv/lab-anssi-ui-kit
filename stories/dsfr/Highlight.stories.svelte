<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    highlightArgTypes,
    highlightArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/highlight/template/stories/highlight-arg-types.js";

  import DsfrHighlight from "$lib/dsfr/DsfrHighlight.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Highlight",
    component: DsfrHighlight,
    argTypes: highlightArgTypes,
    args: highlightArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrHighlight>;
</script>

{#snippet template(args: Args)}
  <dsfr-highlight {...args}></dsfr-highlight>
{/snippet}

<Story name="Défaut" />
