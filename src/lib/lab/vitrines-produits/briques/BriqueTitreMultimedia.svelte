<svelte:options
  customElement={{
    tag: "lab-anssi-titre-multimedia",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      multimedia: { reflect: false, type: "Object", attribute: "multimedia" },
    },
  }}
/>

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Video } from "$lib/types";
  import LecteurVideo from "$lib/lab/vitrines-produits/briques/LecteurVideo.svelte";

  export let titre: string;
  export let multimedia: Video;
</script>

<Brique variation="transparent">
  <div class="bloc-multimedia">
    <h2>{titre}</h2>
    <div>
      <LecteurVideo
        source={multimedia.source}
        sourceSousTitres={multimedia.sourcesoustitres}
        imageDeCouverture={multimedia.imagedecouverture}
      />
    </div>
  </div>
</Brique>

<style lang="scss">
  .bloc-multimedia {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;

    h2 {
      color: $titre-couleur-primaire;
      font-size: 28px;
      line-height: 36px;
      margin: 0;
      text-align: center;

      @include a-partir-de(desktop) {
        font-size: 32px;
        line-height: 40px;
      }
    }
  }
</style>
