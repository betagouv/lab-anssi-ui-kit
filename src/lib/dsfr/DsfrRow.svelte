<svelte:options
  customElement={{
    tag: "dsfr-row",
    props: {
      gutters: { attribute: "gutters", type: "Boolean" },
      horizontal: { attribute: "horizontal", type: "String" },
      vertical: { attribute: "vertical", type: "String" },
    },
  }}
/>

<script lang="ts">
  interface Props {
    /** Permets d'ajouter des espacements entre les colonnes */
    gutters?: boolean;
    /** Définit l'alignement horizontal des colonnes */
    horizontal?: "left" | "right" | "center";
    /** Définit l'alignement vertical des colonnes */
    vertical?: "top" | "bottom" | "middle";
  }

  let { gutters = false, horizontal, vertical }: Props = $props();
</script>

<div
  class={[
    "fr-grid-row",
    horizontal && `fr-grid-row--${horizontal}`,
    vertical && `fr-grid-row--${vertical}`,
  ]}
  class:fr-grid-row--gutters={gutters}
>
  <slot></slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module/row";
  @include grid($grid-settings);

  @include set-dsfr-sizing("grid-row");
</style>
