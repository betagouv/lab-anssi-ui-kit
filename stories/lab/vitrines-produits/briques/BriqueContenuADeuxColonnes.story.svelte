<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import BriqueContenuADeuxColonnes from "$lib/lab/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";

  export let Hst: Hst;

  let titre = "Mon​Service​Sécurisé";
  let paragraphe = "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement";
  let illustration = { lien: genereImageDePlaceholder(600, 400, 'Placeholder'), alt: "Logo placeholder" };
  let action = { titre: "Commencer à sécuriser", lien: "#" };
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Contenu à deux colonnes" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <BriqueContenuADeuxColonnes {titre} {paragraphe} {illustration} {action} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Texte" bind:value={paragraphe} />
    <Hst.Json title="Illustration" bind:value={illustration} />
    <Hst.Json title="Action" bind:value={action} />
  </svelte:fragment>
</Hst.Story>
