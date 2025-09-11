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
  @use "@gouvfr/dsfr/src/dsfr/main" as *;
</style>
