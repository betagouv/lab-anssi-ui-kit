<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    highlightArgTypes,
    highlightArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/highlight/template/stories/highlight-arg-types.js";

  import DsfrHighlight from "$lib/dsfr/DsfrHighlight.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Highlight",
    component: DsfrHighlight,
    argTypes: {
      ...highlightArgTypes,
      slotText: {
        name: "text",
        description: "Texte personnalisé de la mise en avant (remplace la prop `text`)",
        control: false,
        table: { category: "Slots" },
      },
      slotTitle: {
        name: "title",
        description: "Titre personnalisé de la mise en avant",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: highlightArgs,
    parameters: {
      docs: {
        description: {
          component:
            "La mise en exergue permet à l'utilisateur de distinguer et repérer une information facilement.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/mise-en-exergue)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-highlight"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrHighlight>;
</script>

{#snippet template(args: Args)}
  <dsfr-highlight {...args}></dsfr-highlight>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-highlight");
    const shadow = el?.shadowRoot;

    await step("Le texte est affiché avec la classe de taille correspondante", async () => {
      const text = shadow?.querySelector(`p.fr-text--${args.size ?? "md"}`);

      await expect(text?.textContent?.trim()).toContain(args.text);
    });
  }}
/>

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Taille LG" args={{ size: "lg" }} />

<Story
  name="Accent"
  args={{ accent: "green-menthe" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-highlight");
    const shadow = el?.shadowRoot;

    await step("La classe d'accent correspond à la prop", async () => {
      const highlight = shadow?.querySelector(".fr-highlight");

      await expect(highlight?.classList.contains(`fr-highlight--${args.accent}`)).toBe(true);
    });
  }}
/>

<Story name="Avec usage du slot par défaut">
  {#snippet template(args: Args)}
    <dsfr-highlight id={args.id} size={args.size} accent={args.accent}>
      <p slot="text">{args.text}</p>
    </dsfr-highlight>
  {/snippet}
</Story>
