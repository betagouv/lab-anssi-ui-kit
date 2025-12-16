<script lang="ts">
  interface Props {
    titre: string;
    paragraphe: string;
    action?: Action | undefined;
    ordre?: "texte-gauche" | "texte-droite";
    illustration: Image;
  }

  let { titre, paragraphe, action, ordre, illustration }: Props = $props();
</script>

<lab-anssi-brique-contenu-a-deux-colonnes
  {titre}
  {paragraphe}
  {action}
  {ordre}
  {illustration}
></lab-anssi-brique-contenu-a-deux-colonnes>
