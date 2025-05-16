<script lang="ts">
  export let source: string;
  export let sourceSousTitres: string;
  export let imageDeCouverture: string = '';
  export let classe: string = '';
</script>

<video
  controls
  class={classe}
  src={source}
  poster={imageDeCouverture}
>
  <source src={source} type="video/mp4" />
  <track
      src={sourceSousTitres}
      kind="captions"
      srclang="fr"
      label="Français"
  />
  Votre navigateur ne supporte pas la fonctionnalité de lecture de vidéos.
</video>

<style lang="scss">
  video {
    width: 328px;
    height: 184px;

    @include a-partir-de(tablette) {
      width: 544px;
      height: 305px;
    }

    @include a-partir-de(desktop) {
      width: 792px;
      height: 444px;
    }
  }
</style>