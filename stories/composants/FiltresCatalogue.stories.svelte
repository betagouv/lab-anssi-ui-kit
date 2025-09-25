<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";
  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  const { Story } = defineMeta({
    component: FiltresCatalogue,
    title: "Composants/ANSSI/Filtres Catalogue",
    args: {
      filtres: [
        { libelle: "Tous les besoins", valeur: "category1", icone: Success },
        { libelle: "Se protéger", valeur: "category2", icone: Success },
        { libelle: "Découvrir la cybersécurité", valeur: "category3", icone: Success },
        { libelle: "Découvrir les métiers", valeur: "category4", icone: Success },
        { libelle: "Explorer les formations", valeur: "category5", icone: Success },
      ],
    },
  });
</script>

<Story name="Defaut" />

<Story name="Horizontal" args={{ horizontal: true }} />
