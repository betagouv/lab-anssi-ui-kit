<script lang="ts">
  interface Props {
    reactions?: Reaction[];
    variant?: "tertiaire" | "tertiaire-sans-bordure";
    tooltipTexte?: string;
    tooltipId?: string;
  }

  let { reactions, variant, tooltipTexte, tooltipId }: Props = $props();
</script>

<lab-anssi-reactions
  {reactions}
  {variant}
  tooltip-texte={tooltipTexte}
  tooltip-id={tooltipId}
></lab-anssi-reactions>
