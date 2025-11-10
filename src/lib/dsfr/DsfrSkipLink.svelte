<svelte:options
  customElement={{
    tag: "dsfr-skiplink",
    props: {
      items: { attribute: "items", type: "Array" },
    },
  }}
/>

<script lang="ts">
  import DsfrLink from "./DsfrLink.svelte";

  type Link = {
    label: string;
    href: string;
  };
  interface Props {
    /** Liste des liens d'évitements */
    items: Link[];
    /** Texte alternatif pour le menu de navigation */
    ariaLabel?: string;
  }

  let { items = [], ariaLabel = "Accès rapide" }: Props = $props();
</script>

<div class="fr-skiplinks">
  <nav role="navigation" aria-label={ariaLabel} class="fr-container">
    <ul class="fr-skiplinks__list">
      {#each items as { label, href }}
        <li>
          <DsfrLink {href} {label} />
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module/container";
  @include grid($grid-settings);
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/skiplink/skiplink.main.min.css";

  @include set-shadow-host("inline-block");
  @include set-dsfr-sizing("skiplinks");
</style>
