<script lang="ts">
  import { srcAsset } from "$lib/assets/assets.js";

  const chevronDroite = srcAsset("/icones/chevron-noir.svg");

  interface Props {
    service?: string;
  }
  const { service = "" }: Props = $props();

  const classService = $derived.by(() => {
    if (service === "MonAideCyber") {
      return "mac";
    } else if (service === "MonEspaceNIS2") {
      return "nis2";
    } else if (service === "MesServicesCyber") {
      return "msc";
    } else if (service === "MonServiceSécurisé") {
      return "mss";
    }

    return "";
  });
</script>

<a
  href="https://messervices.cyber.gouv.fr"
  target="_blank"
  class={["accueil-suite-cyber", classService]}
  id="mes-services-cyber"
>
  <div class="icone">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 19.9999C20 20.2651 19.8946 20.5195 19.7071 20.707C19.5196 20.8946 19.2652 20.9999 19 20.9999H5C4.73478 20.9999 4.48043 20.8946 4.29289 20.707C4.10536 20.5195 4 20.2651 4 19.9999V10.9999H1L11.327 1.61192C11.5111 1.4444 11.7511 1.35156 12 1.35156C12.2489 1.35156 12.4889 1.4444 12.673 1.61192L23 10.9999H20V19.9999ZM11 12.9999V18.9999H13V12.9999H11Z"
        fill="#000091"
      />
    </svg>
  </div>
  <div class="contenu">
    <span class="titre">MesServicesCyber</span>
    <span class="description">Gérer mon profil et mes services</span>
  </div>
  <div class="chevron">
    <img src={chevronDroite} alt="Aller sur MesServicesCyber" />
  </div>
</a>

<style lang="scss">
  .accueil-suite-cyber {
    display: flex;
    align-items: center;
    gap: rem(12px);
    font-style: normal;
    font-weight: normal;
    padding: rem(12px) rem(16px);
    text-decoration: none;

    &:hover {
      background-color: var(--background-default-grey-hover);
    }

    &:active {
      background-color: var(--background-default-grey-active);
    }
  }

  .icone {
    background-color: var(--background-contrast-blue-france);
    border-radius: rem(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(48px);
    height: rem(48px);
  }

  .contenu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex: 1 0 auto;
  }

  .titre {
    color: var(--text-title-grey);
    font-size: rem(18px);
    font-style: normal;
    font-weight: 700;
    line-height: rem(28px);
  }

  .description {
    color: var(--text-default-grey);
    font-size: rem(12px);
    font-style: normal;
    font-weight: 400;
    line-height: rem(20px);
  }

  :global(:has([data-themeable="true"])) .accueil-suite-cyber {
    &.msc {
      .icone {
        background-color: var(--yellow-msc-75, #fff0cf);
      }
    }

    &.mss {
      .icone {
        background-color: var(--blue-mss-75, #dbeeff);
      }
    }
  }
</style>
