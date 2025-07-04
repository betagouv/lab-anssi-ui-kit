<svelte:options
  customElement={{
    tag: "lab-anssi-bouton",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      variante: { reflect: false, type: "String", attribute: "variante" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      icone: { reflect: false, type: "String", attribute: "icone" },
      sansBordure: { reflect: false, type: "Boolean", attribute: "sans-bordure" },
      positionIcone: { reflect: false, type: "String", attribute: "position-icone" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let variante: "primaire" | "tertiaire";
  export let taille: "sm" | "md" | "lg";
  export let icone: string | undefined = undefined;
  export let sansBordure = false;
  export let positionIcone: "sans" | "seule" | "droite" | "gauche" = "sans";
</script>

<button class={`bouton ${variante} ${taille} icone-${positionIcone}`} class:sansBordure on:click>
  {#if (positionIcone === "gauche" || positionIcone === "seule") && icone}
    <Icone nom={icone} taille={taille === "lg" ? "md" : "sm"} />
  {/if}
  {#if positionIcone !== "seule"}
    <span>{titre}</span>
  {/if}
  {#if positionIcone === "droite" && icone}
    <Icone nom={icone} taille={taille === "lg" ? "md" : "sm"} />
  {/if}
</button>

<style lang="scss">
  @import "apparence-bouton.scss";
</style>
