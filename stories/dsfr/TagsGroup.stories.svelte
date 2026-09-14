<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
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

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const dsfrTagsGroup = canvasElement.querySelector("dsfr-tags-group");

    await step("Le groupe de tags est rendu", async () => {
      const group = dsfrTagsGroup?.shadowRoot?.querySelector(".fr-tags-group");
      await expect(group).toBeTruthy();
    });

    await step("Le groupe contient 3 tags", async () => {
      const tags = dsfrTagsGroup?.shadowRoot?.querySelectorAll(".fr-tag");
      await expect(tags?.length).toBe(3);
    });

    await step("Le groupe utilise une liste ul par défaut", async () => {
      const ul = dsfrTagsGroup?.shadowRoot?.querySelector("ul.fr-tags-group");
      await expect(ul).toBeTruthy();
    });
  }}
/>

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
  play={async ({ canvasElement, step }) => {
    const dsfrTagsGroup = canvasElement.querySelector("dsfr-tags-group");

    await step("Les tags pressables sont des boutons", async () => {
      const buttons = dsfrTagsGroup?.shadowRoot?.querySelectorAll("button.fr-tag");
      await expect(buttons?.length).toBe(3);
    });

    await step("Le clic bascule l'état pressé d'un tag", async () => {
      const button = dsfrTagsGroup?.shadowRoot?.querySelector("button.fr-tag") as HTMLElement;
      await expect(button?.getAttribute("aria-pressed")).toBe("false");
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-pressed")).toBe("true");
    });
  }}
/>

<Story
  name="Fermable"
  args={{
    type: "dismissible",
    tags: getTagsData(),
  }}
/>
