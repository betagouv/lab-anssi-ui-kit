<script lang="ts">
  interface Props {
    filtres: Filtre[];
    horizontal?: boolean;
    valeur?: string;
  }

  let { filtres, horizontal, valeur }: Props = $props();
</script>

<lab-anssi-filtres
  {filtres}
  {horizontal}
  {valeur}
></lab-anssi-filtres>
