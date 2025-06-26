<svelte:options
  customElement={{
    tag: "lab-anssi-alerte",
    props: {
      description: { reflect: false, type: "String", attribute: "description" },
      type: { reflect: false, type: "String", attribute: "type" },
    },
  }}
/>

<script lang="ts">
  export let description: string;
  export let type: "information" | "erreur" = "information";

  let estOuvert = true;
</script>

{#if estOuvert}
  <div class="alerte {type}">
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
    min-width: 200px;
    &.information {
      border: 1px solid #0163cb;
    }
    &.erreur {
      border: 1px solid #ce0500;
    }
  }
  .contenu {
    flex: 1;
    padding: 8px;
    color: $texte-secondaire;
  }
  .icone {
    width: 40px;
    min-width: 40px;
  }
  .information {
    .icone {
      background: no-repeat center 8px #0163cb url-asset("/icones/information.svg");
    }
  }
  .erreur {
    .icone {
      background: no-repeat center 8px #ce0500 url-asset("/icones/erreur.svg");
    }
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
