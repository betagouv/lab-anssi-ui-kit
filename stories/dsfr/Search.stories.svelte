<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    searchArgTypes,
    searchArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/search/template/stories/search-arg-types.js";
  import DsfrSearch from "$lib/dsfr/DsfrSearch.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Search",
    component: DsfrSearch,
    argTypes: searchArgTypes,
    args: searchArgs,
  });
</script>

<Story name="Défaut" />
