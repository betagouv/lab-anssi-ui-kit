<script lang="ts">
  interface Props {
    nom: string;
    taille?: "sm" | "md" | "lg" | undefined;
  }

  let { nom, taille }: Props = $props();
</script>

<lab-anssi-icone
  {nom}
  {taille}
></lab-anssi-icone>
