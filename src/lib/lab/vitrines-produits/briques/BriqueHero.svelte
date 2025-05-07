<svelte:options customElement="lab-anssi-brique-hero" />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Actions, Image, PropsSerialisees } from "$lib/types";

  export let titre: string;
  export let sousTitre: string;
  export let illustration: PropsSerialisees<Image>;

  export let badge: boolean = false;
  export let actions: PropsSerialisees<Actions> = "[]";
  export let partenaires: PropsSerialisees<Image[]> = "[]"

  const illustrationFormatee: Image = JSON.parse(illustration);
  const actionsFormattees: Actions = JSON.parse(actions);
  const partenairesFormattees: Image[] = JSON.parse(partenaires);
</script>

<Brique>
  <div class="hero">
    <div class="contenu">
      {#if badge}
        <div class="section-badge">
            <div class="badge">
              <span>Service à impact national</span>
            </div>
        </div>
      {/if}
      <div class="textes">
        <h1>{titre}</h1>
        <p>{sousTitre}</p>
      </div>
      {#if actionsFormattees && actionsFormattees.length > 0}
        <div class="actions">
          {#each actionsFormattees as action}
            <button type="button" class={action.variation}>{action.titre}</button>
          {/each}
        </div>
      {/if}
    </div>
    <div class="image">
      <img src={illustrationFormatee.lien} alt={illustrationFormatee.alt} />
    </div>
    {#if partenairesFormattees && partenairesFormattees.length > 0}
      <div class="partenaires">
        <p>Mention partenaires</p>
        <div class="liste">
          {#each partenairesFormattees as partenaire}
            <img src={partenaire.lien} alt={partenaire.alt} />
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
                            'partenaires image';
      grid-template-columns: 1fr 1fr;
      column-gap: 24px;
      row-gap: 0px;
    }

    .contenu {
      grid-area: contenu;
      display: flex;
      flex-direction: column;

      .textes {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
      }

      .badge {
        text-align: left;
        background: #defbe5;
        color: #18753c;
        text-transform: uppercase;
        padding: 0 6px;
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        border-radius: 4px;
        width: fit-content;
        margin-bottom: 4px;

        span {
          display: flex;
          flex-direction: row;
          gap: 4px;
          align-items: center;
        }

        span:before {
          content: url('src/lib/assets/icones/succes.svg');
          display: flex;
          width: 16px;
          height: 16px;
        }
      }

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

        @include a-partir-de(desktop) {
          max-height: 355px;
        }
      }

    }

    .partenaires {
      grid-area: partenaires;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .liste {
        display: flex;
        gap: 8px;

        img {
          width: 79px;
          height: 24px;
        }
      }
    }

    h1 {
      font-size: 40px;
      margin: 0;
      line-height: 48px;
      word-break: break-word;

      @include a-partir-de(tablette) {
        font-size: 48px;
      }
    }

    p {
      margin: 0;
      font-size: 20px;
      line-height: 32px;
    }


    button {
      font-family: Marianne, sans-serif;
      padding: 8px 16px;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      border-radius: 4px;
    }

    button.primaire {
      border: none;
      color: $centre-aide-font-color-bouton;
      background-color: $bouton-background-primaire;
    }

    button.primaire-inverse {
      border: none;
      color: $centre-aide-background-entete;
      background-color: $bouton-background-primaire-inverse;
    }

    button.secondaire {
      border-radius: 4px;
      border: 1px solid #FFF;
      color: white;
      background-color: transparent;
    }
  }
</style>
