<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    footerArgTypes,
    footerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/footer/template/stories/footer-arg-types.js";
  import DsfrFooter from "$lib/dsfr/DsfrFooter.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Footer",
    component: DsfrFooter,
    argTypes: footerArgTypes,
    args: footerArgs,
  });
</script>

<Story name="Défaut" />
