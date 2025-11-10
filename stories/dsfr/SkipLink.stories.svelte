<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    skiplinkArgTypes,
    skiplinkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/skiplink/template/stories/skiplink-arg-types.js";
  import DsfrSkipLink from "$lib/dsfr/DsfrSkipLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/SkipLink",
    component: DsfrSkipLink,
    argTypes: skiplinkArgTypes,
    args: skiplinkArgs,
  });
</script>

<Story name="Défaut" />
