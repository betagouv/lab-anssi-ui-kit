<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";
  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  const { Story } = defineMeta({
    component: FiltresCatalogue,
    title: "Composants/ANSSI/Filtres Catalogue",
    args: {
      filtres: [
        { id: "category1", label: "Tous les besoins", value: "category1", icon: Success },
        { id: "category2", label: "Se protéger", value: "category2", icon: Success },
        {
          id: "category3",
          label: "Découvrir la cybersécurité",
          value: "category3",
          icon: Success,
        },
        { id: "category4", label: "Découvrir les métiers", value: "category4", icon: Success },
        { id: "category5", label: "Explorer les formations", value: "category5", icon: Success },
      ],
      idFiltreActif: "category1",
    },
  });
</script>

<Story name="Defaut" />

<Story name="Horizontal" args={{ horizontal: true }} />
