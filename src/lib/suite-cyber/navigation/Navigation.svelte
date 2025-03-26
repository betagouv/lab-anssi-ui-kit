<svelte:options customElement="lab-anssi-suite-cyber-navigation" />

<script lang="ts">
  import { srcAsset } from "$lib/mes-services-cyber/assets.js";
  const iconeBouton = srcAsset("/icones/bouton-gauffre.svg");
  const iconeChevron = srcAsset("/icones/chevron.svg");

  type format = "mobile" | "tablette" | "desktop";
  let formatEcran: format;
  let estOuvert: boolean;

  $: estOuvert = false;
  $: formatEcran =
    window.innerWidth < 576 ? "mobile" : window.innerWidth < 932 ? "tablette" : "desktop";
  $: enBureau = formatEcran === "desktop";
</script>

<button
  class:actif={estOuvert}
  class:large={enBureau}
  on:click={() => {
    estOuvert = !estOuvert;
  }}
>
  <img src={iconeBouton} alt="La Suite cyber" />
  {#if enBureau}
    La Suite cyber
    <img src={iconeChevron} alt={estOuvert ? "ouvert" : "fermer"} class:ouvert={estOuvert} />
  {/if}
</button>

<style lang="scss">
  button {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border: none;
    color: #000091;
    font-family: Marianne;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    &.large {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    &.actif {
      background: #e3e3fd;
      &:active {
        background: #adadf9;
      }
      &:hover {
        background: #c1c1fb;
      }
    }
    img.ouvert {
      transform: rotate(180deg);
    }
  }
</style>
