<svelte:options
  customElement={{
    tag: "lab-anssi-temoignages",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      temoignages: { reflect: false, type: "Array", attribute: "temoignages" },
    },
  }}
/>

<script lang="ts">
  import type { Temoignage } from "$lib/types";

  import Brique from "$lib/composants/vitrines-produits/briques/Brique.svelte";
  import DsfrQuote from "$lib/dsfr/DsfrQuote.svelte";
  import IconeFlecheGauche from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheGauche.svelte";
  import IconeFlecheDroite from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheDroite.svelte";

  interface Props {
    titre?: string;
    temoignages?: Temoignage[];
    size?: "md" | "lg" | "xl";
  }

  let { titre = "Les avis de nos utilisateurs", temoignages = [], size = "xl" }: Props = $props();

  let elementCarrousel: HTMLDivElement = $state();

  enum Direction {
    DROITE = 1,
    GAUCHE = -1,
  }

  const scrollVers = (direction: Direction) => {
    const declageCourant = elementCarrousel.scrollLeft;
    const largeurCarte = elementCarrousel.children[0].clientWidth;

    elementCarrousel.scrollLeft = declageCourant + largeurCarte * direction;
  };
</script>

<Brique variation="transparent">
  <div class="brique-temoignages">
    <h3>{titre}</h3>
    <div class="carrousel-temoignages">
      <div class="conteneur-carrousel" bind:this={elementCarrousel}>
        {#each temoignages as temoignage, idx (idx)}
          <div class="temoignage">
            <DsfrQuote
              text={temoignage.citation}
              hasAuthor={!!temoignage.auteur}
              author={temoignage.auteur}
              hasDetails={true}
              sources={[temoignage.source]}
              accent="blue-cumulus"
              {size}
            />
          </div>
        {/each}
      </div>
      {#if temoignages.length > 1}
        <div class="conteneur-actions" class:deux-ou-moins={temoignages.length <= 2}>
          <button class="precedent" type="button" onclick={() => scrollVers(Direction.GAUCHE)}>
            <span class="icone"><IconeFlecheGauche /></span>Précédent
          </button>
          <button class="suivant" type="button" onclick={() => scrollVers(Direction.DROITE)}
            >Suivant
            <span class="icone"><IconeFlecheDroite /></span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</Brique>

<style lang="scss">
  .brique-temoignages {
    font-family: Marianne;

    h3 {
      color: $brique-temoignages-titre-couleur;

      font-size: 1.75rem;
      font-weight: 700;
      line-height: 2.25rem;

      @include a-partir-de(tablette) {
        font-size: 2rem;
        line-height: 2.5rem;
      }
    }

    .carrousel-temoignages {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .conteneur-carrousel {
        --gap-des-elements: 24px;

        display: flex;
        gap: var(--gap-des-elements);
        overflow-x: auto;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 24px;
      }

      .temoignage {
        width: 100%;
        flex-shrink: 0;
        scroll-snap-align: start;
        color: #161616;

        @include a-partir-de(tablette-grand) {
          width: calc(50% - var(--gap-des-elements));
        }
      }

      .conteneur-actions {
        display: flex;
        margin-top: 32px;
        justify-content: center;
        gap: 24px;

        &.deux-ou-moins {
          @include a-partir-de(tablette-grand) {
            display: none;
          }
        }

        button {
          position: relative;
          background: none;
          border: none;
          color: $brique-temoignages-bouton-action-texte-couleur;
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
            background: $brique-temoignages-bouton-action-texte-couleur;
          }
        }

        .icone {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
