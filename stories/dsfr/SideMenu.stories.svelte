<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    sidemenuArgTypes,
    sidemenuArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/sidemenu/template/stories/sidemenu-arg-types.js";
  import DsfrSideMenu from "$lib/dsfr/DsfrSideMenu.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Side Menu",
    component: DsfrSideMenu,
    argTypes: sidemenuArgTypes,
    args: { ...sidemenuArgs, buttonId: "sidemenu-collapse-1" },
  });
</script>

<Story name="Défaut" />
