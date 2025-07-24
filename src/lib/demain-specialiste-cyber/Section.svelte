<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  import Carte from "$lib/demain-specialiste-cyber/Carte.svelte";
  import Conteneur from "$lib/demain-specialiste-cyber/Conteneur.svelte";

  export let id: string | undefined = undefined;
  export let title: string;
  export let description: string;
  export let subtitle: string | undefined = "Les ressources";
  export let hasVisual: boolean = false;

  type CardItem = {
    title: string;
    detailStart: string;
    href: string;
    alt: string;
    hasDetailStart: boolean;
    hasTag: boolean;
    tagItems: string[];
    badgeItems?: string[];
  };
  export let cardItems: CardItem[];
</script>

<section {id} class="dsc-section fr-container--fluid">
  <Conteneur>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-4 fr-col-xl-3 dsc-section__col">
        <header class="dsc-section__header">
          <h2 class="fr-h2 fr-mb-3v dsc-section__title">{title}</h2>
          <p class="fr-text--lg">{description}</p>

          <!-- VISUAL -->
          {#if hasVisual}
            <span class="dsc-section__visual">
              <img src={srcAsset("/illustrations/personnage.svg")} alt="" />
            </span>
          {/if}
        </header>
      </div>

      <div class="fr-col dsc-section__content">
        <h3 class="fr-h3 dsc-section__subtitle fr-mb-8v">{subtitle}</h3>
        <div class="fr-grid-row fr-grid-row--gutters">
          {#each cardItems ?? [] as item}
            <div class="fr-col-12 fr-col-lg-6 fr-col-xl-4">
              <Carte {...item} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </Conteneur>
</section>

<style lang="scss">
  @use "@gouvfr/dsfr/src/module/media-query/mixin/respond-from" as *;
  @keyframes personnage {
    from {
      top: 200%;
      left: -200%;
      opacity: 0;
    }

    to {
      left: 0;
      opacity: 100%;
      top: calc(100% + 24px);
    }
  }

  .dsc-section {
    padding-block: {
      start: 3rem; // 48px
      end: 5rem; // 80px
    }

    &__header {
      position: relative;
    }

    &__title {
      color: var(--blue-france-sun-113-625);
    }

    &__subtitle {
      @include respond-from("lg") {
        padding-block-start: 1rem; // 16px
      }
    }

    &__visual {
      display: none;

      @include respond-from("xl") {
        animation-duration: 1.5s;
        animation-name: personnage;
        display: block;
        position: absolute;
      }
    }

    &:first-child {
      position: relative;

      &::after {
        background-color: darkorange;
        content: "";
        height: 370px;
        width: 266px;
      }
    }

    &:nth-child(odd) {
      background-color: #f5f5fe;
    }
  }
</style>
