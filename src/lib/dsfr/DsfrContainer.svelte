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
    /**
     * Permet de définir le conteneur comme "fluide" ou non
     */
    fluid?: boolean;

    /**
     * Permet de définir le contenu du conteneur
     */
    children?: import("svelte").Snippet;
  }

  let { fluid = false, children }: Props = $props();
</script>

<div class={[!fluid && "fr-container", fluid && "fr-container--fluid"]}>
  {@render children?.()}
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";

  .fr-container {
    &,
    &--fluid {
      box-sizing: border-box;
    }
  }
</style>
