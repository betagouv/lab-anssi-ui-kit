<svelte:options customElement={{
  tag: 'lab-anssi-carrousel-tuiles',
  props: {
    tuiles: { reflect: false, type: 'Array', attribute: 'tuiles' }
  }
}} />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import Tuile from "$lib/lab/vitrines-produits/briques/Tuile.svelte";
  import type { Tuiles } from "$lib/types.js";

  export let tuiles: Tuiles = [];

  let elementCarrousel: HTMLDivElement;

  const versDirection = (direction: number) => {
    if (elementCarrousel) {
      const cardWidth = elementCarrousel.firstElementChild?.clientWidth || 0;
      elementCarrousel.scrollBy({
        left: direction * (cardWidth + 16),
        behavior: 'smooth',
      });
    }
  };

  const precedent = () => versDirection(-1);

  const suivant = () => versDirection(+1);
</script>

<div class="carrousel-tuiles primaire">
  <Brique variation="transparent" sansMargeHaute sansMargeLaterale>
    <div class="conteneur-tuiles" bind:this={elementCarrousel}>
      {#each tuiles as tuile, idx (idx)}
        <Tuile
          illustration={tuile.illustration}
          titre={tuile.titre}
          contenu={tuile.contenu}
          position={idx === 0 ? "premiere" : idx === tuiles.length - 1 ? "derniere" : null}
        />
      {/each}
    </div>
    <div class="conteneur-actions">
      <button class="precedent" on:click={precedent}>Précédent</button>
      <button class="suivant" on:click={suivant}>Suivant</button>
    </div>
  </Brique>
</div>

<style lang="scss">
  .carrousel-tuiles {
    --espacement: 16px;
    padding: 0;

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
    padding: 0 0;
  }

  .conteneur-tuiles::-webkit-scrollbar {
    display: none;
  }

  .conteneur-actions {
    display: flex;
    margin-top: 32px;
    justify-content: center;
    padding: 0 var(--espacement);
    gap: 24px;
  }

  .conteneur-actions button {
    background: none;
    border: none;
    color: $texte-dsfr;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: Marianne;
  }

  .conteneur-actions .precedent:before,
  .conteneur-actions .suivant:after {
    content: url-asset('/icones/fleche_gauche_bleue.svg');
    display: flex;
    width: 24px;
    height: 24px;
    line-height: 28px;
  }

  .conteneur-actions .suivant:after {
    transform: rotate(180deg);
  }

  .conteneur-actions button:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }

  @include a-partir-de(desktop) {
    .carrousel-tuiles {
      --espacement: 24px;

      .conteneur-actions {
        display: none;
      }

      .tuile-presentation:first-of-type {
        margin-left: 0;
      }

      .tuile-presentation:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
