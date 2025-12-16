<script lang="ts">
  interface Props {
    index: number;
    etapeMarelle: EtapeMarelle;
    pair: boolean;
  }

  let { index, etapeMarelle, pair }: Props = $props();
</script>

<lab-anssi-marelle-etape
  {index}
  etape-marelle={etapeMarelle}
  {pair}
></lab-anssi-marelle-etape>
