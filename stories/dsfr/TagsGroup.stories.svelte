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

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-tags-group
      tags={args.tags}
      type={args.type}
      size={args.size}
      group-markup={args.groupMarkup}
      has-icon={args.hasIcon}
    ></dsfr-tags-group>
  {/snippet}
</Story>
