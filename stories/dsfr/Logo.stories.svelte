<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    logoArgTypes,
    logoArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/logo/template/stories/logo-arg-types.js";
  import DsfrLogo from "$lib/dsfr/DsfrLogo.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Logo",
    component: DsfrLogo,
    argTypes: logoArgTypes,
    args: logoArgs,
  });
</script>

<Story name="Défaut" />
