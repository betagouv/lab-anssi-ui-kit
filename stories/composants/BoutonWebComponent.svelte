<script lang="ts">
  interface Props {
    titre: string;
    variante: "primaire" | "secondaire" | "tertiaire" | "tertiaire-sans-bordure";
    taille: "sm" | "md" | "lg";
    icone?: string;
    positionIcone?: "sans" | "seule" | "droite" | "gauche";
    actif?: boolean;
    largeurMaximale?: boolean;
  }

  let { titre, variante, taille, icone, positionIcone, actif, largeurMaximale }: Props = $props();
</script>

<lab-anssi-bouton
  {titre}
  {variante}
  {taille}
  {icone}
  position-icone={positionIcone}
  {actif}
  largeur-maximale={largeurMaximale}
></lab-anssi-bouton>
