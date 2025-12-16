<script lang="ts">
  interface Props {
    titre?: string;
    temoignages?: Temoignage[];
  }

  let { titre, temoignages }: Props = $props();
</script>

<lab-anssi-temoignages
  {titre}
  {temoignages}
></lab-anssi-temoignages>
