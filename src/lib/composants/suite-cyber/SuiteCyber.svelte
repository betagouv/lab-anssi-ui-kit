<svelte:options
  customElement={{
    tag: "lab-anssi-bouton-suite-cyber-navigation",
    props: {
      sourceUtm: { attribute: "source-utm", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets.js";
  import { slide } from "svelte/transition";
  import { withIconsStyleSheet } from "$lib/utilitaires";
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  import AccueilSuiteCyber from "./AccueilSuiteCyber.svelte";
  import LiensSuiteCyber from "./LiensSuiteCyber.svelte";

  const gauffre = srcAsset("/icones/bouton-gauffre.svg");
  const logoCERTFR = srcAsset("/icones/CERT-FR.svg");
  const logoMSS = srcAsset("/icones/MSS.svg");
  const logoMAC = srcAsset("/icones/MAC.svg");

  interface Props {
    sourceUtm?: string;
  }

  let { sourceUtm }: Props = $props();
  let estOuvert: boolean = $state(false);
</script>

<div class="suite-cyber">
  <div class="navigation">
    <button
      class={["bouton-suite-cyber-mobile", { active: estOuvert }]}
      aria-expanded={estOuvert}
      onclick={() => {
        estOuvert = !estOuvert;
      }}
    >
      <img src={gauffre} alt="La Suite cyber" />
      <span class="sr-only">La Suite cyber</span>
    </button>

    <DsfrButton
      kind="tertiary-no-outline"
      class="bouton-suite-cyber-desktop"
      size="sm"
      expandable
      onclick={() => {
        estOuvert = !estOuvert;
      }}
      aria-expanded={estOuvert}
      data-themeable="false"
    >
      <span class="contenu-bouton">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.66683 2.99992C4.66683 3.91992 3.92016 4.66659 3.00016 4.66659C2.08016 4.66659 1.3335 3.91992 1.3335 2.99992C1.3335 2.07992 2.08016 1.33325 3.00016 1.33325C3.92016 1.33325 4.66683 2.07992 4.66683 2.99992ZM8.00016 1.33325C7.08016 1.33325 6.3335 2.07992 6.3335 2.99992C6.3335 3.91992 7.08016 4.66659 8.00016 4.66659C8.92016 4.66659 9.66683 3.91992 9.66683 2.99992C9.66683 2.07992 8.92016 1.33325 8.00016 1.33325ZM13.0002 6.33325C12.0802 6.33325 11.3335 7.07992 11.3335 7.99992C11.3335 8.91992 12.0802 9.66658 13.0002 9.66658C13.9202 9.66658 14.6668 8.91992 14.6668 7.99992C14.6668 7.07992 13.9202 6.33325 13.0002 6.33325ZM8.00016 6.33325C7.08016 6.33325 6.3335 7.07992 6.3335 7.99992C6.3335 8.91992 7.08016 9.66658 8.00016 9.66658C8.92016 9.66658 9.66683 8.91992 9.66683 7.99992C9.66683 7.07992 8.92016 6.33325 8.00016 6.33325ZM13.0002 11.3333C12.0802 11.3333 11.3335 12.0799 11.3335 12.9999C11.3335 13.9199 12.0802 14.6666 13.0002 14.6666C13.9202 14.6666 14.6668 13.9199 14.6668 12.9999C14.6668 12.0799 13.9202 11.3333 13.0002 11.3333ZM8.00016 11.3333C7.08016 11.3333 6.3335 12.0799 6.3335 12.9999C6.3335 13.9199 7.08016 14.6666 8.00016 14.6666C8.92016 14.6666 9.66683 13.9199 9.66683 12.9999C9.66683 12.0799 8.92016 11.3333 8.00016 11.3333ZM13.0002 1.33325C12.0802 1.33325 11.3335 2.07992 11.3335 2.99992C11.3335 3.91992 12.0802 4.66659 13.0002 4.66659C13.9202 4.66659 14.6668 3.91992 14.6668 2.99992C14.6668 2.07992 13.9202 1.33325 13.0002 1.33325ZM3.00016 6.33325C2.08016 6.33325 1.3335 7.07992 1.3335 7.99992C1.3335 8.91992 2.08016 9.66658 3.00016 9.66658C3.92016 9.66658 4.66683 8.91992 4.66683 7.99992C4.66683 7.07992 3.92016 6.33325 3.00016 6.33325ZM3.00016 11.3333C2.08016 11.3333 1.3335 12.0799 1.3335 12.9999C1.3335 13.9199 2.08016 14.6666 3.00016 14.6666C3.92016 14.6666 4.66683 13.9199 4.66683 12.9999C4.66683 12.0799 3.92016 11.3333 3.00016 11.3333Z"
            fill="currentColor"
          />
        </svg>
        <span class="texte-bouton">La Suite cyber</span>
        <span
          class={["fr-icon", estOuvert ? "fr-icon-arrow-up-s-line" : "fr-icon-arrow-down-s-line"]}
          aria-hidden="true"
        ></span>
      </span>
    </DsfrButton>
  </div>

  {#if estOuvert}
    <div class="contenu" transition:slide>
      <div class="fermeture">
        <DsfrButton label="Fermer" preset="close" onclick={() => (estOuvert = false)} />
      </div>

      <AccueilSuiteCyber service={sourceUtm} />

      <div class="services-anssi">
        <LiensSuiteCyber
          titre="S'informer"
          services={[
            {
              nom: "Le portail du CERT-FR",
              lien: `https://www.cert.ssi.gouv.fr?utm_campaign=suite-cyber&utm_source=${sourceUtm}`,
              icone: logoCERTFR,
              classeTracking: "cert-fr",
            },
          ]}
        />
        <LiensSuiteCyber
          titre="Piloter"
          services={[
            {
              nom: "MonServiceSécurisé",
              lien: `https://monservicesecurise.cyber.gouv.fr?utm_campaign=suite-cyber&utm_source=${sourceUtm}`,
              icone: logoMSS,
              labels: ["Entités publiques"],
              classeTracking: "mss",
            },
          ]}
        />
        <LiensSuiteCyber
          titre="Accompagner"
          services={[
            {
              nom: "MonAideCyber",
              lien: `https://monaide.cyber.gouv.fr?utm_campaign=suite-cyber&utm_source=${sourceUtm}`,
              icone: logoMAC,
              classeTracking: "mac",
            },
          ]}
        />
      </div>

      <div class="acces-anssi">
        <DsfrLink
          label="Accéder au site de l'ANSSI"
          href={`https://cyber.gouv.fr?utm_campaign=suite-cyber&utm_source=${sourceUtm}`}
          blank
          neutral
        />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";

  .suite-cyber {
    @include a-partir-de(desktop-dsfr) {
      position: relative;
    }
  }

  .contenu-bouton {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(8px);
    white-space: nowrap;

    svg {
      width: rem(16px);
      height: rem(16px);
    }

    .fr-icon::before {
      --icon-size: 1rem;
    }
  }

  .contenu {
    display: flex;
    flex-direction: column;
    background-color: var(--background-overlap-grey);
    width: 100vw;
    height: 100vh;
    padding-top: rem(8px);
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll !important; // On force le scroll pour éviter qu'il soit masqué durant l'animation
    overflow-x: hidden;
    z-index: $z-index-au-dessus;
    text-align: left;

    @include a-partir-de(desktop-dsfr) {
      border-top: 1px solid var(--border-open-blue-france);
      position: absolute;
      top: rem(32px);
      right: 0;
      left: unset;
      width: rem(340px);
      height: rem(560px);
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 18, 0.16);
    }
  }

  .fermeture {
    padding-top: rem(8px);
    padding-right: rem(16px);

    @include a-partir-de(desktop-dsfr) {
      display: none;
    }
  }

  .services-anssi {
    padding: 12px 16px 0px;
  }

  .acces-anssi {
    font-size: rem(12px);
    line-height: rem(20px);
    color: var(--text-mention-grey);
    padding: 1rem;
  }

  .bouton-suite-cyber-mobile {
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

    &:active,
    &.active {
      background: rgba(0, 0, 0, 0.08);
    }

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    @include a-partir-de(desktop-dsfr) {
      display: none;
    }
  }

  :global(.bouton-suite-cyber-desktop) {
    @media (max-width: 991px) {
      display: none !important;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
