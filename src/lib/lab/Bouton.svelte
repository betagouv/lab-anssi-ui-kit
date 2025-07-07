<svelte:options
  customElement={{
    tag: "lab-anssi-bouton",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      variante: { reflect: false, type: "String", attribute: "variante" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      icone: { reflect: false, type: "String", attribute: "icone" },
      positionIcone: { reflect: false, type: "String", attribute: "position-icone" },
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
</script>

<button
  class={`bouton ${variante} ${taille} icone-${positionIcone}`}
  on:click
  title={positionIcone === "seule" ? titre : ""}
>
  {#if (positionIcone === "gauche" || positionIcone === "seule") && icone}
    <Icone nom={icone} taille={taille === "lg" ? "md" : "sm"} />
  {/if}
  {#if positionIcone !== "seule"}
    <span><slot>{titre}</slot></span>
  {/if}
  {#if positionIcone === "droite" && icone}
    <Icone nom={icone} taille={taille === "lg" ? "md" : "sm"} />
  {/if}
</button>

<style lang="scss">
  @import "apparence-bouton.scss";
</style>
