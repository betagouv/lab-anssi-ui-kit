<svelte:options
  customElement={{
    tag: "lab-anssi-footer",
    props: {
      description: { reflect: false, type: "String", attribute: "description" },
      liensPrincipaux: { reflect: false, type: "Array", attribute: "liensPrincipaux" },
      liensNavigation: { reflect: false, type: "Array", attribute: "liensNavigation" },
      contributeurs: { reflect: false, type: "Array", attribute: "contributeurs" },
    },
  }}
/>

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets.js";
  import Icone from "./Icone.svelte";

  type Lien = {
    label: string;
    href: string;
  };

  type Contributeur = {
    image: string;
  };

  export let description: string;
  export let liensPrincipaux: Lien[];
  export let liensNavigation: Lien[];
  export let contributeurs: Contributeur[];
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-top">
      <img class="footer-marianne" src={srcAsset("/icones/marianne.svg")} alt="Marque de l'État" />
      <div class="footer-right">
        <p class="footer-description">
          {description}
        </p>
        <div class="footer-links">
          {#each liensPrincipaux as lien}
            <a href={lien.href} class="footer-links-item" target="_blank" rel="noopener noreferrer">
              <span>{lien.label}</span>
              <Icone nom="external-link-line" taille="sm" />
            </a>
          {/each}
        </div>
      </div>
    </div>
    <div class="footer-contributors">
      <h6 class="footer-contributors-title">Les contributeurs</h6>
      <div class="footer-contributors-list">
        {#each contributeurs as contributeur}
          <img class="footer-contributors-item" src={contributeur.image} alt="Contributeur" />
        {/each}
      </div>
    </div>
    <div class="footer-bottom">
      <nav class="footer-navigation" aria-label="Navigation du pied de page">
        {#each liensNavigation as lien, i (lien)}
          <a href={lien.href} class="footer-nav-link">
            {lien.label}
          </a>
          {#if i < liensNavigation.length - 1}
            <div class="footer-nav-separator" />
          {/if}
        {/each}
      </nav>
    </div>
  </div>
</footer>

<style lang="scss">
  @import "apparence-footer.scss";
</style>
