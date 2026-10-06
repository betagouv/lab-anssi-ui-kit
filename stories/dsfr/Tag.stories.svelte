<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    tagArgs,
    tagArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tag-arg-types.js";

  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Tag",
    component: DsfrTag,
    argTypes: {
      ...tagArgTypes,
      onselected: {
        description: "Déclenché lorsque le tag est sélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onunselected: {
        description: "Déclenché lorsque le tag est désélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: tagArgs,
    parameters: {
      actions: { handles: ["selected", "unselected"] },
      docs: {
        description: {
          component:
            "Le tag catégorise/classe/organise les contenus à l'aide de mots-clés. Il aide les utilisateurs à rechercher et à trouver facilement une information.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-tag"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTag>;
</script>

{#snippet template(args: Args)}
  <dsfr-tag
    label={args.label}
    type={args.type}
    size={args.size}
    href={args.href}
    blank={args.blank || undefined}
    title={args.title}
    pressed={args.pressed || undefined}
    disabled={args.disabled || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    accent={args.accent}
  ></dsfr-tag>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tag");
    const shadow = el?.shadowRoot;

    await step("Le label est affiché", async () => {
      const tag = shadow?.querySelector(".fr-tag");

      await expect(tag?.textContent?.trim()).toBe(args.label);
    });

    await step("Le tag par défaut est un paragraphe", async () => {
      const tag = shadow?.querySelector("p.fr-tag");

      await expect(tag).toBeTruthy();
    });
  }}
/>

<Story
  name="Taille MD"
  args={{
    size: "md",
  }}
/>

<Story
  name="Taille SM"
  args={{
    size: "sm",
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tag");
    const shadow = el?.shadowRoot;

    await step("La classe de taille SM est appliquée", async () => {
      const tag = shadow?.querySelector(".fr-tag");

      await expect(tag?.classList.contains("fr-tag--sm")).toBe(true);
    });
  }}
/>

<Story
  name="Avec icône"
  args={{
    hasIcon: true,
    icon: "arrow-right-line",
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tag");
    const shadow = el?.shadowRoot;

    await step("La classe d'icône est appliquée", async () => {
      const tag = shadow?.querySelector(".fr-tag");

      await expect(tag?.classList.contains("fr-tag--icon-left")).toBe(true);
    });
  }}
/>

<Story
  name="Cliquable"
  args={{
    type: "clickable",
    size: "md",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tag");
    const shadow = el?.shadowRoot;

    await step("Le tag cliquable est un lien avec le bon href", async () => {
      const tag = shadow?.querySelector("a.fr-tag");

      await expect(tag?.getAttribute("href")).toBe(args.href);
    });
  }}
/>

<Story
  name="Cliquable taille SM"
  args={{
    type: "clickable",
    size: "sm",
  }}
/>

<Story
  name="Cliquable avec icône"
  args={{
    type: "clickable",
    hasIcon: true,
    icon: "arrow-right-line",
  }}
/>

<Story name="Cliquable accent">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="clickable" size="md" href="[URL - à modifier]"></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="clickable"
        size="md"
        href="[URL - à modifier]"
        accent="green-menthe"
      ></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="clickable"
        size="md"
        href="[URL - à modifier]"
        accent="yellow-moutarde"
      ></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story
  name="Pressable"
  play={async ({ canvasElement, step }) => {
    const tags = canvasElement.querySelectorAll("dsfr-tag");

    await step(
      "Le tag non pressé a aria-pressed=false, le pressé a aria-pressed=true",
      async () => {
        const unpressedBtn = tags[0]?.shadowRoot?.querySelector("button.fr-tag");

        await expect(unpressedBtn?.getAttribute("aria-pressed")).toBe("false");

        const pressedBtn = tags[1]?.shadowRoot?.querySelector("button.fr-tag");

        await expect(pressedBtn?.getAttribute("aria-pressed")).toBe("true");
      },
    );

    await step("Le clic sur un tag non pressé le sélectionne et émet selected", async () => {
      const handler = fn();
      tags[0]?.addEventListener("selected", handler);

      const btn = tags[0]?.shadowRoot?.querySelector("button.fr-tag") as HTMLElement;
      await userEvent.click(btn);

      await expect(btn.getAttribute("aria-pressed")).toBe("true");
      await expect(handler).toHaveBeenCalledOnce();

      tags[0]?.removeEventListener("selected", handler);
    });

    await step("Le clic sur un tag pressé le désélectionne et émet unselected", async () => {
      const handler = fn();
      tags[0]?.addEventListener("unselected", handler);

      const btn = tags[0]?.shadowRoot?.querySelector("button.fr-tag") as HTMLElement;
      await userEvent.click(btn);

      await expect(btn.getAttribute("aria-pressed")).toBe("false");
      await expect(handler).toHaveBeenCalledOnce();

      tags[0]?.removeEventListener("unselected", handler);
    });
  }}
>
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="md"></dsfr-tag>
      <dsfr-tag label="libellé tag" type="pressable" size="md" pressed></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story name="Pressable taille SM">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="sm"></dsfr-tag>
      <dsfr-tag label="libellé tag" type="pressable" size="sm" pressed></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story name="Pressable avec icône">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="sm" has-icon icon="arrow-right-line"
      ></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="pressable"
        size="sm"
        has-icon
        icon="arrow-right-line"
        pressed
      ></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story
  name="Fermable"
  args={{
    type: "dismissible",
    size: "md",
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-tag");
    const shadow = el?.shadowRoot;

    await step("Le tag fermable est un bouton avec la classe dismiss", async () => {
      const tag = shadow?.querySelector("button.fr-tag");

      await expect(tag?.classList.contains("fr-tag--dismiss")).toBe(true);
    });
  }}
/>

<Story
  name="Fermable taille SM"
  args={{
    type: "dismissible",
    size: "sm",
  }}
/>
