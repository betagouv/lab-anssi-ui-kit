<svelte:options
  customElement={{
    tag: "lab-anssi-bouton",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      variante: { reflect: false, type: "String", attribute: "variante" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      icone: { reflect: false, type: "String", attribute: "icone" },
      sansBordure: { reflect: false, type: "Boolean", attribute: "sans-bordure" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let variante = "tertiaire";
  export let taille = "sm";
  export let icone: string | undefined = undefined;
  export let sansBordure = false;
</script>

<button class={`bouton ${variante} ${taille}`} class:sansBordure on:click>
  {titre}
  {#if icone}
    <Icone nom={icone} taille="sm" />
  {/if}
</button>

<style lang="scss">
  @import "apparence-bouton.scss";
</style>
