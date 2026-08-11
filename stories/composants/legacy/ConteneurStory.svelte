<script lang="ts">
  interface Props {
    hauteurMinimale?: string | undefined;
    alignement?: "gauche" | "droite" | undefined;
    children?: import("svelte").Snippet;
  }

  let { hauteurMinimale = "600px", alignement = undefined, children }: Props = $props();
</script>

<div
  class="conteneur-story"
  class:conteneur-story--droite={alignement === "droite"}
  style={hauteurMinimale ? `--min-height: ${hauteurMinimale};` : null}
>
  {@render children?.()}
</div>

<style lang="scss">
  .conteneur-story {
    min-height: var(--min-height, 600px);

    &--droite {
      display: flex;
      justify-content: end;
    }
  }
</style>
