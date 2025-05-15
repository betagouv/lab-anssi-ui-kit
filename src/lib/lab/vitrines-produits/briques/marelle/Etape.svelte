<script lang="ts">
  import type { EtapeMarelle } from "$lib/types.js";

  export let index: number;
  export let etapeMarelle: EtapeMarelle;

  const estPair: boolean = (index + 1) % 2 === 0
</script>

<div class={`marelle-etape ${estPair ? 'pair' : 'impair'}`}>
  <div class="illustration">
    <img src={etapeMarelle.illustration.lien} alt={etapeMarelle.illustration.alt} />
  </div>
  <div class="numero-etape">
    <div class="encart-rond">
      <span>{index + 1}</span>
    </div>
  </div>
  <div class="contenu">
    <h4>{etapeMarelle.titre}</h4>
    <p>{etapeMarelle.description}</p>
    {#if etapeMarelle.lien}
      <a href={etapeMarelle.lien.href} target={etapeMarelle.lien.target}>{etapeMarelle.lien.texte}</a>
    {/if}
  </div>
</div>

<style lang="scss">
  .marelle-etape {
    display: grid;
    row-gap: 32px;
    grid-template-areas: 'numero-etape'
      'contenu'
      'illustration';

    @include a-partir-de(desktop) {
      grid-template-areas: 'contenu numero-etape illustration';
      grid-template-columns: 1fr 136px 1fr;
      column-gap: 24px;
      row-gap: 24px;

      &.pair {
        grid-template-areas: 'illustration numero-etape contenu';
      }
    }

    &.pair {
      .numero-etape {
        justify-content: center;

        @include a-partir-de(desktop) {
          justify-content: end;
        }
      }
    }

    &.impair {
      .numero-etape {
        justify-content: center;

        @include a-partir-de(desktop) {
          justify-content: start;
        }
      }
    }

    .contenu {
      grid-area: contenu;

      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .numero-etape {
      grid-area: numero-etape;

      text-align: center;
      z-index: 1;

      display: flex;
      align-items: center;

      .encart-rond {
        width: 72px;
        height: 72px;

        background: $centre-aide-background-hover-lien;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: white;
          font-size: 40px;
          font-weight: bold;
        }

        @include a-partir-de(desktop) {
          width: 56px;
          height: 56px;

          span {
            font-size: 23px;
          }
        }
      }
    }
  }

  .illustration {
/*      width: 288px;
      height: 162px;

      @include a-partir-de(tablette) {
        width: 544px;
        height: 306px;
      }

      @include a-partir-de(desktop) {
        width: 380px;
        height: 214px;
      }*/

    img {
      width: 100%;
    }
  }

  .marelle-etape > div > h4 {
    margin: 0;

    font-size: 20px;
    line-height: 28px;

    @include a-partir-de(desktop) {
      font-size: 22px;
      line-height: 28px;
    }
  }

  .marelle-etape > div > p {
    margin: 0;

    font-size: 16px;
    line-height: 24px;

    @include a-partir-de(desktop) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .marelle-etape > div > p > b {
    color: $bouton-background-primaire;
  }

  .marelle-etape > div > a {
    color: $bouton-background-primaire;
  }
</style>
