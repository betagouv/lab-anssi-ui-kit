<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";

  const navigationMSC = [
    {
      label: "🚀 Protéger mon organisation",
      href: "#",
    },
    {
      label: "Test de maturité cyber",
      href: "#",
    },
    {
      label: "Guides et ressources",
      href: "#",
    },
    {
      label: "Contacts et financements",
      href: "#",
    },
  ];

  const { Story } = defineMeta({
    title: "Exemples/LAB - MSC",
    component: DsfrHeader,
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrHeader>;
</script>

<Story name="Header MSC">
  {#snippet template(args: Args)}
    <dsfr-header
      id="headerMSC"
      menu-id="menuMSC"
      menu-modal-id="menuModalMSC"
      brand-logo-title="République <br>Française"
      brand-service="MesServicesCyber"
      has-brand-tagline
      brand-tagline="Innovation ANSSI"
      brand-link-id="brandLinkMSC"
      brand-link-title="Lien vers la page d'accueil du site MesServicesCyber"
      brand-link-href="https://messervicescyber.gouv.fr/"
      has-brand-operator
      brand-operator-alt="Logo de l'ANSSI"
      brand-operator-src="/static/ANSSI.svg"
      brand-operator-style="height: 4rem"
      has-navigation
      navigation-id="navigationMSC"
      navigation-aria-label="Navigation principale"
      navigation-items={JSON.stringify(navigationMSC)}
    ></dsfr-header>
  {/snippet}
</Story>

<Story name="Header MSC - Slot après navigation">
  {#snippet template(args: Args)}
    <dsfr-header
      id="headerMSCAfterNav"
      menu-id="menuMSCAfterNav"
      menu-modal-id="menuModalMSCAfterNav"
      brand-logo-title="République <br>Française"
      brand-service="MesServicesCyber"
      has-brand-tagline
      brand-tagline="Innovation ANSSI"
      brand-link-id="brandLinkMSCAfterNav"
      brand-link-title="Lien vers la page d'accueil du site MesServicesCyber"
      brand-link-href="https://messervicescyber.gouv.fr/"
      has-brand-operator
      brand-operator-alt="Logo de l'ANSSI"
      brand-operator-src="/static/ANSSI.svg"
      brand-operator-style="height: 4rem"
      has-navigation
      has-slot-after-navigation
      navigation-id="navigationMSCAfterNav"
      navigation-aria-label="Navigation principale"
      navigation-items={JSON.stringify(navigationMSC)}
    >
      <button class="bouton-nis2" type="button" slot="afternavigation">
        <svg
          width="54"
          height="22"
          viewBox="0 0 54 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.47195 13.9949L3.4824 4.28162H0V17.719H2.71708V8.00573L8.70664 17.719H12.1891V4.28162H9.47195V13.9949Z"
            fill="#2B2D71"
          />
          <path d="M18.3688 4.28162H15.6517V17.719H18.3688V4.28162Z" fill="#2B2D71" />
          <path
            d="M25.5441 6.27802C26.5582 6.27802 27.4387 6.95011 28.223 7.9674L30.213 6.16316C29.0647 4.80055 27.5341 3.89807 25.525 3.89807C22.9613 3.89807 21.201 5.66406 21.201 7.79511C21.201 12.3445 27.286 11.673 27.286 14.1494C27.286 15.1093 26.6352 15.685 25.5639 15.685C24.4926 15.685 23.4016 15.0711 22.598 14.0339L20.6272 15.8573C21.8137 17.278 23.3252 18.1032 25.5829 18.1032C28.0513 18.1032 30.0031 16.5868 30.0412 14.053C30.0412 9.44625 23.9563 10.1368 23.9563 7.69874C23.9563 6.89268 24.5873 6.27802 25.5441 6.27802Z"
            fill="#2B2D71"
          />
          <path
            d="M45.4393 12.1343C46.3327 11.2633 47.1594 10.2802 47.1594 8.9873C47.1594 7.39839 45.8952 6.24568 44.154 6.24568C42.6356 6.24568 41.4383 6.94306 40.596 8.31793L40.4481 8.55929L42.2942 9.6874L42.4394 9.44262C42.9219 8.63177 43.3717 8.30089 43.9932 8.30089C44.5534 8.30089 44.888 8.62219 44.888 9.16164C44.888 9.73388 44.5649 10.1264 43.8828 10.8237L40.827 13.8381V15.7538H47.3822V13.674H43.8487L45.4393 12.135V12.1343Z"
            fill="#2B2D71"
          />
          <path
            d="M43.9162 0.957174C44.2454 0.957174 44.5711 1.044 44.8574 1.20741L51.9892 5.29113C52.5793 5.62888 52.9466 6.26266 52.9466 6.945V15.055C52.9466 15.7373 52.58 16.3705 51.9892 16.7089L44.8574 20.7926C44.5711 20.9566 44.2461 21.0428 43.9162 21.0428C43.5864 21.0428 43.2614 20.9559 42.9752 20.7926L35.8434 16.7089C35.2532 16.3711 34.8859 15.7373 34.8859 15.055V6.945C34.8859 6.26266 35.2525 5.62955 35.8434 5.29113L42.9752 1.20741C43.2614 1.04332 43.5864 0.957174 43.9162 0.957174ZM43.9162 0C43.4283 0 42.9404 0.125116 42.5029 0.376033L35.3711 4.45975C34.4817 4.96911 33.9325 5.91739 33.9325 6.945V15.055C33.9325 16.0826 34.4817 17.0309 35.3711 17.5403L42.5029 21.6239C42.941 21.8749 43.429 22 43.9162 22C44.4035 22 44.8922 21.8749 45.3296 21.6239L52.4614 17.5403C53.3507 17.0309 53.9 16.0826 53.9 15.055V6.945C53.9 5.91739 53.3507 4.96911 52.4614 4.45975L45.3296 0.376033C44.8915 0.125116 44.4035 0 43.9162 0Z"
            fill="#FDC82E"
          />
        </svg>
        <span class="fr-sr-only">Se connecter</span>
      </button>
    </dsfr-header>

    <style lang="scss">
      .bouton-nis2 {
        border-width: 0;
        background-color: var(--yellow-moutarde-975, #fef5e8);
        width: 86px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        padding: 0;

        svg {
          display: block;
          width: 62px;
        }
      }

      .fr-sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    </style>
  {/snippet}
</Story>
