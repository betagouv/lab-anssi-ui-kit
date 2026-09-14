<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    accordionArgs,
    accordionArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/accordion/template/stories/accordion-arg-types.js";

  import DsfrAccordion from "$lib/dsfr/DsfrAccordion.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Accordion",
    component: DsfrAccordion,
    args: { ...accordionArgs, titleMarkupLevel: 4 },
    argTypes: {
      ...accordionArgTypes,
      default: {
        description: "Contenu de l'accordéon (remplace la prop `content`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            "L'accordéon permet aux utilisateurs d'afficher et de masquer des sections de contenu présentés dans une page.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/accordeon)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-accordion"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrAccordion>;
</script>

{#snippet template(args: Args)}
  <dsfr-accordion
    is-expanded={args.isExpanded || undefined}
    id={args.id}
    label={args.label}
    content={args.content}
    title-markup-level={args.titleMarkupLevel}
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html args.content}
  </dsfr-accordion>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-accordion");
    const shadow = el?.shadowRoot;

    await step("L'accordéon est rendu avec le bouton et le contenu", async () => {
      const section = shadow?.querySelector("section.fr-accordion");
      await expect(section).toBeTruthy();

      const button = shadow?.querySelector("button.fr-accordion__btn");
      await expect(button).toBeTruthy();
      await expect(button?.textContent?.trim()).toBe("Libellé accordéon");

      const collapse = shadow?.querySelector(".fr-collapse");
      await expect(collapse).toBeTruthy();
    });

    await step("Le bouton a aria-expanded=false par défaut", async () => {
      const button = shadow?.querySelector("button.fr-accordion__btn");
      await expect(button?.getAttribute("aria-expanded")).toBe("false");
    });

    await step("Cliquer sur le bouton ouvre l'accordéon", async () => {
      const button = shadow?.querySelector("button.fr-accordion__btn") as HTMLElement;
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-expanded")).toBe("true");

      const collapse = shadow?.querySelector(".fr-collapse");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });

    await step("Cliquer à nouveau ferme l'accordéon", async () => {
      const button = shadow?.querySelector("button.fr-accordion__btn") as HTMLElement;
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-expanded")).toBe("false");
    });
  }}
/>
