<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    tagsGroupArgTypes,
    tagsGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tags-group-arg-types.js";
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/TagsGroup",
    component: DsfrTagsGroup,
    argTypes: tagsGroupArgTypes,
    args: tagsGroupArgs,
  });
</script>

<Story name="Défaut" />
