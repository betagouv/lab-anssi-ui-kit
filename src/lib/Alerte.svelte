<svelte:options customElement="lab-anssi-alerte" />

<script lang="ts">
  export let description: string;
  let estOuvert = true;
</script>

{#if estOuvert}
  <div class="alerte">
    <span class="icone"></span>
    <div class="contenu">{description}</div>
    <button
      class="fermer"
      on:click={() => {
        estOuvert = false;
      }}
    ></button>
  </div>
{/if}

<style lang="scss">
  .alerte {
    display: flex;
    border: 1px solid #0163cb;
    min-width: 200px;
  }
  .contenu {
    flex: 1;
    padding: 8px;
    color: $texte-secondaire;
  }
  .icone {
    width: 40px;
    min-width: 40px;
    background: no-repeat center 8px #0163cb url-asset("/icones/information.svg");
  }
  .fermer {
    width: 16px;
    height: 16px;
    padding: 8px;
    margin-top: 3px;
    margin-right: 3px;
    background: no-repeat center 8px url-asset("/icones/croix-bleu.svg");
    border: 0;
    cursor: pointer;
    box-sizing: content-box;
  }
</style>
