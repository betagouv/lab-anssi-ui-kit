<svelte:options customElement="lab-anssi-bouton-suite-cyber-navigation" />

<script lang="ts">
  import { srcAsset } from "$lib/mes-services-cyber/assets.js";
  import AccueilMsc from "./AccueilMSC.svelte";
  import BlocLien from "./BlocLien.svelte";
  const gauffre = srcAsset("/icones/bouton-gauffre.svg");
  const chevron = srcAsset("/icones/chevron-bleu.svg");
  const croix = srcAsset("/icones/croix-bleu.svg");
  const nis2 = srcAsset("/icones/NIS2.svg");
  const certFr = srcAsset("/icones/CERT-FR.svg");
  const mac = srcAsset("/icones/MAC.svg");
  const mss = srcAsset("/icones/MSS.svg");
  const lienExterne = srcAsset("/icones/lien-externe.svg");

  type format = "mobile" | "tablette" | "desktop";
  let formatEcran: format;
  let estOuvert: boolean;

  $: estOuvert = false;
  $: formatEcran =
    window.innerWidth < 576 ? "mobile" : window.innerWidth < 932 ? "tablette" : "desktop";
  $: enBureau = formatEcran === "desktop";
  $: enTablette = formatEcran === "tablette";
  $: enMobile = formatEcran === "mobile";
</script>

<div class="suite-cyber">
  <div class="navigation">
    <button
      id="bouton-suite-cyber"
      class:actif={estOuvert}
      on:click={() => {
        estOuvert = !estOuvert;
      }}
    >
      <img src={gauffre} alt="La Suite cyber" />
    </button>
    {#if estOuvert}
      <div class="contenu">
        <button class="fermer" on:click={() => (estOuvert = false)}>
          Fermer
          <img src={croix} alt="Fermer" />
        </button>
        <AccueilMsc />
        <div class="services-anssi">
          <BlocLien
            titre="Embarquer dans NIS2"
            services={[
              {
                nom: "MonEspaceNIS2",
                lien: "https://monespacenis2.cyber.gouv.fr",
                icone: nis2,
              },
            ]}
          />
          <BlocLien
            titre="S'informer"
            services={[
              {
                nom: "Le portail du CERT-FR",
                lien: "https://www.cert.ssi.gouv.fr",
                icone: certFr,
              },
            ]}
          />
          <BlocLien
            titre="Se faire accompagner"
            services={[
              {
                nom: "MonAideCyber",
                lien: "https://monaide.cyber.gouv.fr",
                icone: mac,
              },
            ]}
          />
          <BlocLien
            titre="Piloter"
            services={[
              {
                nom: "MonServiceSécurisé",
                lien: "https://monservicesecurise.cyber.gouv.fr",
                icone: mss,
                labels: ["Entités publiques"],
              },
            ]}
          />
          <BlocLien
            titre="Tester"
            services={[
              {
                nom: "ADS",
                lien: "https://club.ssi.gouv.fr",
                icone: certFr,
                labels: ["Entités publiques", "Entités régulées"],
              },
              {
                nom: "SILENE",
                lien: "https://club.ssi.gouv.fr",
                icone: certFr,
                labels: ["Entités publiques", "Entités régulées"],
              },
            ]}
          />
        </div>
        <a class="lien-externe" href="https://cyber.gouv.fr" target="_blank">
          <span
            >Accéder au site de l'ANSSI <img
              src={lienExterne}
              alt="Accéder au site de l'ANSSI"
            /></span
          >
        </a>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .suite-cyber {
    font-family: Marianne;
    font-style: normal;
    font-weight: normal;
    position: relative;
  }

  .navigation {
    overflow: hidden;
    // overflow-y: scroll;
    // -ms-overflow-style: none; /* IE and Edge */
    // scrollbar-width: none; /* Firefox */
    // /* Hide scrollbar for Chrome, Safari and Opera */
    // &::-webkit-scrollbar {
    //   display: none;
    // }
  }
  #bouton-suite-cyber {
    display: flex;
    border: none;
    padding: 8px;
    justify-content: center;
    align-items: center;
    color: #000091;
    font-size: 14px;
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

  .contenu {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;

    button.fermer {
      border: none;
      cursor: pointer;
      background: none;
      color: #000091;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;
      gap: 8px;
      padding: 4px 8px 4px 12px;
      margin-right: 12px;
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.3);
      }
    }
    &.flottant {
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-top: 1px solid #e3e3fd;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 18, 0.16);
    }

    .services-anssi {
      display: flex;
      padding: 12px 16px 0px 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      .bloc {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: stretch;
        justify-content: center;
        padding-bottom: 8px;
        gap: 10px;
        .titre {
          display: flex;
          align-self: stretch;
          color: #666;
          font-size: 12px;
          font-weight: 700;
          line-height: 20px;
          text-transform: uppercase;
        }
        button {
          display: flex;
          align-self: stretch;
          border-radius: 4px;
          border: 1px solid #ddd;
          background: #fff;
          display: flex;
          padding: 12px;
          align-items: center;
          gap: 12px;
          flex: 1 0 0;
          color: #161616;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;

          &:hover {
            background-color: #f6f6f6;
          }
          &:active {
            background-color: #ededed;
          }
          .icone {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .lien-externe {
      display: flex;
      padding: 16px;
      align-items: center;
      gap: 4px;
      align-self: stretch;
      text-decoration: none;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        color: #666;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;

        img {
          line-height: 20px;
        }
      }
    }
  }
</style>
