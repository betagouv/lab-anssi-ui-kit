<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tagsGroupArgTypes,
    tagsGroupArgs,
    getTagsData,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tags-group-arg-types.js";

  const pressableTags = getTagsData().map((tag: Record<string, unknown>, index: number) => {
    if (index === 1) tag.pressed = true;
    return tag;
  });

  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/TagsGroup",
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
        description: {
          component:
            "Le tag catégorise/classe/organise les contenus à l'aide de mots-clés. Il aide les utilisateurs à rechercher et à trouver facilement une information.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag)",
        },
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

<Story
  name="Taille MD"
  args={{
    size: "md",
    type: "default",
    tags: getTagsData(),
  }}
/>

<Story
  name="Taille SM"
  args={{
    size: "sm",
    type: "default",
    tags: getTagsData(),
  }}
/>

<Story
  name="Cliquable"
  args={{
    type: "clickable",
    tags: getTagsData(),
  }}
/>

<Story
  name="Pressable"
  args={{
    type: "pressable",
    tags: pressableTags,
  }}
/>

<Story
  name="Fermable"
  args={{
    type: "dismissible",
    tags: getTagsData(),
  }}
/>
