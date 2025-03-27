<svelte:options customElement="lab-anssi-bouton-suite-cyber-navigation" />

<script lang="ts">
  import { srcAsset } from "$lib/mes-services-cyber/assets.js";
  import { slide } from "svelte/transition";
  import AccueilMsc from "./AccueilMSC.svelte";
  import BlocLiens from "./BlocLiens.svelte";
  const gauffre = srcAsset("/icones/bouton-gauffre.svg");
  const chevron = srcAsset("/icones/chevron-bleu.svg");
  const croix = srcAsset("/icones/croix-bleu.svg");
  const nis2 = srcAsset("/icones/NIS2.svg");
  const certFr = srcAsset("/icones/CERT-FR.svg");
  const mac = srcAsset("/icones/MAC.svg");
  const mss = srcAsset("/icones/MSS.svg");
  const lienExterne = srcAsset("/icones/lien-externe.svg");

  export let sourceUtm: string = "";
  let estOuvert: boolean = false;
</script>

<div class="suite-cyber">
  <div class="navigation">
    <button
      class:actif={estOuvert}
      on:click={() => {
        estOuvert = !estOuvert;
      }}
    >
      <img src={gauffre} alt="La Suite cyber" />
      <div class="avec-texte">
        <span>La Suite cyber</span>
        <img src={chevron} alt={estOuvert ? "ouvert" : "fermé"} class:ouvert={estOuvert} />
      </div>
    </button>
  </div>
  {#if estOuvert}
    <div class="contenu" transition:slide>
      <button class="fermer invisible-tablette" on:click={() => (estOuvert = false)}>
        Fermer
        <img src={croix} alt="Fermer" />
      </button>
      <AccueilMsc />
      <div class="services-anssi">
        <BlocLiens
          titre="Embarquer dans NIS2"
          services={[
            {
              nom: "MonEspaceNIS2",
              lien: `https://monespacenis2.cyber.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: nis2,
              classeTracking: "nis2",
            },
          ]}
        />
        <BlocLiens
          titre="S'informer"
          services={[
            {
              nom: "Le portail du CERT-FR",
              lien: `https://www.cert.ssi.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: certFr,
              classeTracking: "cert-fr",
            },
          ]}
        />
        <BlocLiens
          titre="Piloter"
          services={[
            {
              nom: "MonServiceSécurisé",
              lien: `https://monservicesecurise.cyber.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: mss,
              labels: ["Entités publiques"],
              classeTracking: "mss",
            },
          ]}
        />
        <BlocLiens
          titre="Tester"
          services={[
            {
              nom: "ADS",
              lien: `https://club.ssi.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: certFr,
              labels: ["Entités publiques", "Entités régulées"],
              classeTracking: "ads",
            },
            {
              nom: "SILENE",
              lien: `https://club.ssi.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: certFr,
              labels: ["Entités publiques", "Entités régulées"],
              classeTracking: "silene",
            },
          ]}
        />
        <BlocLiens
          titre="Accompagner"
          services={[
            {
              nom: "MonAideCyber",
              lien: `https://monaide.cyber.gouv.fr?utm_campaign="suite-cyber"&utm_source="${sourceUtm}"`,
              icone: mac,
              classeTracking: "mac",
            },
          ]}
        />
      </div>
      <a
        class="lien-externe site-anssi"
        href="https://cyber.gouv.fr?utm_campaign='suite-cyber'&utm_source='{sourceUtm}'"
        target="_blank"
      >
        <div>
          <span>Accéder au site de l'ANSSI</span>
          <img src={lienExterne} alt="Accéder au site de l'ANSSI" />
        </div>
      </a>
    </div>
  {/if}
</div>

<style lang="scss">
  .suite-cyber {
    font-family: Marianne;
    font-style: normal;
    font-weight: normal;
    position: relative;

    .navigation {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        display: flex;
        border: none;
        padding: 8px;
        justify-content: center;
        align-items: center;
        color: $texte-dsfr;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        cursor: pointer;
        gap: 8px;
        background: white;

        &:active {
          background: rgba(0, 0, 0, 0.08);
        }
        &:hover {
          background: rgba(0, 0, 0, 0.04);
        }

        @include a-partir-de(desktop) {
          img {
            width: 16px;
            height: 16px;
          }
        }

        > .avec-texte {
          display: none;

          > span {
            font-family: Marianne;
          }
          @include a-partir-de(desktop) {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
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
    }

    .contenu {
      display: flex;
      flex-direction: column;
      background: #fff;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      overflow-y: scroll !important; // On force le scroll pour éviter qu'il soit masqué durant l'animation
      overflow-x: hidden;
      z-index: $z-index-au-dessus;

      @include a-partir-de(tablette) {
        position: absolute;
        top: 40px;
        right: 0;
        left: unset;
        width: 360px;
        height: 540px;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 18, 0.16);
      }

      button.fermer {
        border: none;
        background: none;
        color: $texte-dsfr;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        gap: 8px;
        padding: 4px 8px 4px 12px;
        margin: 12px;
      }

      .services-anssi {
        display: flex;
        padding: 12px 16px 0px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        align-self: stretch;
      }

      .lien-externe {
        display: flex;
        padding: 16px;
        align-items: center;
        gap: 4px;
        align-self: stretch;
        text-decoration: none;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          color: $text-mention-grey;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;

          img {
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
