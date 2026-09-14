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
      title: {
        description: "Titre personnalisé de la mise en avant",
        control: false,
        table: { category: "Slots" },
      },
      text: {
        description: "Texte personnalisé de la mise en avant (remplace la prop `text`)",
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
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-highlight");

    await step("Le composant est rendu", async () => {
      const highlight = el?.shadowRoot?.querySelector(".fr-highlight");
      await expect(highlight).toBeTruthy();
    });

    await step("Le texte est affiché avec la taille par défaut", async () => {
      const text = el?.shadowRoot?.querySelector("p.fr-text--md");
      await expect(text).toBeTruthy();
      await expect(text?.textContent).toContain("Lorem ipsum");
    });
  }}
/>

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Taille LG" args={{ size: "lg" }} />

<Story
  name="Accent"
  args={{ accent: "green-menthe" }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-highlight");
    const highlight = el?.shadowRoot?.querySelector(".fr-highlight");
    await expect(highlight?.classList.contains("fr-highlight--green-menthe")).toBe(true);
  }}
/>
