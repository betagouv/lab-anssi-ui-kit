<svelte:options
  customElement={{
    tag: "lab-anssi-temoignages",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      temoignages: { reflect: false, type: "Array", attribute: "temoignages" },
      size: { reflect: false, type: "String", attribute: "size" },
    },
  }}
/>

<script lang="ts">
  import type { Temoignage } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  import Brique from "$lib/composants/vitrines-produits/briques/Brique.svelte";
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrQuote from "$lib/dsfr/DsfrQuote.svelte";
  import IconeFlecheGauche from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheGauche.svelte";
  import IconeFlecheDroite from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/IconeFlecheDroite.svelte";

  setThemeable($host());

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
    {#if titre}
      <h3>{titre}</h3>
    {/if}
    <div class="carrousel-temoignages">
      <div class="conteneur-carrousel" bind:this={elementCarrousel}>
        {#each temoignages as temoignage, idx (idx)}
          <div class="temoignage">
            <dsfr-quote
              text={temoignage.citation}
              has-author={!!temoignage.auteur}
              author={temoignage.auteur}
              has-details={true}
              sources={[temoignage.source]}
              {size}
            ></dsfr-quote>
          </div>
        {/each}
      </div>
      {#if temoignages.length > 1}
        <div class="conteneur-actions" class:deux-ou-moins={temoignages.length <= 2}>
          <dsfr-button
            label="Précédent"
            kind="tertiary-no-outline"
            has-icon
            icon="arrow-left-line"
            role="button"
            tabindex="0"
            onclick={() => scrollVers(Direction.GAUCHE)}
            onkeydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollVers(Direction.GAUCHE);
              }
            }}
          ></dsfr-button>
          <dsfr-button
            label="Suivant"
            kind="tertiary-no-outline"
            has-icon
            icon="arrow-right-line"
            icon-place="right"
            role="button"
            tabindex="0"
            onclick={() => scrollVers(Direction.DROITE)}
            onkeydown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollVers(Direction.DROITE);
              }
            }}
          ></dsfr-button>
        </div>
      {/if}
    </div>
  </div>
</Brique>

<style lang="scss">
  .brique-temoignages {
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
          font-family: inherit;

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
