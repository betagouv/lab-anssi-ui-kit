<script lang="ts">
  export let label: string;
  export let couleurTexte: string;
  export let couleurFond: string;
</script>

<span class="tag" style="background: {couleurFond}; color: {couleurTexte};">
  {label}
</span>

<style lang="scss">
  .tag {
    padding: 2px 8px;
    border-radius: 12px;
    font-family: Marianne;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.25rem;
    display: inline-block;
    width: fit-content;
    white-space: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
