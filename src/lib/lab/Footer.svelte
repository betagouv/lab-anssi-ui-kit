<svelte:options
  customElement={{
    tag: "lab-anssi-footer",
  }}
/>

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets.js";
  import Icone from "./Icone.svelte";
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-top">
      <img class="footer-marianne" src={srcAsset("/icones/marianne.svg")} alt="Marque de l'État" />
      <div class="footer-right">
        <p class="footer-description">
          DemainSpécialisteCyber est une campagne nationale co-construite par l'ANSSI et son
          laboratoire d'innovation, le Ministère de l'Education Nationale et de la Jeunesse et le
          Campus Cyber, en vue de valoriser la cybersécurité et ses métiers.
        </p>
        <div class="footer-links">
          <a
            href="https://www.google.com"
            class="footer-links-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>info.gouv.fr</span>
            <Icone nom="external-link-line" taille="sm" />
          </a>
          <a
            href="https://www.google.com"
            class="footer-links-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>service-public.fr</span>
            <Icone nom="external-link-line" taille="sm" />
          </a>
          <a
            href="https://www.google.com"
            class="footer-links-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>legifrance.gouv.fr</span>
            <Icone nom="external-link-line" taille="sm" />
          </a>
          <a
            href="https://www.google.com"
            class="footer-links-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>data.gouv.fr</span>
            <Icone nom="external-link-line" taille="sm" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-contributors">
      <h6 class="footer-contributors-title">Les contributeurs</h6>
      <div class="footer-contributors-list">
        <img
          class="footer-contributors-item"
          src="https://placedog.net/100/100"
          alt="Contributeur"
        />
      </div>
    </div>
    <div class="footer-bottom">
      <nav class="footer-navigation" aria-label="Navigation du pied de page">
        <a href="#" class="footer-nav-link">À propos</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Mentions légales</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Politique de confidentialité</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Conditions générales d'utilisation</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Statistiques d'utilisation</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Sécurité</a>
        <span class="footer-nav-separator"></span>
        <a href="#" class="footer-nav-link">Accéssibilité: non conforme</a>
      </nav>
    </div>
  </div>
</footer>

<style lang="scss">
  @import "apparence-footer.scss";
</style>
