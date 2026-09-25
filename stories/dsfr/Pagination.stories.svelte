<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    paginationArgTypes,
    paginationArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/pagination/template/stories/pagination-arg-types.js";

  import DsfrPagination from "$lib/dsfr/DsfrPagination.svelte";

  const camelCaseProps = (obj: Record<string, unknown>): Record<string, unknown> => {
    return Object.keys(obj).reduce((acc: Record<string, unknown>, key: string) => {
      acc[`${key.charAt(0).toLowerCase()}${key.slice(1)}`] = obj[key];
      return acc;
    }, {});
  };

  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Pagination",
    component: DsfrPagination,
    argTypes: {
      ...camelCaseProps(paginationArgTypes),
      onpagechange: {
        description: "Déclenché lors du changement de page.",
        table: {
          category: "Événements",
          type: { summary: "(page: number) => void" },
        },
        control: false,
      },
    },
    args: camelCaseProps(paginationArgs),
    parameters: {
      actions: { handles: ["pagechange"] },
      docs: {
        description: {
          component:
            "La pagination permet à l’utilisateur de naviguer entre les différentes pages d’une liste d'éléments.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/pagination)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-pagination"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrPagination>;
</script>

{#snippet template(args: Args)}
  <dsfr-pagination
    pages={args.pages}
    has-first-and-last={args.hasFirstAndLast || undefined}
    first={args.first}
    last={args.last}
    first-and-last-displayed-lg={args.firstAndLastDisplayedLg || undefined}
    has-prev-and-next={args.hasPrevAndNext || undefined}
    prev={args.prev}
    next={args.next}
    prev-and-next-displayed-lg={args.prevAndNextDisplayedLg || undefined}
    prev-and-next-has-lg-label={args.prevAndNextHasLgLabel || undefined}
    current-page-index={args.currentPageIndex}
  ></dsfr-pagination>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-pagination");

    await step("La pagination est rendue", async () => {
      const nav = el?.shadowRoot?.querySelector("nav.fr-pagination");
      await expect(nav).toBeTruthy();
      const list = el?.shadowRoot?.querySelector(".fr-pagination__list");
      await expect(list).toBeTruthy();
    });

    await step("Les liens de pagination sont présents", async () => {
      const links = el?.shadowRoot?.querySelectorAll(".fr-pagination__link");
      await expect(links?.length).toBeGreaterThan(0);
    });

    await step("La page courante est marquée aria-current=page", async () => {
      const current = el?.shadowRoot?.querySelector('.fr-pagination__link[aria-current="page"]');
      await expect(current).toBeTruthy();
    });

    await step("Les boutons première/dernière et précédent/suivant sont présents", async () => {
      const first = el?.shadowRoot?.querySelector(".fr-pagination__link--first");
      await expect(first).toBeTruthy();
      const last = el?.shadowRoot?.querySelector(".fr-pagination__link--last");
      await expect(last).toBeTruthy();
      const prev = el?.shadowRoot?.querySelector(".fr-pagination__link--prev");
      await expect(prev).toBeTruthy();
      const next = el?.shadowRoot?.querySelector(".fr-pagination__link--next");
      await expect(next).toBeTruthy();
    });
  }}
/>

<Story
  name="Dernière page"
  args={{
    currentPageIndex: paginationArgs.pages.length,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-pagination");

    await step("Le bouton dernière page est désactivé", async () => {
      const last = el?.shadowRoot?.querySelector(".fr-pagination__link--last");
      await expect(last?.getAttribute("aria-disabled")).toBe("true");
    });

    await step("Le bouton suivant est désactivé", async () => {
      const next = el?.shadowRoot?.querySelector(".fr-pagination__link--next");
      await expect(next?.getAttribute("aria-disabled")).toBe("true");
    });
  }}
/>
