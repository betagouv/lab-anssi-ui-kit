<script lang="ts">
  import Conteneur from "$lib/demain-specialiste-cyber/Conteneur.svelte";

  export let title: string;
  export let description: string;
</script>

<div class="dsc-banner fr-mb-4v">
  <Conteneur>
    <slot></slot>
    <h1 class="fr-h1 fr-mb-1v dsc-banner__title">{title}</h1>
    <p class=" fr-mb-3v fr-text--lg dsc-banner__desc">{description}</p>
  </Conteneur>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .dsc-banner {
    --text-dsc-banner-default: #fff;
    --text-title-grey: var(--text-dsc-banner-default);
    --text-mention-grey: var(--text-dsc-banner-default);
    --text-default-grey: var(--text-dsc-banner-default);

    background: {
      color: #14152a;
      image: url-asset("/illustrations/bg-banner.jpg");
      position: center;
      repeat: no-repeat;
      size: cover;
    }
    padding-block: 1rem; // 16px
    color: var(--text-dsc-banner-default);

    &__title {
      @include respond-to("sm") {
        font-size: 2.5rem !important; // 40px
        line-height: 3rem !important; // 48px
      }
    }
  }
</style>
