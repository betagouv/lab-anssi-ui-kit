<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    paginationArgTypes,
    paginationArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/pagination/template/stories/pagination-arg-types.js";

  import DsfrPagination from "$lib/dsfr/DsfrPagination.svelte";

  const camelCaseProps = (obj: Record<string, any>): Record<string, any> => {
    return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
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

<Story name="Défaut" />

<Story
  name="Dernière page"
  args={{
    currentPageIndex: paginationArgs.pages.length,
  }}
/>
