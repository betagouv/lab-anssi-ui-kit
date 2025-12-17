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

  const { Story } = defineMeta({
    title: "Composants/dsfr/Pagination",
    component: DsfrPagination,
    argTypes: camelCaseProps(paginationArgTypes),
    args: camelCaseProps(paginationArgs),
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

<Story name="Defaut" />
