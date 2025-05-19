<svelte:options customElement={{
  tag: 'lab-anssi-marelle',
  props: {
    titre: { reflect: false, type: 'String', attribute: 'titre' },
    etapesmarelle: { reflect: false, type: 'Array', attribute: 'etapesmarelle' }
  }
}} />

<script lang="ts">
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import type { EtapeMarelle } from "$lib/types.js";
  import Etape from "$lib/lab/vitrines-produits/briques/marelle/Etape.svelte";

  export let titre: string = "";
  export let etapesmarelle: EtapeMarelle[] = []
</script>

<Brique variation="secondaire">
  <div class="titre">{titre}</div>
  <section class="marelle-etapes">
    {#each etapesmarelle as etapeMarelle, index}
      <Etape index={index} etapeMarelle={etapeMarelle} />
    {/each}
  </section>
</Brique>

<style lang="scss">
  .titre {
    color: $brique-marelle-titre-couleur;
    text-align: center;
    font-weight: 700;
    font-size: 28px;
    line-height: 36px;

    margin-bottom: 48px;

    @include a-partir-de(desktop) {
      font-size: 32px;
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
</style>
