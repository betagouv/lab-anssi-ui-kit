<svelte:options
  customElement={{
    tag: "lab-anssi-alerte",
    props: {
      description: { reflect: false, type: "String", attribute: "description" },
      type: { reflect: false, type: "String", attribute: "type" },
      fermable: { reflect: false, type: "Boolean", attribute: "fermable" },
    },
  }}
/>

<script lang="ts">
  export let description: string;
  export let type: "information" | "erreur" = "information";
  export let fermable: boolean = true;

  let estOuvert = true;
</script>

{#if estOuvert}
  <div class="alerte {type}">
    <span class="icone"></span>
    <div class="conteneur">
      <div class="contenu">{description}</div>
      {#if fermable}
        <button
          class="fermer"
          on:click={() => {
            estOuvert = false;
          }}
        ></button>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .alerte {
    display: flex;
    min-width: 200px;
    font-family: Marianne, sans-serif;
  }

  .conteneur {
    border: 2px solid red;
    border-left: none;
    display: flex;
    width: 100%;
    border-radius: 0 8px 8px 0;
  }

  .contenu {
    flex: 1;
    padding: 8px;
    color: $texte-secondaire;
  }

  .icone {
    width: 40px;
    min-width: 40px;
    border-radius: 8px 0 0 8px;
  }

  .information {
    .conteneur {
      border-color: #0163cb;
    }

    .icone {
      background: no-repeat center 8px #0163cb url-asset("/icones/information.svg");
    }
  }

  .erreur {
    .conteneur {
      border-color: #ce0500;
    }

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
    background: no-repeat center 8px url-asset("/icones/croix-noire.svg");
    border: 0;
    cursor: pointer;
    box-sizing: content-box;
  }
</style>
