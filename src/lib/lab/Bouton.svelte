<svelte:options
  customElement={{
    tag: "lab-anssi-bouton",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      variante: { reflect: false, type: "String", attribute: "variante" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      icone: { reflect: false, type: "String", attribute: "icone" },
      positionIcone: { reflect: false, type: "String", attribute: "position-icone" },
      actif: { reflect: false, type: "Boolean", attribute: "actif" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let variante: "primaire" | "tertiaire" | "tertiaire-sans-bordure";
  export let taille: "sm" | "md" | "lg";
  export let icone: string | undefined = undefined;
  export let positionIcone: "sans" | "seule" | "droite" | "gauche" = "sans";
  export let actif: boolean = true;
</script>

<button
  class={`bouton ${variante} ${taille} icone-${positionIcone}`}
  on:click
  title={positionIcone === "seule" ? titre : ""}
  disabled={!actif}
>
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
