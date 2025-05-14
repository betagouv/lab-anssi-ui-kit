<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import BriqueTitreMultimedia from "$lib/lab/vitrines-produits/briques/BriqueTitreMultimedia.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  let source = 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4';
  let sousTitres = 'https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt';

</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Titre Multimédia" icon="material-symbols:brick-outline">
    <Hst.Variant title="MSS">
      <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
      <BriqueTitreMultimedia
        titre="Titre pour MSS"
        multimedia={{ source, sourcesoustitres: sousTitres, imagedecouverture: genereImageDePlaceholder(2000, 900, "Vidéo d'exemple") }}
      />
    </Hst.Variant>
  <Hst.Variant title="MAC">
    <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
    <BriqueTitreMultimedia
      titre="Titre pour MAC"
      multimedia={{ source, sourcesoustitres: sousTitres, imagedecouverture: genereImageDePlaceholder(2000, 900, "Vidéo d'exemple") }}
    />
  </Hst.Variant>
  <Hst.Variant title="MSC">
    <OutilSelecteurTheme themeSelectionne="MesServicesCyber" />
    <BriqueTitreMultimedia
      titre="Titre pour MSC"
      multimedia={{ source, sourcesoustitres: sousTitres, imagedecouverture: genereImageDePlaceholder(2000, 900, "Vidéo d'exemple") }}
    />
  </Hst.Variant>

  <svelte:fragment slot="controls">
    <Hst.Text bind:value={source} title="Lien vers un fichier .mp4" />
    <Hst.Text bind:value={sousTitres} title="Lien vers les sous titres" />
  </svelte:fragment>
</Hst.Story>
