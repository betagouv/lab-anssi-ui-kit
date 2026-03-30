<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";

  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Filtres Catalogue",
    component: FiltresCatalogue,
    args: {
      filtres: [
        { libelle: "Tous les besoins", valeur: "category1", icone: Success },
        { libelle: "Se protéger", valeur: "category2", icone: Success },
        { libelle: "Découvrir la cybersécurité", valeur: "category3", icone: Success },
        { libelle: "Découvrir les métiers", valeur: "category4", icone: Success },
        { libelle: "Explorer les formations", valeur: "category5", icone: Success },
      ],
    },
    argTypes: {
      onvaleurachangee: {
        description: "Callback appelé quand le filtre actif change",
        control: false,
        table: { category: "Événements" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<FiltresCatalogue>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-filtres
    filtres={args.filtres}
    horizontal={args.horizontal || undefined}
    valeur={args.valeur}
    onvaleurachangee={args.onvaleurachangee}
  ></lab-anssi-filtres>
{/snippet}

<Story name="Defaut" />

<Story name="Horizontal" args={{ horizontal: true }} />
