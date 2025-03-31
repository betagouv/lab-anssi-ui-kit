<svelte:options customElement="lab-anssi-centre-aide" />

<script lang="ts">
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { srcAsset } from "$lib/assets/assets";

  export let nomService: string;
  export let liens: string;

  const emetEvenement = createEventDispatcher<{ lienclique: { target: EventTarget & HTMLAnchorElement } }>();

  let liensMisEnForme: { texte: string; href?: string; preventDefault?: boolean; id?: string }[] = [];
  $: {
    liensMisEnForme = JSON.parse(liens);
    if (!Array.isArray(liensMisEnForme) || liensMisEnForme.some((l) => !l.texte)) {
      throw new Error("Les liens doivent respecter le type : { texte: string; href?: string; preventDefault?: boolean; id?: string }[]");
    }
  }

  let ouvert: boolean = false;
</script>

{#if !ouvert}
  <button
    class="declencheur-centre-aide"
    on:click={() => (ouvert = true)}
    transition:fly={{ y: 300 }}
  >
    <img src={srcAsset("/icones/centre-aide.svg")} alt="Icône du centre d'aide" />
    Centre d'aide
  </button>
{/if}

{#if ouvert}
  <div class="centre-aide" transition:fly={{ y: 300 }}>
    <div class="entete">
      <div>
        <img
          class="icone-centre-aide"
          src={srcAsset("/icones/centre-aide.svg")}
          alt="Icône du centre d'aide"
        />
        <h4>Centre d'aide</h4>
      </div>
      <button on:click={() => (ouvert = false)}>
        <span>Fermer</span>
        <img
          src={srcAsset("/icones/croix-blanche.svg")}
          alt="Icône de fermeture du centre d'aider"
        />
      </button>
    </div>
    <div class="contenu">
      <div class="message">
        <span>Bonjour et bienvenue sur <b>{nomService}</b>. Comment pouvons-nous vous aider ?</span>
      </div>
      {#if liensMisEnForme}
        {#each liensMisEnForme as lien, id (id)}
          <a class="lien lien-principal" href={lien.href} target="_blank" id={lien.id} on:click={(e) =>{
            if(lien.preventDefault)
              e.preventDefault();
            emetEvenement('lienclique', { target: e.currentTarget });
          }}>{lien.texte}</a>
        {/each}
      {/if}
      <div class="message marge-haute">
        <span>Vous souhaitez faire une autre demande à l'ANSSI ?</span>
      </div>
      <a
        class="lien secondaire centre-aide-signaler-incident"
        href="https://club.ssi.gouv.fr/#/declarations"
        target="_blank">️⚠️ Signaler un incident ou une vulnérabilité</a
      >
      <a
        class="lien secondaire centre-aide-contacter-anssi"
        href="https://cyber.gouv.fr/contacter-lanssi"
        target="_blank">️📩 Contacter d’autres services de l’ANSSI</a
      >
    </div>
  </div>
{/if}

<style lang="scss">
  .declencheur-centre-aide {
    position: fixed;
    bottom: 24px;
    right: 24px;
    border-radius: 100px;
    border: 1px solid #fff;
    background: $centre-aide-background-entete;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 18, 0.16);
    color: #f5f5fe;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    display: flex;
    gap: 8px;
    padding: 10px 24px 10px 18px;
    cursor: pointer;
    z-index: 1000;
    font-family: Marianne;

    &:hover {
      background: $centre-aide-background-hover-declencheur;
    }

    @include a-partir-de(tablette) {
      bottom: 48px;
      right: 48px;
    }
  }

  .centre-aide {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 9;
    font-family: Marianne;
    overflow-y: scroll;

    @include a-partir-de(tablette) {
      width: 520px;
      height: 576px;
      top: unset;
      left: unset;
      bottom: 48px;
      right: 48px;

      border-radius: 8px;
      border: 1px solid #fff;
      box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.16);
    }

    .entete {
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: $centre-aide-background-entete;
      position: sticky;
      top: 0;
      z-index: 1;

      @include a-partir-de(tablette) {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      .icone-centre-aide {
        width: 24px;
        height: 24px;

        @include a-partir-de(tablette) {
          width: 30px;
          height: 30px;
        }
      }

      h4 {
        color: white;
        font-size: 18px;
        font-weight: 700;
        line-height: 28px;
        margin: 0;

        @include a-partir-de(tablette) {
          font-size: 24px;
          line-height: 32px;
        }
      }

      div {
        display: flex;
        flex-direction: row;
        gap: 16px;
      }

      button {
        border: none;
        background: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
          display: none;
          font-size: 14px;
          line-height: 24px;
          font-weight: 500;
          margin-right: 8px;
          color: white;
          font-family: Marianne;

          @include a-partir-de(tablette) {
            display: inline-block;
          }
        }
      }
    }

    .contenu {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      @include a-partir-de(tablette) {
        padding: 32px;
      }

      .message {
        display: flex;
        padding: 16px;
        border-radius: 8px;
        background: #ededed;

        color: #161616;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5rem;

        @include a-partir-de(tablette) {
          width: fit-content;
        }

        &.marge-haute {
          margin-top: 16px;
        }
      }

      a.lien {
        box-sizing: border-box;
        text-decoration: none;
        padding: 10px 18px 10px 24px;
        background: $centre-aide-background-bouton;
        color: $centre-aide-font-color-bouton;
        border-radius: 8px;

        font-size: 18px;
        font-weight: 500;
        line-height: 28px;
        display: flex;
        flex-direction: row;
        text-align: left;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        gap: 8px;

        &[href]:after {
          content: "";
          mask-image: url-asset("/icones/lien-externe.svg");
          -webkit-mask-image: url-asset("/icones/lien-externe.svg");
          display: flex;
          background-color: $centre-aide-font-color-bouton;
          width: 24px;
          height: 24px;
          mask-size: 24px;
          min-width: 24px;
        }

        &:hover {
          background-color: $centre-aide-background-hover-lien;
        }

        @include a-partir-de(tablette) {
          width: fit-content;
        }

        &.secondaire {
          background: none;
          border: 1px solid $centre-aide-border-lien-secondaire;
          color: $centre-aide-font-color-lien-secondaire;

          &:after {
            background-color: $centre-aide-font-color-lien-secondaire;
          }

          &:hover {
            background-color: $centre-aide-background-hover-lien-secondaire;
          }
        }
      }
    }
  }
</style>
