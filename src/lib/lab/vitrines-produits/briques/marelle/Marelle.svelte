<svelte:options customElement={{
  tag: 'lab-anssi-marelle',
  props: {
    titre: { reflect: false, type: 'String', attribute: 'titre' },
    etapesmarelle: { reflect: false, type: 'Array', attribute: 'etapesmarelle' },
    action: { reflect: false, type: 'Object', attribute: 'action' }
  }
}} />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { Action, EtapeMarelle } from "$lib/types";
  import Etape from "$lib/lab/vitrines-produits/briques/marelle/Etape.svelte";

  export let titre: string = "";
  export let etapesmarelle: EtapeMarelle[] = []
  export let action: Action;
</script>

<Brique variation="secondaire">
  <div class="brique-marelle">
    <div class="titre">{titre}</div>
    <section class="marelle-etapes">
      {#each etapesmarelle as etapeMarelle, index}
        <Etape index={index} etapeMarelle={etapeMarelle} />
      {/each}
    </section>
    {#if action}
      <div class="bouton-action">
        <a role="button" class="action" href={action.lien} target="_blank">{action.titre}</a>
      </div>
    {/if}
  </div>
</Brique>

<style lang="scss">
  .brique-marelle {
    display: flex;
    flex-direction: column;
    gap: 48px;

    .titre {
      color: $brique-marelle-titre-couleur;
      text-align: center;
      font-weight: 700;
      font-size: 1.75rem;
      line-height: 36px;

      @include a-partir-de(desktop) {
        font-size: 2rem;
        line-height: 40px;
      }
    }

    .marelle-etapes {
      display: flex;
      flex-direction: column;
      gap: 48px;
      color: $texte-defaut;

      @include a-partir-de(desktop) {
        gap: 32px;
      }
    }

    .bouton-action {
      display: flex;
      justify-content: center;

      a[role='button'] {
        text-decoration: none;
        font-family: Marianne, sans-serif;
        padding: 8px 16px;

        text-align: center;
        font-weight: 500;
        font-size: 1rem;
        line-height: 24px;

        border-radius: 4px;

        &.action {
          background-color: $brique-marelle-bouton-background;
          color: $brique-marelle-bouton-texte;
          border: none;
          cursor: pointer;

          &:active {
            background-color: $brique-marelle-bouton-background-active;
            box-shadow: none;
            border: none;
          }

          &:hover {
            background-color: $brique-marelle-bouton-background-hover;
            box-shadow: none;
            border: none;
          }
        }
      }
    }
  }
</style>
