<svelte:options
  customElement={{
    tag: "lab-anssi-brique-hero",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      soustitre: { reflect: false, type: "String", attribute: "soustitre" },
      illustration: { reflect: false, type: "Object", attribute: "illustration" },
      badge: { reflect: false, type: "Boolean", attribute: "badge" },
      actiongauche: { reflect: false, type: "Object", attribute: "actiongauche" },
      actiondroite: { reflect: false, type: "Object", attribute: "actiondroite" },
      partenaires: { reflect: false, type: "Array", attribute: "partenaires" },
    },
  }}
/>

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Action, Image } from "$lib/types";

  export let titre: string;
  export let soustitre: string;
  export let illustration: Image;

  export let badge: boolean = false;
  export let actiongauche: Action;
  export let actiondroite: Action;
  export let partenaires: Image[] = [];
</script>

<Brique>
  <div class="hero">
    <div class="contenu" class:sans-partenaires={!partenaires || partenaires.length === 0}>
      {#if badge}
        <div class="section-badge">
          <div class="badge">
            <span>Service à impact national</span>
          </div>
        </div>
      {/if}
      <div class="textes">
        <h1>{titre}</h1>
        <p>{soustitre}</p>
      </div>
      <div class="actions">
        <a role="button" class="action-gauche" href={actiongauche.lien} target="_blank">
          {actiongauche.titre}
        </a>
        <a role="button" class="action-droite" href={actiondroite.lien} target="_blank">
          {actiondroite.titre}
        </a>
      </div>
    </div>
    <div class="image">
      <img src={illustration.lien} alt={illustration.alt} />
    </div>
    {#if partenaires && partenaires.length > 0}
      <div class="partenaires">
        <p>Une innovation ANSSI conçue pour durer en collaboration avec :</p>
        <div class="liste">
          {#each partenaires as partenaire}
            <img src={partenaire.lien} alt={partenaire.alt} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</Brique>

<style lang="scss">
  .hero {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "contenu"
      "image"
      "partenaires";
    gap: 32px;

    @include a-partir-de(desktop) {
      grid-template-areas:
        "contenu image"
        "partenaires image";

      &:has(.sans-partenaires) {
        grid-template-areas:
          "contenu image"
          "contenu image";
      }

      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 0px;
    }

    .contenu {
      grid-area: contenu;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .textes {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
      }

      .section-badge {
        margin-bottom: 8px;

        .badge {
          text-align: left;
          background: #defbe5;
          color: #18753c;
          text-transform: uppercase;
          padding: 0 6px;
          font-size: 12px;
          font-weight: 700;
          line-height: 20px;
          border-radius: 4px;
          width: fit-content;
          margin-bottom: 4px;

          span {
            display: flex;
            flex-direction: row;
            gap: 4px;
            align-items: center;
          }

          span:before {
            content: url-asset('/icones/succes.svg');
            display: flex;
            width: 16px;
            height: 16px;
          }
        }
      }

      .actions {
        grid-area: actions;
        display: flex;
        flex-direction: column;
        gap: 16px;

        @include a-partir-de(tablette) {
          flex-direction: row;
        }
      }

      @include a-partir-de(tablette) {
        margin-bottom: 32px;
      }
    }

    .image {
      grid-area: image;

      img {
        width: 100%;
        max-height: 250px;

        @include a-partir-de(desktop) {
          max-height: 355px;
        }
      }

    }

    .partenaires {
      grid-area: partenaires;
      display: flex;
      flex-direction: column;
      gap: 8px;

      p {
        font-size: 14px;
      }

      .liste {
        display: flex;
        gap: 8px;

        img {
          width: 79px;
          height: 24px;
        }
      }
    }

    h1 {
      font-size: 40px;
      margin: 0;
      line-height: 48px;
      word-break: break-word;

      @include a-partir-de(tablette) {
        font-size: 48px;
      }
    }

    a[role="button"] {
      text-decoration: none;
      font-family: Marianne, sans-serif;
      padding: 8px 16px;

      text-align: center;
      font-weight: 500;
      font-size: 1rem;
      line-height: 24px;

      border-radius: 4px;

      &.action-gauche {
        background-color: $brique-hero-bouton-gauche-background;
        color: $brique-hero-bouton-gauche-texte;
        border: none;
        cursor: pointer;

        &:active {
          background-color: $brique-hero-bouton-gauche-background-active;
          box-shadow: none;
          border: none;
        }

        &:hover {
          background-color: $brique-hero-bouton-gauche-background-hover;
          box-shadow: none;
          border: none;
        }
      }

      &.action-droite {
        background-color: $brique-hero-bouton-droite-background;
        color: $brique-hero-bouton-droite-texte;
        border: 1px solid $brique-hero-bouton-droite-texte;
        cursor: pointer;

        &:active {
          background-color: $brique-hero-bouton-droite-background-active;
        }

        &:hover {
          background-color: $brique-hero-bouton-droite-background-hover;
        }
      }
    }

    p {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }
  }
</style>
