<svelte:options
  customElement={{
    tag: "lab-anssi-tag",
    props: {
      couleurFond: { reflect: false, type: "String", attribute: "couleur-fond" },
      couleurTexte: { reflect: false, type: "String", attribute: "couleur-texte" },
      label: { reflect: false, type: "String", attribute: "label" },
      taille: { reflect: false, type: "String", attribute: "taille" },
    },
  }}
/>

<script lang="ts">
  export let label: string;
  export let couleurTexte: string | undefined;
  export let couleurFond: string | undefined;
  export let taille: "sm" | "md" = "sm";
</script>

<span class="tag {taille}" style:background={couleurFond} style:color={couleurTexte}>
  {label}
</span>

<style lang="scss">
  .tag {
    color: $tag-couleur-texte;
    background-color: $tag-couleur-fond;
    font-family: Marianne;
    font-weight: 400;
    display: inline-block;
    width: fit-content;
    white-space: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;

    &.sm {
      font-size: 0.75rem;
      line-height: 1.25rem;
      padding: 2px 8px;
      border-radius: 12px;
    }

    &.md {
      font-size: 0.875rem;
      line-height: 1.5rem;
      padding: 4px 12px;
      border-radius: 16px;
    }
  }
</style>
