<svelte:options
  customElement={{
    tag: "lab-anssi-presentation-anssi",
  }}
/>

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import { srcAsset } from "$lib/assets/assets.js";
  import LienExterne from "$lib/lab/icones/LienExterne.svelte";
</script>

<Brique variation="transparent">
  <div class="presentation-anssi">
    <div class="logo-anssi">
      <img src={srcAsset("/illustrations/logo-anssi.svg")} alt="Logo de l'ANSSI" />
    </div>
    <div class="contenu">
      <h2>Qu'est ce que l'ANSSI ?</h2>
      <p>
        Créée en 2009, l’Agence nationale de la sécurité des systèmes d’information (ANSSI) est
        l’autorité nationale en matière de cybersécurité et de cyberdéfense.
        <br />
        <br />
        <b>
          Son action pour la protection de la Nation face aux cyberattaques se traduit en quatre
          grandes missions : défendre, connaître, partager, accompagner.
        </b>
      </p>
    </div>
    <div class="encart-action">
      <a class="action" role="button" href="https://cyber.gouv.fr/" target="_blank">
        En savoir plus
        <LienExterne />
      </a>
    </div>
  </div>
</Brique>

<style lang="scss">
  .presentation-anssi {
    color: $texte-secondaire;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "logo-anssi"
      "contenu"
      "encart-action";
    row-gap: 24px;
    padding: 16px 16px;

    @include a-partir-de(desktop) {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "contenu logo-anssi"
        "encart-action logo-anssi";
    }

    .logo-anssi {
      grid-area: logo-anssi;
      display: flex;
      justify-content: center;

      @include a-partir-de(desktop) {
        align-items: center;
      }

      img {
        max-width: 140px;
        max-height: 140px;
      }
    }

    .contenu {
      text-align: center;

      grid-area: contenu;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;

      @include a-partir-de(desktop) {
        text-align: start;
        align-items: start;
      }

      h2 {
        color: $brique-presentation-anssi-titre-couleur;
        font-size: 1.75rem;
        font-style: normal;
        font-weight: 700;
        line-height: 2.25rem;
        margin: 0;
      }

      p {
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
        margin: 0;
      }
    }

    .encart-action {
      grid-area: encart-action;

      width: 100%;
      display: flex;
      justify-content: center;

      @include a-partir-de(desktop) {
        justify-content: start;
      }

      a[role="button"] {
        width: 100%;

        text-decoration: none;
        font-family: Marianne, sans-serif;
        padding: 8px 16px;

        display: flex;
        align-items: center;
        gap: 8px;

        text-align: center;
        font-weight: 500;
        font-size: 1rem;
        line-height: 24px;

        border-radius: 4px;

        @include a-partir-de(tablette) {
          width: fit-content;
        }

        &.action {
          background-color: $brique-presentation-anssi-bouton-background;
          color: $brique-presentation-anssi-bouton-texte;
          border: 1px solid $brique-presentation-anssi-bouton-texte;
          cursor: pointer;

          &:active {
            background-color: $brique-presentation-anssi-bouton-background-active;
          }

          &:hover {
            background-color: $brique-presentation-anssi-bouton-background-hover;
          }
        }
      }
    }
  }
</style>
