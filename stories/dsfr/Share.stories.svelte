<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    shareArgTypes,
    shareArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/share/template/stories/share-arg-types.js";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  import DsfrShare from "$lib/dsfr/DsfrShare.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Share",
    component: DsfrShare,
    argTypes: {
      ...shareArgTypes,
      hasText: {
        control: { type: "boolean" },
        description: "Affiche le slot `text` avec du contenu personnalisé",
        if: { arg: "disabled", eq: true },
      },
      slotText: {
        name: "text",
        description:
          "Contenu personnalisé du texte informatif, permettant d'utiliser des composants riches (ex: `DsfrLink`). Remplace la prop `text`.",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: shareArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le composant de partage permet à l'utilisateur de partager la page sur les réseaux sociaux, par email ou de copier le lien dans le presse-papier.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/partage)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-share"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrShare>;
</script>

{#snippet template(args: Args)}
  <dsfr-share
    title={args.title}
    buttons={args.buttons}
    disabled={args.disabled || undefined}
    text={args.text}
  >
    {#if args.hasText}
      <span slot="text">
        Veuillez <DsfrLink neutral href="#" label="autoriser le dépôt de cookies" /> pour partager sur
        Facebook, Twitter, Bluesky et LinkedIn.
      </span>
    {/if}
  </dsfr-share>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-share");
    const shadow = el?.shadowRoot;
    const buttonsData = (args as unknown as { buttons: { type: string }[] }).buttons ?? [];

    await step("Le titre est affiché", async () => {
      const title = shadow?.querySelector(".fr-share__title");

      await expect(title?.textContent?.trim()).toBe(args.title);
    });

    await step("Les boutons de partage correspondent aux données", async () => {
      const buttons = shadow?.querySelectorAll(".fr-btns-group li");

      await expect(buttons?.length).toBe(buttonsData.length);
    });
  }}
/>

<Story
  name="Désactivé"
  args={{
    disabled: true,
    hasText: true,
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-share");
    const shadow = el?.shadowRoot;
    const buttonsData = (args as unknown as { buttons: { type: string }[] }).buttons ?? [];
    const socialTypes = [
      "facebook",
      "twitter-x",
      "twitter",
      "bluesky",
      "threads",
      "linkedin",
      "mastodon",
    ];
    const socialCount = buttonsData.filter((b) => socialTypes.includes(b.type)).length;

    await step("Le texte informatif est affiché", async () => {
      const text = shadow?.querySelector(".fr-share__text");

      await expect(text?.textContent?.trim()).toBeTruthy();
    });

    await step("Les boutons sociaux sont désactivés", async () => {
      const disabledLinks = shadow?.querySelectorAll("a[aria-disabled='true']");

      await expect(disabledLinks?.length).toBe(socialCount);
    });
  }}
/>
