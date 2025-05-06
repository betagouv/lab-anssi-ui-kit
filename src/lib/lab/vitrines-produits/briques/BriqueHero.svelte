<svelte:options customElement="lab-anssi-brique-hero" />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";

  type Image = {
    nom: string;
    cheminFichier: string;
    alt: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type PropsSerialisees<T> = string;
  type Actions = { titre: string; lien: string; variation: 'primaire' | 'secondaire' }[]

  export let titre: string;
  export let sousTitre: string;
  export let actions: PropsSerialisees<Actions>;
  export let illustration: PropsSerialisees<Image>;
  export let partenaires: PropsSerialisees<Image[]>

  const illustrationFormatee: Image = JSON.parse(illustration);
  const actionsFormattees: Actions = JSON.parse(actions);
  const partenairesFormattees: Image[] = JSON.parse(partenaires);
</script>

<Brique>
  <div class="hero">
    <div class="contenu">
      <div>
        <h1>{titre}</h1>
        <p>{sousTitre}</p>
      </div>
      <div class="actions">
        {#each actionsFormattees as action}
          <button type="button" class={action.variation}>{action.titre}</button>
        {/each}
      </div>
    </div>
    <div class="image">
      <img src={illustrationFormatee.cheminFichier} alt={illustrationFormatee.alt} />
    </div>
    {#if partenairesFormattees && partenairesFormattees.length > 0}
      <div class="partenaires">
        <p>Mention partenaires</p>
        <div class="liste">
          {#each partenairesFormattees as partenaire}
            <img src={partenaire.cheminFichier} alt={partenaire.alt} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</Brique>


<style lang="scss">
  .hero {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 'contenu'
                          'image'
                          'partenaires';
    gap: 32px;

    @include a-partir-de(desktop) {
      grid-template-areas: 'contenu image'
                            'actions image'
                            'partenaires image';
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 0px;
    }

    .contenu {
      grid-area: contenu;
      display: flex;
      flex-direction: column;
      gap: 32px;

     /* h1 {
        text-align: center;

        @include a-partir-de(tablette) {
          text-align: left;
        }
      }*/

      .actions {
        grid-area: actions;
        display: flex;
        flex-direction: column;
        gap: 16px;

        @include a-partir-de(tablette) {
          flex-direction: row;
        }
      }

      @include a-partir-de(tablette) {
        margin-bottom: 32px;
      }
    }

    .image {
      grid-area: image;

      img {
        width: 100%;
        max-height: 250px;
      }

    }

    .partenaires {
      grid-area: partenaires;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .partenaire {
        color: black;
      }
    }

    h1 {
      font-size: 40px;
      margin: 0;
      line-height: 48px;
      word-break: break-word;
    }

    p {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }


    button {
      padding: 8px 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }

    button.primaire {
      color: $centre-aide-font-color-bouton;
      background-color: $centre-aide-background-bouton;
    }

    button.secondaire {
      color: white;
      background-color: transparent;
    }
  }
</style>
