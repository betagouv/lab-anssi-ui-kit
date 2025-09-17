<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
  });
</script>

<Story name="Defaut" />
