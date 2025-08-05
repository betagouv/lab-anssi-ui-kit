<script lang="ts">
  export let hauteurMinimale: string | undefined = "600px";
  export let alignement: "gauche" | "droite" | undefined = undefined;
</script>

<div
  class="conteneur-story"
  class:conteneur-story--droite={alignement === "droite"}
  style={hauteurMinimale ? `--min-height: ${hauteurMinimale};` : null}
>
  <slot />
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
