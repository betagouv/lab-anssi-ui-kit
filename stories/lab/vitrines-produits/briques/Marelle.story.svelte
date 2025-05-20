<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import Marelle from "$lib/lab/vitrines-produits/briques/marelle/Marelle.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;
  let titre = 'Titre';
  let etapesmarelle = [
    {
      description: "Description",
      illustration: {
        lien: genereImageDePlaceholder(600, 400, 'Exemple illustration'),
        alt: ''
      },
      lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
      titre: "Première étape"
    },
    {
      description: "Description",
      illustration: {
        lien: genereImageDePlaceholder(600, 400, 'Exemple illustration'),
        alt: ''
      },
      lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
      titre: "Deuxième étape"
    },
  ];

  let action = {
    titre: "Action",
    lien: "#"
  }
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Briques/Marelle" icon="material-symbols:brick-outline">
    <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
    <Marelle
      {titre}
      {etapesmarelle}
      {action}
    />

    <svelte:fragment slot="controls">
      <Hst.Text title="Titre" bind:value={titre} />
      <Hst.Json title="Etapes à afficher" bind:value={etapesmarelle}  />
      <Hst.Json title="Action" bind:value={action} />
    </svelte:fragment>
</Hst.Story>