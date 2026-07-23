<svelte:options
  customElement={{
    tag: "lab-anssi-marelle-etape",
    props: {
      index: { attribute: "index", type: "Number" },
      etapeMarelle: { attribute: "etape-marelle", type: "Object" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { EtapeMarelle } from "$lib/types";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  interface Props {
    /** Index de l'étape */
    index: number;
    /** Contenu de l'étape */
    etapeMarelle?: EtapeMarelle;
    /** Balise Hn du titre des étapes */
    baliseTitre?: "h3" | "h4" | "h5";
  }

  let { index, etapeMarelle, baliseTitre = "h4" }: Props = $props();

  const pair = $derived((index + 1) % 2 === 0);
</script>

<div
  class="lab-anssi-marelle-etape marelle-etape"
  class:lab-anssi-marelle-etape--pair={pair}
  class:lab-anssi-marelle-etape--impair={!pair}
>
  <div class="lab-anssi-marelle-etape__illustration">
    <slot name="etape-illustration">
      {#if etapeMarelle?.illustration}
        <img
          src={etapeMarelle.illustration.lien}
          alt={etapeMarelle.illustration.alt}
          class="lab-anssi-marelle-etape__image"
        />
      {/if}
    </slot>
  </div>

  <div class="lab-anssi-marelle-etape__numero">
    <span>
      <span class="lab-anssi-marelle-etape__rond">
        {index + 1}
      </span>
    </span>
  </div>

  <article class="lab-anssi-marelle-etape__contenu">
    <slot name="etape-titre">
      {#if etapeMarelle?.titre}
        <svelte:element this={baliseTitre} class="lab-anssi-marelle-etape__titre">
          {etapeMarelle.titre}
        </svelte:element>
      {/if}
    </slot>

    <slot name="etape-description">
      {#if etapeMarelle?.description}
        <div class="lab-anssi-marelle-etape__description">
          <p>{etapeMarelle.description}</p>
        </div>
      {/if}
    </slot>

    <slot name="etape-lien">
      {#if etapeMarelle?.lien}
        <DsfrLink
          label={etapeMarelle.lien.texte}
          href={etapeMarelle.lien.href}
          blank={etapeMarelle.lien.target === "_blank" ? true : undefined}
        />
      {/if}
    </slot>
  </article>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";

  :host(lab-anssi-marelle-etape) {
    display: block;
    box-sizing: border-box;
  }

  .lab-anssi-marelle-etape {
    &,
    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    display: flex;
    flex-direction: column;
    gap: rem(32px);

    @include respond-from("md") {
      align-items: center;
      flex-direction: row;
      gap: rem(24px);
      justify-content: center;
    }

    &__illustration {
      @include respond-to("md") {
        order: 1;
      }
    }

    &__image {
      display: block;
      margin: 0;
      max-width: 100%;
      height: auto;
    }

    &__numero {
      text-align: center;

      @include respond-from("md") {
        flex: 0 0 calc(200% / 12);
        width: calc(200% / 12);
        max-width: calc(200% / 12);

        text-align: right;

        & > span {
          padding-inline: rem(16px);
        }
      }
    }

    &__rond {
      background-color: $brique-marelle-etapes-numero-etape-couleur;
      border-radius: 50%;
      color: var(--text-inverted-grey, #ffffff);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: rem(40px);
      font-style: normal;
      font-weight: 700;
      line-height: rem(48px);
      height: rem(72px);
      width: rem(72px);
    }

    &__illustration,
    &__contenu {
      @include respond-from("md") {
        flex: 0 0 calc(400% / 12);
        width: calc(400% / 12);
        max-width: calc(400% / 12);
      }
    }

    &__titre {
      color: var(--text-title-grey, #161616);
      font-size: rem(22px);
      font-weight: 700;
      line-height: rem(28px);
      margin-block: 0 rem(8px);
    }

    &__description {
      font-size: rem(16px);
      line-height: rem(24px);
      margin-block-end: rem(16px);

      p {
        margin-block: 0;
      }
    }

    &--impair {
      @include respond-from("md") {
        flex-direction: row-reverse;
      }

      .lab-anssi-marelle-etape {
        &__numero {
          @include respond-from("md") {
            text-align: left;
          }
        }
      }
    }
  }
</style>
