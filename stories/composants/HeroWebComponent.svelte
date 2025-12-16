<script lang="ts">
  interface Props {
    titre: string;
    baliseTitre: string;
    description: string;
    inverse?: boolean;
    urlImage?: string | undefined;
    sansImage?: boolean;
  }

  let { titre, baliseTitre, description, inverse, urlImage, sansImage }: Props = $props();
</script>

<lab-anssi-hero
  {titre}
  balise-titre={baliseTitre}
  {description}
  {inverse}
  url-image={urlImage}
  sans-image={sansImage}
></lab-anssi-hero>
