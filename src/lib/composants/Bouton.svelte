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
      largeurMaximale: { reflect: false, type: "Boolean", attribute: "largeur-maximale" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/composants/Icone.svelte";

  interface Props {
    titre: string;
    variante: "primaire" | "tertiaire" | "tertiaire-sans-bordure";
    taille: "sm" | "md" | "lg";
    icone?: string | undefined;
    positionIcone?: "sans" | "seule" | "droite" | "gauche";
    actif?: boolean;
    largeurMaximale?: boolean;
  }

  let {
    titre,
    variante,
    taille,
    icone = undefined,
    positionIcone = "sans",
    actif = true,
    largeurMaximale = false,
  }: Props = $props();
</script>

<button
  class={`bouton ${variante} ${taille} icone-${positionIcone}`}
  class:largeur-maximale={largeurMaximale}
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
  @import "../styles/apparence-bouton.scss";
</style>
