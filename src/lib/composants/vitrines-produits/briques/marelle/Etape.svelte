<svelte:options
  customElement={{
    tag: "lab-anssi-marelle-etape",
    props: {
      index: { attribute: "index", type: "Number" },
      etapeMarelle: { attribute: "etape-marelle", type: "Object" },
    },
  }}
/>

<script lang="ts">
  import type { EtapeMarelle } from "$lib/types";
  import LienExterne from "$lib/composants/icones/LienExterne.svelte";

  interface Props {
    index: number;
    etapeMarelle: EtapeMarelle;
  }

  let { index, etapeMarelle }: Props = $props();

  const pair = (index + 1) % 2 === 0;
</script>

<div class="marelle-etape" class:marelle-etape--pair={pair} class:marelle-etape--impair={!pair}>
  <div class="illustration">
    <img src={etapeMarelle.illustration.lien} alt={etapeMarelle.illustration.alt} />
  </div>
  <div class="numero-etape">
    <div class="encart-rond">
      <span>{index + 1}</span>
    </div>
  </div>
  <div class="contenu">
    <slot name="etape-titre">
      <h4>{etapeMarelle.titre}</h4>
    </slot>
    <slot name="etape-description">
      <p>{etapeMarelle.description}</p>
    </slot>
    {#if etapeMarelle.lien}
      <slot name="etape-lien">
        <a href={etapeMarelle.lien.href} target={etapeMarelle.lien.target}>
          {etapeMarelle.lien.texte}
          {#if etapeMarelle.lien.target === "_blank"}
            <LienExterne />
          {/if}
        </a>
      </slot>
    {/if}
  </div>
</div>

<style lang="scss">
  .marelle-etape {
    display: grid;
    row-gap: 32px;
    grid-template-areas:
      "numero-etape"
      "contenu"
      "illustration";

    @include a-partir-de(desktop) {
      grid-template-areas: "contenu numero-etape illustration";
      grid-template-columns: 1fr 136px 1fr;
      column-gap: 24px;
      row-gap: 24px;

      &.marelle-etape--pair {
        grid-template-areas: "illustration numero-etape contenu";
      }
    }

    &.marelle-etape--pair {
      .numero-etape {
        padding-right: 16px;
        justify-content: center;

        @include a-partir-de(desktop) {
          justify-content: end;
        }
      }
    }

    &.marelle-etape--impair {
      .numero-etape {
        padding-left: 16px;
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
      justify-content: center;
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

        background: $brique-marelle-etapes-numero-etape-couleur;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: #ffffff;
          font-size: 2rem;
          font-weight: bold;
          padding-bottom: 4px;

          @include a-partir-de(desktop) {
            font-size: 2.5rem;
          }
        }
      }
    }
  }

  .illustration {
    img {
      width: 100%;
    }
  }

  .marelle-etape > div > h4 {
    margin: 0;

    font-size: 1.25rem;
    line-height: 28px;

    @include a-partir-de(desktop) {
      font-size: 1.375rem;
      line-height: 28px;
    }
  }

  .marelle-etape > div > p {
    margin: 0 0 8px 0;

    font-size: 1rem;
    line-height: 24px;

    @include a-partir-de(desktop) {
      font-size: 1rem;
      line-height: 24px;
    }
  }

  .marelle-etape > div > a {
    position: relative;
    width: fit-content;
    color: $brique-marelle-etapes-lien-couleur;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    text-decoration: none;

    &:hover {
      &:after {
        bottom: -1px;
        height: 2px;
      }
    }

    &:after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 100%;
      height: 1px;
      background: $brique-marelle-etapes-lien-couleur;
    }
  }
</style>
