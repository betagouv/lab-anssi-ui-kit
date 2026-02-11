<svelte:options
  customElement={{
    tag: "dsfr-transcription",
    props: {
      id: { attribute: "id", type: "String" },
      title: { attribute: "title", type: "String" },
      fullscreen: { attribute: "fullscreen", type: "String" },
      fullscreenAriaLabel: { attribute: "fullscreen-aria-label", type: "String" },
      isExpanded: { attribute: "is-expanded", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  export interface Props {
    /** Identifiant unique de la transcription */
    id: string;
    /** Titre de la modale de transcription */
    title?: string;
    /** Libellé du bouton plein écran */
    fullscreen?: string;
    /** Texte alternatif du bouton plein écran */
    fullscreenAriaLabel?: string;
    /** Transcription ouverte par défaut */
    isExpanded?: boolean;
  }

  let {
    id,
    title = "Transcription",
    fullscreen = "Agrandir",
    fullscreenAriaLabel = "Agrandir la transcription",
    isExpanded = false,
  }: Props = $props();

  let isModalOpened = $state(false);
</script>

<div {id} class="fr-transcription">
  <button
    type="button"
    class="fr-transcription__btn"
    aria-expanded={isExpanded}
    aria-controls={`fr-transcription-collapse-${id}`}
    onclick={() => (isExpanded = !isExpanded)}
  >
    {title}
  </button>
  <div
    id={`fr-transcription-collapse-${id}`}
    class="fr-collapse"
    class:fr-collapse--expanded={isExpanded}
  >
    <div class="fr-transcription__footer">
      <div class="fr-transcription__actions-group">
        <button
          aria-controls={`fr-transcription-modal-${id}`}
          data-fr-opened="false"
          type="button"
          class="fr-btn--fullscreen fr-btn"
          onclick={() => (isModalOpened = true)}
        >
          {fullscreen}
        </button>
      </div>
    </div>
    <dialog
      id={`fr-transcription-modal-${id}`}
      class="fr-modal"
      class:fr-modal--opened={isModalOpened}
    >
      <div class="fr-container fr-container--fluid fr-container-md">
        <div class="fr-grid-row fr-grid-row--center">
          <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <div class="fr-modal__body">
              <div class="fr-modal__header">
                <button
                  aria-controls={`fr-transcription-modal-${id}`}
                  title="Fermer"
                  type="button"
                  class="fr-btn--close fr-btn"
                  onclick={() => (isModalOpened = false)}
                >
                  Fermer
                </button>
              </div>
              <div class="fr-modal__content">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/button/main";
  @import "@gouvfr/dsfr/src/dsfr/component/modal/main";
  @import "@gouvfr/dsfr/src/dsfr/component/transcription/main";

  @include set-shadow-host();
  @include set-dsfr-sizing("transcription");
</style>
