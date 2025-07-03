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
      sansBordure: { reflect: false, type: "Boolean", attribute: "sans-bordure" },
      cible: { reflect: false, type: "String", attribute: "cible" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let href: string;
  export let variante = "tertiaire";
  export let taille = "sm";
  export let icone: string | undefined = undefined;
  export let sansBordure = false;
  export let apparence: "lien" | "bouton" = "lien";
  export let cible: string | undefined = undefined;
</script>

<a
  class={`bouton ${variante} ${taille}`}
  class:sansBordure
  {href}
  target={cible}
  class:bouton={apparence === "bouton"}
  class:lien={apparence === "lien"}
>
  {titre}
  {#if icone && apparence === "bouton"}
    <Icone nom={icone} taille="sm" />
  {/if}
  {#if cible === "_blank"}
    <Icone nom="external-link-line" taille="sm" />
  {/if}
</a>

<style lang="scss">
  .bouton {
    text-decoration: none;
  }

  .lien {
    font-family: Marianne, arial, sans-serif;
    color: $couleur-lien;
    display: flex;
    gap: 2px;
    align-items: center;
    width: fit-content;
    text-decoration: none;
    position: relative;

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

    &:focus {
      outline: 2px solid #0a76f6;
      outline-offset: 2px;
    }
  }

  @import "apparence-bouton.scss";
</style>
