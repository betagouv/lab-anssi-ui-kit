<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import BriqueTitreMultimedia from "$lib/lab/vitrines-produits/briques/BriqueTitreMultimedia.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  let titre = 'Titre pour MSS';
  let source = 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4';
  let sousTitres = 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt';
  let couverture = genereImageDePlaceholder(792, 446, "Vidéo d'exemple");
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Titre Multimédia" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <BriqueTitreMultimedia
    {titre}
    multimedia={{ source, sourcesoustitres: sousTitres, imagedecouverture: couverture }}
  />
  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Lien MP4" bind:value={source}  />
    <Hst.Text title="Lien sous-titres" bind:value={sousTitres}  />
    <Hst.Text title="Placeholder" bind:value={couverture}  />
  </svelte:fragment>
</Hst.Story>
