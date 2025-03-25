<svelte:options customElement="lab-anssi-mes-services-cyber-bandeau" />

<script lang="ts">
  import { srcAsset } from "$lib/mes-services-cyber/assets.js";

  const CLE_LOCAL_STORAGE = "lab-anssi-ui-kit-msc-bandeau-affichage";

  type visibilite = "visible" | "invisible";
  let affichage: visibilite = (localStorage.getItem(CLE_LOCAL_STORAGE) as visibilite) || "visible";

  const croix = srcAsset("/icones/croix-blanche.svg");
</script>

{#if affichage === "visible"}
  <div class="largeur-totale">
    <div class="contenu">
      <button
        class="fermer"
        on:click={() => {
          affichage = "invisible";
          localStorage.setItem(CLE_LOCAL_STORAGE, "invisible");
        }}
      >
        <img src={croix} alt="fermer" />
      </button>

      <div class="textes">
        <h4>
          🚀 Découvrez MesServicesCyber ! <span class="badge visible-tablette">nouveauté</span>
        </h4>
        <p>
          MesServicesCyber, la plateforme pour faciliter l'accès aux services et ressources de
          l'ANSSI et de ses partenaires.
        </p>
      </div>

      <a
        href="https://messervices.cyber.gouv.fr/"
        target="_blank"
        rel="noopener"
        id="matomo-bandeau-promotion-msc"
      >
        Je découvre MesServicesCyber
      </a>
    </div>
  </div>
{/if}

<style lang="scss">
  .largeur-totale {
    position: relative;
    overflow: hidden;
    background: #0d0c21 url-asset("/illustrations/tuile-msc.svg");
    background-size: 500px;
    .contenu {
      position: relative;
      color: white;
      font-family: "Marianne";
      padding: 16px;
      max-width: $largeur-max-contenu;
      margin: auto;
      font-size: 0.875rem;
      line-height: 1.5rem;
      display: flex;
      flex-direction: column;

      @include a-partir-de(desktop) {
        flex-direction: row;
        gap: 16px;
        align-items: center;
      }

      .fermer {
        border: none;
        cursor: pointer;
        background: none;
        padding: 0;
        transition: transform 0.2s ease-in-out;
        position: absolute;
        top: 20px;
        right: 20px;

        &:hover {
          transform: scale(1.3);
        }
      }

      .textes {
        display: flex;
        flex-direction: column;
        @include a-partir-de(tablette) {
          gap: 8px;
        }
      }

      h4 {
        font-size: 0.875rem;
        line-height: 1.5rem;
        font-weight: 700;
        margin: 0;

        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 8px;

        @include a-partir-de(desktop) {
          font-size: 1rem;
          line-height: 1.5rem;
        }

        .badge {
          color: #19753c;
          background: #b8fec9;
          border-radius: 4px;
          padding-right: 6px;
          padding-left: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.25rem;
          text-transform: uppercase;
          transform: translateY(-3px);
        }
      }

      p {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.5rem;
        margin: 0;
        padding-right: 32px;

        @include a-partir-de(desktop) {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      }

      a {
        display: block;
        color: #242424;
        background: white;
        margin: 8px auto 0 0;
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.5rem;
        text-decoration: none;
        gap: 8px;
        border-radius: 4px;
        padding: 4px 12px;
        white-space: nowrap;
        height: fit-content;
        width: 100%;
        max-width: 312px;
        box-sizing: border-box;

        @include a-partir-de(tablette) {
          max-width: 248px;
        }

        @include a-partir-de(desktop) {
          margin-right: 32px;
        }
      }
    }
  }
</style>
