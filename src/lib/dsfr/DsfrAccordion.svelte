<svelte:options
  customElement={{
    tag: "dsfr-accordion",
    props: {
      isExpanded: { attribute: "is-expanded", type: "Boolean" },
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      content: { attribute: "content", type: "String" },
      titleMarkupLevel: { attribute: "title-markup-level", type: "Number" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type Level = 2 | 3 | 4 | 5;
  type Markup = "h2" | "h3" | "h4" | "h5";
  interface Props {
    /** 'Attribut 'id' du collapse de l'accordéon */
    id: string;
    /** Libellé du bouton */
    label: string;
    /** Contenu du collapse */
    content: string;
    /** L'accordéon est-il ouvert au départ */
    isExpanded?: boolean;
    /** Niveau de balise du titre (ex: 2 pour <h2>) */
    titleMarkupLevel?: Level;
  }

  let { isExpanded = false, id, label, content, titleMarkupLevel = 3 }: Props = $props();

  let markup: Markup = $derived.by(
    () => ([2, 3, 4, 5].includes(titleMarkupLevel) ? `h${titleMarkupLevel}` : `h2`) as Markup,
  );
</script>

<section class="fr-accordion">
  <svelte:element this={markup} class="fr-accordion__title">
    <button
      type="button"
      class="fr-accordion__btn"
      aria-expanded={isExpanded}
      aria-controls={id}
      onclick={() => (isExpanded = !isExpanded)}
    >
      {label}
    </button>
  </svelte:element>
  <div class={["fr-collapse", { "fr-collapse--expanded": isExpanded }]} {id}>
    <slot>{content}</slot>
  </div>
</section>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/motion/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/typography";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/accordion/main";

  @include set-shadow-host();
  @include set-dsfr-sizing("accordion");
</style>
