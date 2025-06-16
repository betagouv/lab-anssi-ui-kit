<script lang="ts">
  import type { Tag } from "$lib/types";

  export let tag: Tag = null;
</script>

<span class="tag" style="background: {tag.couleurFond}; color: {tag.couleurTexte};">
  {tag.label}
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
