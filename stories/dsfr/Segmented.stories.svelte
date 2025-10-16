<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
  });
</script>

<Story name="Défaut" />
