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

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-search
      input-id={args.inputId}
      input-label={args.inputLabel}
      button-label={args.buttonLabel}
      button-title={args.buttonTitle}
      size={args.size}
      input-placeholder={args.inputPlaceholder}
      value={args.value}
    ></dsfr-search>
  {/snippet}
</Story>
