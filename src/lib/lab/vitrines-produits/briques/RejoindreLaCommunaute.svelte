<svelte:options
  customElement={{
		tag: 'lab-anssi-brique-rejoindre-la-communaute',
		props: {
      titre: { reflect: false, type: 'String', attribute: 'titre' },
      raisons: { reflect: false, type: 'Array', attribute: 'raisons' },
			action: { reflect: false, type: 'Object', attribute: 'action' },
      illustration: { reflect: false, type: 'Object', attribute: 'illustration' }
		}
	}} />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Action, Image } from "$lib/types";

  export let titre: string;
  export let raisons: string[];
  export let action: Action | undefined = undefined;
  export let illustration: Image;
</script>

<Brique variation="primaire">
  <div class="grille-contenu">
    <div class="illustration">
      <img src={illustration.lien} alt={illustration.alt} />
    </div>
    <div class="contenu">
      <h2>{titre}</h2>
      <p>
        En tant que <b>membre de la communauté</b>, vous pourrez :
      </p>
      <ul>
        {#each raisons as raison, idx (idx)}
          <li>{raison}</li>
        {/each}
      </ul>
    </div>
    <div class="action">
      {#if action}
        <a role="button" href={action.lien} target="_blank">
          {action.titre}
        </a>
      {/if}
    </div>
  </div>
</Brique>

<style lang="scss">
  .grille-contenu {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:  'contenu'
                          'illustration'
                          'action';
    row-gap: 32px;

    @include a-partir-de(desktop) {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:  'illustration contenu'
                            'illustration action';
      row-gap: 0;
      column-gap: 24px;
    }

    .contenu {
      grid-area: contenu;
      display: flex;
      flex-direction: column;
      row-gap: 8px;

      @include a-partir-de(desktop) {
        justify-content: center;
      }

      h2 {
        font-size: 1.75rem;
        line-height: 2.25rem;
        font-weight: 700;
        word-break: break-word;

        margin: 0;
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5rem;

        margin: 0;
      }
    }

    .action {
      grid-area: action;

      a[role='button'] {
        display: flex;
        justify-content: center;
        text-decoration: none;
        font-family: Marianne, sans-serif;
        padding: 8px 16px;
        max-width: 100%;

        text-align: center;
        font-weight: 500;
        font-size: 1rem;
        line-height: 24px;

        border-radius: 4px;

        background-color: $brique-contenu-deux-colonnes-action-bouton-background;
        color: $brique-contenu-deux-colonnes-action-bouton-texte;
        border: none;
        cursor: pointer;

        &:active {
          background-color: $brique-contenu-deux-colonnes-action-bouton-background-active;
          box-shadow: none;
          border: none;
        }

        &:hover {
          background-color: $brique-contenu-deux-colonnes-action-bouton-background-hover;
          box-shadow: none;
          border: none;
        }

        @include a-partir-de(tablette) {
          max-width: unset;
          width: fit-content;
        }
      }
    }

    .illustration {
      grid-area: illustration;

      img {
        width: 204px;
        height: 157px;

        display: flex;
        margin: 0 auto 0 auto;

        @include a-partir-de(tablette) {
          width: 364px;
          height: 282px;
        }

        @include a-partir-de(desktop) {
          width: 364px;
          height: 282px;
        }
      }
    }

  }
</style>