<svelte:options
  customElement={{
    tag: "lab-anssi-carrousel-tuiles",
    props: {
      tuiles: { reflect: false, type: "Array", attribute: "tuiles" },
    },
  }}
/>

<script lang="ts">
  import type { Tuiles } from "$lib/types";

  import Brique from "$lib/composants/vitrines-produits/briques/Brique.svelte";
  import DsfrTile from "$lib/dsfr/DsfrTile.svelte";
  import IconeFlecheGauche from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheGauche.svelte";
  import IconeFlecheDroite from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheDroite.svelte";

  interface Props {
    tuiles?: Tuiles;
  }

  let { tuiles = [] }: Props = $props();

  let elementCarrousel: HTMLDivElement = $state();

  const versDirection = (direction: number) => {
    if (elementCarrousel) {
      const cardWidth = elementCarrousel.firstElementChild?.clientWidth || 0;
      elementCarrousel.scrollBy({
        left: direction * (cardWidth + 16),
        behavior: "smooth",
      });
    }
  };

  const precedent = () => versDirection(-1);

  const suivant = () => versDirection(+1);
</script>

<div class="carrousel-tuiles primaire">
  <Brique variation="transparent" sansMargeHaute sansMargeLaterale>
    <div class="conteneur-tuiles" bind:this={elementCarrousel}>
      <slot>
        {#each tuiles as tuile, idx (idx)}
          <div class="tuile">
            <DsfrTile
              title={tuile.titre}
              hasDescription
              description={tuile.contenu}
              actionMarkup="false"
              noLink={true}
            >
              <img slot="pictogram" src={tuile.illustration.lien} alt={tuile.illustration.alt} />
            </DsfrTile>
          </div>
        {/each}
      </slot>
    </div>
    <div class="conteneur-actions">
      <button type="button" class="precedent" onclick={precedent}>
        <span class="icone"><IconeFlecheGauche /></span>
        Précédent
      </button>
      <button type="button" class="suivant" onclick={suivant}>
        Suivant
        <span class="icone"><IconeFlecheDroite /></span>
      </button>
    </div>
  </Brique>
</div>

<style lang="scss">
  .carrousel-tuiles {
    --espacement: 16px;

    &.primaire {
      background: linear-gradient(
        to bottom,
        $centre-aide-background-entete 0%,
        $centre-aide-background-entete 30%,
        transparent 30%,
        transparent 100%
      );
    }
  }

  .conteneur-tuiles {
    display: flex;
    overflow-x: auto;
    gap: var(--espacement);
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .conteneur-actions {
    display: flex;
    margin-top: 32px;
    justify-content: center;
    padding: 0 var(--espacement);
    gap: 24px;

    .icone {
      display: flex;
      align-items: center;
    }
  }

  .conteneur-actions button {
    position: relative;
    background: none;
    border: none;
    color: $brique-carrousel-bouton-action-texte-couleur;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      &:after {
        bottom: -1px;
        height: 2px;
      }
    }

    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 100%;
      height: 1px;
      background: $brique-carrousel-bouton-action-texte-couleur;
    }
  }

  .tuile {
    --couleur-texte: #000000;

    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--couleur-texte);
    min-width: 212px;
    box-sizing: border-box;
    scroll-snap-align: center;
    flex-shrink: 0;
    width: calc(100vw - 60px);
    max-width: 384px;

    &:first-child {
      margin-left: var(--espacement);

      @include a-partir-de(largeur-max-contenu) {
        margin-left: 0;
      }
    }

    &:last-child {
      margin-right: var(--espacement);

      @include a-partir-de(largeur-max-contenu) {
        margin-right: 0;
      }
    }
  }

  @include a-partir-de(desktop) {
    .carrousel-tuiles {
      --espacement: 24px;
    }

    .conteneur-actions {
      display: none;
    }
  }
</style>
