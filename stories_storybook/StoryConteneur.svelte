<script lang="ts">
  export let minHeight: string | undefined = "600px";
  export let align: "left" | "right" | undefined = undefined;
</script>

<div
  class="story-conteneur"
  class:story-conteneur--right={align === "right"}
  style={minHeight ? `--min-height: ${minHeight};` : null}
>
  <slot />
</div>

<style lang="scss">
  .story-conteneur {
    min-height: var(--min-height, 600px);

    &--right {
      display: flex;
      justify-content: end;
    }
  }
</style>
