<script lang="ts">
  interface Props {
    tuiles?: Tuiles;
  }

  let { tuiles }: Props = $props();
</script>

<lab-anssi-carrousel-tuiles
  {tuiles}
></lab-anssi-carrousel-tuiles>
