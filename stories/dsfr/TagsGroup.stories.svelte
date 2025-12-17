<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrTagsGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-tags-group
    tags={args.tags}
    type={args.type}
    size={args.size}
    group-markup={args.groupMarkup}
    has-icon={args.hasIcon || undefined}
  ></dsfr-tags-group>
{/snippet}

<Story name="Défaut" />
