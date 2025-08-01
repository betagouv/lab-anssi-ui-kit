<svelte:options
  customElement={{
    tag: "lab-anssi-lien",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      href: { reflect: false, type: "String", attribute: "href" },
      variante: { reflect: false, type: "String", attribute: "variante" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      icone: { reflect: false, type: "String", attribute: "icone" },
      apparence: { reflect: false, type: "String", attribute: "apparence" },
      cible: { reflect: false, type: "String", attribute: "cible" },
      positionIcone: { reflect: false, type: "String", attribute: "position-icone" },
      actif: { reflect: false, type: "Boolean", attribute: "actif" },
      largeurMaximale: { reflect: false, type: "Boolean", attribute: "largeur-maximale" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let href: string;
  export let variante: "primaire" | "secondaire" | "tertiaire" | "tertiaire-sans-bordure";
  export let taille: "sm" | "md" | "lg";
  export let icone: string | undefined = undefined;
  export let apparence: "lien" | "bouton" | "lien-texte" = "lien";
  export let cible: string | undefined = undefined;
  export let positionIcone: "sans" | "seule" | "droite" | "gauche" = "sans";
  export let actif: boolean = true;
  export let largeurMaximale: boolean = false;
</script>

<a
  class={`${variante} ${taille} icone-${positionIcone} ${apparence}`}
  class:largeur-maximale={largeurMaximale}
  {href}
  target={cible}
  title={positionIcone === "seule" ? titre : ""}
  aria-disabled={!actif}
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
  {#if cible === "_blank"}
    <Icone nom="external-link-line" />
  {/if}
</a>

<style lang="scss">
  .bouton {
    text-decoration: none;
  }

  .lien-texte {
    font-family: Marianne, arial, sans-serif;
    color: inherit;
    display: inline-flex;
    gap: 2px;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      bottom: 0.2em;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: currentColor;
    }

    &:hover {
      &:before {
        bottom: calc(0.2em - 1px);
        height: 2px;
      }
    }
  }

  .lien {
    font-family: Marianne, arial, sans-serif;
    color: $couleur-lien;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    position: relative;

    &.sm {
      font-size: 0.875rem;
      line-height: 1.5rem;
    }

    &.md {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    &.lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $couleur-lien;
    }

    &:hover {
      &:before {
        bottom: -1px;
        height: 2px;
      }
    }

    &:active {
      background: rgb(0, 0, 0, 8%);
    }

    &:focus-visible {
      outline: 2px solid #0a76f6;
      outline-offset: 2px;
    }
  }

  @import "apparence-bouton.scss";
</style>
