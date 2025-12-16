<script lang="ts">
  interface Props {
    label: string;
    couleurTexte: string | undefined;
    couleurFond: string | undefined;
    taille?: "sm" | "md";
    type?: "defaut" | "selectionnable";
    presse?: boolean;
  }

  let { label, couleurTexte, couleurFond, taille, type, presse }: Props = $props();
</script>

<lab-anssi-tag
  {label}
  couleur-texte={couleurTexte}
  couleur-fond={couleurFond}
  {taille}
  {type}
  {presse}
></lab-anssi-tag>
