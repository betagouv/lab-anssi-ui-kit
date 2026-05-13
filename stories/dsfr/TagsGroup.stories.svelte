<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tagsGroupArgTypes,
    tagsGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tags-group-arg-types.js";

  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/TagsGroup",
    component: DsfrTagsGroup,
    argTypes: {
      ...tagsGroupArgTypes,
      onselected: {
        description: "Déclenché lorsqu'un tag est sélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onunselected: {
        description: "Déclenché lorsqu'un tag est désélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: tagsGroupArgs,
    parameters: {
      actions: { handles: ["selected", "unselected"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-tags-group"),
        },
      },
    },
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
