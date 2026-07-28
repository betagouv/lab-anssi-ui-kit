<svelte:options
  customElement={{
    tag: "lab-anssi-carrousel-tuiles",
    props: {
      tuiles: { attribute: "tuiles", type: "Array" },
      fond: { attribute: "fond", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Tuiles } from "$lib/types";
  import { setThemeable, withIconsStyleSheet } from "$lib/utilitaires";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrTile from "$lib/dsfr/DsfrTile.svelte";

  interface Props {
    tuiles?: Tuiles;
    fond?: "clair" | "sombre";
  }

  let { tuiles = [], fond = "clair" }: Props = $props();

  setThemeable($host());

  let elementCarrousel: HTMLDivElement | undefined = $state();
  let estAuDebut = $state(true);
  let estALaFin = $state(false);

  /**
   * Met à jour l'état de scroll du carrousel.
   * Détermine si le carrousel est au début ou à la fin pour activer/désactiver les boutons de navigation.
   */
  const gereLetatDuScroll = () => {
    if (!elementCarrousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = elementCarrousel;

    estAuDebut = scrollLeft <= 0;
    estALaFin = scrollLeft + clientWidth >= scrollWidth - 1;
  };

  $effect(() => {
    if (!elementCarrousel) return;

    gereLetatDuScroll();

    const observer = new ResizeObserver(gereLetatDuScroll);
    observer.observe(elementCarrousel);

    return () => observer.disconnect();
  });

  /**
   * Fait défiler le carrousel dans la direction spécifiée.
   *
   * @param {number} direction - La direction du défilement (-1 pour précédent, +1 pour suivant)
   */
  const versDirection = (direction: number) => {
    if (!elementCarrousel) return;

    const cardWidth = elementCarrousel.firstElementChild?.clientWidth || 0;

    elementCarrousel.scrollBy({
      left: direction * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  const precedent = () => versDirection(-1);
  const suivant = () => versDirection(+1);

  const variationBoutons = $derived(
    fond === "sombre" ? "inverted-tertiary-no-outline" : "tertiary-no-outline",
  );
</script>

<div
  class={[
    "lab-anssi-carrousel-tuiles carrousel-tuiles primaire",
    `lab-anssi-carrousel-tuiles--${fond}`,
  ]}
>
  <div class="lab-anssi-carrousel-tuiles__wrapper">
    <div
      class="lab-anssi-carrousel-tuiles__conteneur"
      bind:this={elementCarrousel}
      onscroll={gereLetatDuScroll}
    >
      <slot>
        {#each tuiles as tuile, idx (idx)}
          <div class="lab-anssi-carrousel-tuiles__element">
            <DsfrTile
              title={tuile.titre}
              hasDescription
              description={tuile.contenu}
              actionMarkup="false"
              noLink
            >
              <img src={tuile.illustration.lien} alt={tuile.illustration.alt} slot="pictogram" />
            </DsfrTile>
          </div>
        {/each}
      </slot>
    </div>

    <div class="lab-anssi-carrousel-tuiles__actions">
      <DsfrButton
        label="Précédent"
        kind={variationBoutons}
        hasIcon
        icon="arrow-left-s-line"
        iconPlace="left"
        onclick={precedent}
        disabled={estAuDebut}
      />
      <DsfrButton
        label="Suivant"
        kind={variationBoutons}
        hasIcon
        icon="arrow-right-s-line"
        iconPlace="right"
        onclick={suivant}
        disabled={estALaFin}
      />
    </div>
  </div>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";

  :host(lab-anssi-carrousel-tuiles) {
    display: block;
    box-sizing: border-box;
  }

  .lab-anssi-carrousel-tuiles {
    --espacement: 16px;

    &,
    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    background: var(--background-composant);
    padding: var(--padding-composant);

    &__conteneur {
      display: flex;
      overflow-x: auto;
      gap: var(--espacement);

      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      scrollbar-width: none;

      -ms-scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;

      @include respond-to("md") {
        margin-block-end: 32px;
      }

      @include respond-from("md") {
        --espacement: 24px;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__element {
      display: flex;
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: center;

      @include respond-from("md") {
        display: none;
      }
    }

    &__element,
    :global(::slotted(*)) {
      @include respond-to("md") {
        min-width: calc(100% - (var(--espacement) * 2));
        scroll-snap-align: center;
      }

      @include respond-from("md") {
        flex: 1;
      }
    }
  }
</style>
