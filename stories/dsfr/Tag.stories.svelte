<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    tagArgs,
    tagArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tag-arg-types.js";
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tag",
    component: DsfrTag,
    argTypes: tagArgTypes,
    args: tagArgs,
  });
</script>

<Story name="Défaut" />
