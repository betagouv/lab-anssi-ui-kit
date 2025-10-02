<svelte:options
  customElement={{
    tag: "dsfr-container",
    props: {
      fluid: { attribute: "fluid", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  interface Props {
    /** Permet de définir le conteneur comme "fluide" ou non */
    fluid?: boolean;
  }

  let { fluid = false }: Props = $props();
</script>

<div class={[!fluid && "fr-container", fluid && "fr-container--fluid"]}>
  <slot></slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module/container";
  @include grid($grid-settings);

  @include set-shadow-host();
  @include set-dsfr-sizing("container");
  @include set-dsfr-sizing("container-fluid");
</style>
