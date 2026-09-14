<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    quoteArgs,
    quoteArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/quote/template/stories/quote-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.1x1.png";

  import DsfrQuote from "$lib/dsfr/DsfrQuote.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Quote",
    component: DsfrQuote,
    args: { ...quoteArgs, src: Placeholder, sourceUrl: "www.google.com" },
    argTypes: quoteArgTypes,
    parameters: {
      docs: {
        description: {
          component:
            "La citation permet de citer un texte dans une page éditoriale. La citation peut provenir d'un extrait d’un discours oral formulé par une tierce personne ou d’un texte écrit.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/citation)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-quote"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrQuote>;
</script>

{#snippet template(args: Args)}
  <dsfr-quote
    text={args.text}
    size={args.size}
    has-author={args.hasAuthor || undefined}
    author={args.author}
    has-details={args.hasDetails || undefined}
    sources={args.sources}
    has-image={args.hasImage || undefined}
    src={args.src}
    alt={args.alt}
    accent={args.accent}
    source-url={args.sourceUrl}
  ></dsfr-quote>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-quote");

    await step("La citation est rendue", async () => {
      const figure = el?.shadowRoot?.querySelector("figure.fr-quote");
      await expect(figure).toBeTruthy();
    });

    await step("Le blockquote contient du texte", async () => {
      const blockquote = el?.shadowRoot?.querySelector("blockquote");
      await expect(blockquote).toBeTruthy();
      await expect(blockquote?.textContent?.length).toBeGreaterThan(0);
    });

    await step("L'auteur est affiché", async () => {
      const author = el?.shadowRoot?.querySelector(".fr-quote__author");
      await expect(author).toBeTruthy();
      await expect(author?.textContent).toBe("Auteur");
    });

    await step("Les sources sont affichées", async () => {
      const sources = el?.shadowRoot?.querySelector(".fr-quote__source");
      await expect(sources).toBeTruthy();
      const items = sources?.querySelectorAll("li");
      await expect(items?.length).toBeGreaterThan(0);
    });

    await step("L'image est affichée", async () => {
      const image = el?.shadowRoot?.querySelector(".fr-quote__image img");
      await expect(image).toBeTruthy();
    });
  }}
/>

<Story
  name="Sans auteur"
  args={{
    hasAuthor: false,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-quote");

    await step("L'auteur n'est pas affiché", async () => {
      const author = el?.shadowRoot?.querySelector(".fr-quote__author");
      await expect(author).toBeNull();
    });
  }}
/>

<Story
  name="Sans source"
  args={{
    sources: [],
  }}
/>

<Story
  name="Sans image"
  args={{
    hasImage: false,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-quote");

    await step("L'image n'est pas affichée", async () => {
      const image = el?.shadowRoot?.querySelector(".fr-quote__image");
      await expect(image).toBeNull();
    });

    await step("La classe column n'est pas appliquée", async () => {
      const figure = el?.shadowRoot?.querySelector("figure.fr-quote");
      await expect(figure?.classList.contains("fr-quote--column")).toBe(false);
    });
  }}
/>

<Story
  name="Accent"
  args={{
    accent: "green-menthe",
  }}
/>
