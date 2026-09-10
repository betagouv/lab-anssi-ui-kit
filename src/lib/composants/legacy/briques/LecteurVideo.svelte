<script lang="ts">
  interface Props {
    source: string;
    sourceSousTitres: string;
    imageDeCouverture?: string;
    classe?: string;
  }

  let { source, sourceSousTitres, imageDeCouverture = "", classe = "" }: Props = $props();
</script>

<video controls class={classe} src={source} poster={imageDeCouverture}>
  <source src={source} type="video/mp4" />
  <track src={sourceSousTitres} kind="captions" srclang="fr" label="Français" />
  Votre navigateur ne supporte pas la fonctionnalité de lecture de vidéos.
</video>

<style lang="scss">
  video {
    width: 100%;
    max-width: 792px;
    max-height: 446px;
  }
</style>
