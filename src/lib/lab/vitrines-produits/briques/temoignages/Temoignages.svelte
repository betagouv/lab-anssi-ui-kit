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
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Temoignage } from "$lib/types";
  import IconeTemoignage from "$lib/lab/vitrines-produits/briques/temoignages/IconeTemoignage.svelte";
  import IconeFlecheGauche from "$lib/lab/vitrines-produits/briques/CarrouselTuiles/IconeFlecheGauche.svelte";
  import IconeFlecheDroite from "$lib/lab/vitrines-produits/briques/CarrouselTuiles/IconeFlecheDroite.svelte";

  export let titre: string = "Les avis de nos utilisateurs";
  export let temoignages: Temoignage[] = [];

  let elementCarrousel: HTMLDivElement;

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
            <IconeTemoignage />
            <h4>«&nbsp;{temoignage.citation}&nbsp;»</h4>
            <h5>{temoignage.auteur}</h5>
            <h6>{temoignage.source}</h6>
          </div>
        {/each}
      </div>
      {#if temoignages.length > 1}
        <div class="conteneur-actions" class:deux-ou-moins={temoignages.length <= 2}>
          <button class="precedent" type="button" on:click={() => scrollVers(Direction.GAUCHE)}>
            <span class="icone"><IconeFlecheGauche /></span>Précédent
          </button>
          <button class="suivant" type="button" on:click={() => scrollVers(Direction.DROITE)}
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

        .temoignage {
          width: 100%;
          flex-shrink: 0;
          scroll-snap-align: start;

          &:after {
            content: "";
            border-bottom: 1px solid $border-default-grey;
            width: 15%;
            display: block;
            padding-bottom: 32px;
            margin: 0 auto 0 0;

            @include a-partir-de(desktop) {
              content: "";
              border-bottom: none;
            }
          }

          @include a-partir-de(tablette-grand) {
            width: calc(50% - var(--gap-des-elements));
          }

          @include a-partir-de(desktop) {
            // On rajoute du padding, donc on passe en border-box pour que ça « snap » toujours pile-poil
            padding-left: 32px;
            box-sizing: border-box;
            border-left: 1px solid $border-default-grey;
          }

          color: #161616;
          font-size: 1.25rem;
          font-style: normal;
          font-weight: 700;
          line-height: 2rem;

          h4 {
            margin: 8px 0 0;
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 2rem;
          }

          h5 {
            margin: 16px 0 0;
            color: $texte-defaut;
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.5rem;

            @include a-partir-de(tablette) {
              font-size: 1rem;
              font-weight: 700;
              line-height: 1.5rem;
            }
          }

          h6 {
            margin: 4px 0 0;
            color: $text-mention-grey;

            font-size: 0.75rem;
            font-style: italic;
            font-weight: 400;
            line-height: 1.25rem;
          }
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

          box-shadow: inset 0 -1px 0 $brique-temoignages-bouton-action-texte-couleur;
        }

        .precedent > .icone,
        .suivant > .icone {
          display: flex;
          align-items: center;
        }

        button:hover {
          box-shadow: inset 0 -2px 0 $brique-temoignages-bouton-action-texte-couleur;
        }
      }
    }
  }
</style>
