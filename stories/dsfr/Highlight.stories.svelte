<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
  });
</script>

<Story name="Défaut" />
