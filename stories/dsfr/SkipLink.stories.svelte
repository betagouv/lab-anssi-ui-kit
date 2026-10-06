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
    args: { ...skiplinkArgs, ariaLabel: "Accès rapide" },
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-skiplink");
    const shadow = el?.shadowRoot;
    const { items: itemsData, ariaLabel } = args as unknown as {
      items: { label: string }[];
      ariaLabel: string;
    };

    await step("La navigation a le bon aria-label", async () => {
      const nav = shadow?.querySelector("nav[role='navigation']");

      await expect(nav?.getAttribute("aria-label")).toBe(ariaLabel);
    });

    await step("Les liens d'évitement correspondent aux données", async () => {
      const items = shadow?.querySelectorAll(".fr-skiplinks__list li");

      await expect(items?.length).toBe(itemsData.length);
    });

    await step("Le composant est masqué par défaut", async () => {
      const skiplinks = shadow?.querySelector(".fr-skiplinks") as HTMLElement;
      const rect = skiplinks?.getBoundingClientRect();

      await expect(rect?.bottom).toBeLessThanOrEqual(0);
    });

    await step("Le composant devient visible au focus sur un lien", async () => {
      const link = shadow?.querySelector("a") as HTMLElement;

      link?.focus();

      const skiplinks = shadow?.querySelector(".fr-skiplinks") as HTMLElement;
      const rect = skiplinks?.getBoundingClientRect();

      await expect(rect?.top).toBeGreaterThanOrEqual(0);

      link?.blur();
    });
  }}
/>
