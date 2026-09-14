<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    skiplinkArgTypes,
    skiplinkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/skiplink/template/stories/skiplink-arg-types.js";

  import DsfrSkipLink from "$lib/dsfr/DsfrSkipLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Skiplink",
    component: DsfrSkipLink,
    argTypes: skiplinkArgTypes,
    args: skiplinkArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Les liens d’évitement permettent aux utilisateurs naviguant au clavier, ou équipés de lecteurs d'écran, d’accéder plus rapidement à des zones précises de la page.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/lien-d-evitement)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-skiplink"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSkipLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-skiplink items={args.items} aria-label={args.ariaLabel}></dsfr-skiplink>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-skiplink");

    await step("Le composant est rendu avec la navigation", async () => {
      const skiplinks = el?.shadowRoot?.querySelector(".fr-skiplinks");
      await expect(skiplinks).toBeTruthy();

      const nav = el?.shadowRoot?.querySelector("nav[role='navigation']");
      await expect(nav).toBeTruthy();
      await expect(nav?.getAttribute("aria-label")).toBe("Accès rapide");
    });

    await step("Les liens d'évitement sont présents", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".fr-skiplinks__list li");
      await expect(items?.length).toBeGreaterThan(0);
    });
  }}
/>
