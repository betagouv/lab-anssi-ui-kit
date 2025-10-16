<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    toggleArgTypes,
    toggleArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/toggle/template/stories/toggle-arg-types.js";
  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Toggle",
    component: DsfrToggle,
    argTypes: toggleArgTypes,
    args: toggleArgs,
  });
</script>

<Story name="Défaut" />
