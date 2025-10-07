<script module lang="ts">
  import DsfrNavigation from "$lib/dsfr/DsfrNavigation.svelte";
  import {
    navigationArgTypes,
    navigationArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/navigation/template/stories/navigation-arg-types.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Navigation",
    component: DsfrNavigation,
    argTypes: navigationArgTypes,
    args: navigationArgs,
  });
</script>

<Story name="Défaut" />
