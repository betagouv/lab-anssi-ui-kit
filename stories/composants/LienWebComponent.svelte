<script lang="ts">
  interface Props {
    titre: string;
    href: string;
    variante: "primaire" | "tertiaire" | "tertiaire-sans-bordure";
    taille: "sm" | "md" | "lg";
    icone?: string | undefined;
    apparence?: "lien" | "bouton" | "lien-texte";
    cible?: string | undefined;
    positionIcone?: "sans" | "seule" | "droite" | "gauche";
    actif?: boolean;
    largeurMaximale?: boolean;
  }

  let { titre, href, variante, taille, icone, apparence, cible, positionIcone, actif, largeurMaximale }: Props = $props();
</script>

<lab-anssi-lien
  {titre}
  {href}
  {variante}
  {taille}
  {icone}
  {apparence}
  {cible}
  position-icone={positionIcone}
  {actif}
  largeur-maximale={largeurMaximale}
></lab-anssi-lien>
