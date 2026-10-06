<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tags-group");
    const shadow = el?.shadowRoot;
    const tagsData = (args as unknown as { tags: unknown[] }).tags ?? [];

    await step("Les tags correspondent aux données", async () => {
      const tags = shadow?.querySelectorAll(".fr-tag");

      await expect(tags?.length).toBe(tagsData.length);
    });

    await step("Le groupe utilise une liste ul par défaut", async () => {
      const ul = shadow?.querySelector("ul.fr-tags-group");

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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tags-group");
    const shadow = el?.shadowRoot;

    await step("La classe de taille SM est appliquée", async () => {
      const group = shadow?.querySelector(".fr-tags-group");

      await expect(group?.classList.contains("fr-tags-group--sm")).toBe(true);
    });
  }}
/>

<Story
  name="Cliquable"
  args={{
    type: "clickable",
    tags: getTagsData(),
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tags-group");
    const shadow = el?.shadowRoot;
    const tagsData = (args as unknown as { tags: unknown[] }).tags ?? [];

    await step("Les tags cliquables sont des liens", async () => {
      const links = shadow?.querySelectorAll("a.fr-tag");

      await expect(links?.length).toBe(tagsData.length);
    });
  }}
/>

<Story
  name="Pressable"
  args={{
    type: "pressable",
    tags: pressableTags,
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tags-group");
    const shadow = el?.shadowRoot;
    const tagsData = (args as unknown as { tags: unknown[] }).tags ?? [];

    await step("Les tags pressables sont des boutons", async () => {
      const buttons = shadow?.querySelectorAll("button.fr-tag");

      await expect(buttons?.length).toBe(tagsData.length);
    });

    await step("Le clic sur un tag le sélectionne et émet selected", async () => {
      const handler = fn();
      el?.addEventListener("selected", handler);

      const button = shadow?.querySelector("button.fr-tag") as HTMLElement;

      await expect(button?.getAttribute("aria-pressed")).toBe("false");

      await userEvent.click(button);

      await expect(button?.getAttribute("aria-pressed")).toBe("true");
      await expect(handler).toHaveBeenCalledOnce();

      el?.removeEventListener("selected", handler);
    });

    await step("Le clic sur un tag sélectionné le désélectionne et émet unselected", async () => {
      const handler = fn();
      el?.addEventListener("unselected", handler);

      const button = shadow?.querySelector("button.fr-tag") as HTMLElement;

      await userEvent.click(button);

      await expect(button?.getAttribute("aria-pressed")).toBe("false");
      await expect(handler).toHaveBeenCalledOnce();

      el?.removeEventListener("unselected", handler);
    });
  }}
/>

<Story
  name="Fermable"
  args={{
    type: "dismissible",
    tags: getTagsData(),
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tags-group");
    const shadow = el?.shadowRoot;

    await step("Les tags fermables ont la classe dismiss", async () => {
      const buttons = shadow?.querySelectorAll("button.fr-tag");

      buttons?.forEach((btn) => {
        expect(btn.classList.contains("fr-tag--dismiss")).toBe(true);
      });
    });
  }}
/>
