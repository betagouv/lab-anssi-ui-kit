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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-pagination");
    const shadow = el?.shadowRoot;
    const pagesData = (args as unknown as { pages: { label: string }[] }).pages ?? [];

    await step("Les liens de page correspondent au nombre de pages", async () => {
      const pageLinks = shadow?.querySelectorAll(
        ".fr-pagination__link:not(.fr-pagination__link--first):not(.fr-pagination__link--last):not(.fr-pagination__link--prev):not(.fr-pagination__link--next)",
      );

      await expect(pageLinks?.length).toBe(pagesData.length);
    });

    await step("La page courante est marquée aria-current=page", async () => {
      const current = shadow?.querySelector('.fr-pagination__link[aria-current="page"]');

      await expect(current).toBeTruthy();
    });

    await step("Les boutons première/dernière et précédent/suivant sont présents", async () => {
      const first = shadow?.querySelector(".fr-pagination__link--first");
      const last = shadow?.querySelector(".fr-pagination__link--last");
      const prev = shadow?.querySelector(".fr-pagination__link--prev");
      const next = shadow?.querySelector(".fr-pagination__link--next");

      await expect(first).toBeTruthy();
      await expect(last).toBeTruthy();
      await expect(prev).toBeTruthy();
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
    const shadow = el?.shadowRoot;

    await step("Le bouton dernière page est désactivé", async () => {
      const last = shadow?.querySelector(".fr-pagination__link--last");

      await expect(last?.getAttribute("aria-disabled")).toBe("true");
    });

    await step("Le bouton suivant est désactivé", async () => {
      const next = shadow?.querySelector(".fr-pagination__link--next");

      await expect(next?.getAttribute("aria-disabled")).toBe("true");
    });
  }}
/>
