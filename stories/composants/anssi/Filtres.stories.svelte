<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";

  const { Story } = defineMeta({
    component: FiltresCatalogue,
    title: "Composants/ANSSI/Filtres Catalogue",
  });
</script>

<Story name="Défaut" />

<Story name="Horizontal" args={{ horizontal: true }} />
