<script lang="ts">
  interface Props {
    ancres: Ancre[];
    indexActif?: number;
  }

  let { ancres, indexActif }: Props = $props();
</script>

<lab-anssi-ancres
  {ancres}
  index-actif={indexActif}
></lab-anssi-ancres>
