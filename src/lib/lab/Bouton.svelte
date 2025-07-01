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

<style>
  .bouton {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: Marianne, arial, sans-serif;
    cursor: pointer;

    &.tertiaire {
      align-items: center;
      color: #0d0c21;
      text-align: center;
      background: white;
      border: 1px solid #ddd;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      border-radius: 4px;

      &.sm {
        padding: 4px 12px;
      }

      &.sansBordure {
        border: none;
      }

      &:hover {
        background: rgb(0, 0, 0, 4%);
      }

      &:active {
        background: rgb(0, 0, 0, 8%);
      }

      &:focus {
        outline: 2px solid #0a76f6;
        outline-offset: 2px;
      }
    }
  }
</style>
