<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    linkArgTypes,
    linkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/link/template/stories/link-arg-types.js";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Link",
    component: DsfrLink,
    argTypes: linkArgTypes,
    args: linkArgs,
  });
</script>

<Story name="Défaut" />

<Story name="Ouverture dans un nouvel onglet" args={{ ...linkArgs, blank: true }} />
