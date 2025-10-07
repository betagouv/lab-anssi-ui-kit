<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types.js";
  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";

  const { toolLinks } = headerArgs;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Header",
    component: DsfrHeader,
    argTypes: headerArgTypes,
    args: { ...headerArgs, toolLinks: toolLinks.buttons },
  });
</script>

<Story name="Défaut" />
