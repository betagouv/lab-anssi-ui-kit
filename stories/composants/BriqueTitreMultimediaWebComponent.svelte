<script lang="ts">
  interface Props {
    titre: string;
    multimedia: Video;
  }

  let { titre, multimedia }: Props = $props();
</script>

<lab-anssi-titre-multimedia
  {titre}
  {multimedia}
></lab-anssi-titre-multimedia>
