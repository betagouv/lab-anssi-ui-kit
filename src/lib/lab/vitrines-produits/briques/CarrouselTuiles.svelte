<script lang="ts">
  import Tuile from "$lib/lab/vitrines-produits/briques/Tuile.svelte";

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

<div class="carrousel-tuiles">
  <div class="conteneur-tuiles" bind:this={elementCarrousel}>
    <Tuile
      illustration="src/lib/assets/illustrations/mon-aide-cyber/environment.svg"
      titre="Un dispositif étatique"
      contenu="Pourquoi, quoi, quand, qui, comment ? L'homologation de sécurité a été pensée pour être accessible à tous."
      classe="tuile-presentation"
    />
    <Tuile
      illustration="src/lib/assets/illustrations/mon-aide-cyber/environment.svg"
      titre="Proportionnée"
      contenu={`D'une démarche "simplifiée" à une démarche "renforcée", l'homologation doit être adaptée à la criticité d'un système et à son exposition au risque.`}
      classe="tuile-presentation"
    />
    <Tuile
      illustration="src/lib/assets/illustrations/mon-aide-cyber/environment.svg"
      titre="Adaptée à vos usages"
      contenu="Une homologation simplifiée pensée pour répondre à la diversité des contextes de mise en oeuvre de l'homologation de sécurité de vos systèmes d'homologation."
      classe="tuile-presentation"
    />
  </div>
  <div class="conteneur-actions">
    <button class="precedent" on:click={precedent}>Précédent</button>
    <button class="suivant" on:click={suivant}>Suivant</button>
  </div>
</div>

<style lang="scss">

  .carrousel-tuiles {
    padding: 52px 0;
    background: linear-gradient(
      to bottom,
      $centre-aide-background-entete 0%,
      $centre-aide-background-entete 30%,
      transparent 30%,
      transparent 100%
    );
  }
  .conteneur-tuiles {
    --espacement: 16px;
    display: flex;
    /*flex-grow: 1;
    flex-basis: 0;
    justify-content: center;*/
    overflow-x: auto;
    gap: var(--espacement);
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 32px;
  }

  .conteneur-tuiles::-webkit-scrollbar {
    display: none;
  }

  .tuile-presentation:first-of-type {
    margin-left: var(--espacement);
  }

  .tuile-presentation:last-of-type {
    margin-right: var(--espacement);
  }

  .tuile-presentation {
    box-sizing: border-box;
    scroll-snap-align: center;
    flex-shrink: 0;
    width: calc(100vw - 60px);
    max-width: 266px;
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
    color: white;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .conteneur-actions .precedent:before,
  .conteneur-actions .suivant:after {
    content: url(/statique/assets/images/fleche_gauche_bleue.svg);
    display: flex;
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
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

  @media screen and (min-width: 577px) {
    .conteneur-tuiles {
      --espacement: 24px;
    }
  }

  @media screen and (min-width: 1247px) {
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
</style>
