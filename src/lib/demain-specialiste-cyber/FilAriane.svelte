<script lang="ts">
  export let id: string | undefined = undefined;
  export let spacing: string | undefined = undefined;

  interface BreadcrumbItem {
    label: string;
    href: string;
    current: boolean;
  }
  export let items: BreadcrumbItem[];
</script>

<nav
  role="navigation"
  class={`fr-breadcrumb ${spacing} dsc-breadcrumb`}
  aria-label="vous êtes ici :"
>
  <button type="button" class="fr-breadcrumb__button" aria-expanded="false" aria-controls={id}>
    Voir le fil d'Ariane
  </button>
  <div class="fr-collapse" {id}>
    <ol class="fr-breadcrumb__list">
      {#each items as item}
        <li>
          <a
            class="fr-breadcrumb__link"
            href={item.href}
            aria-current={item.current ? "page" : undefined}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ol>
  </div>
</nav>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .dsc-breadcrumb {
    @include respond-to("sm") {
      margin-block-end: 0.5rem !important;
    }
  }
</style>
