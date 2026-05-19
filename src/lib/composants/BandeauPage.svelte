<svelte:options
  customElement={{
    tag: "lab-anssi-bandeau-page",
    props: {
      titre: { attribute: "titre", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      description: { attribute: "description", type: "String" },
      actions: { attribute: "actions", type: "Object" },
      mention: { attribute: "mention", type: "String" },
      inverse: { attribute: "inverse", type: "Boolean" },
      urlImage: { attribute: "url-image", type: "String" },
      sansImage: { attribute: "sans-image", type: "Boolean" },
      avecFilAriane: { attribute: "avec-fil-ariane", type: "Boolean" },
      liensFilAriane: { attribute: "liens-fil-ariane", type: "Array" },
      simple: { attribute: "simple", type: "Boolean" },
      ficheCatalogue: { attribute: "fiche-catalogue", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import DsfrBreadcrumb from "$lib/dsfr/DsfrBreadcrumb.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  type BreadcrumbSegment = {
    id: string;
    label: string;
    href: string;
  };

  interface Props {
    titre: string;
    baliseTitre: string;
    description: string;
    mention: string;
    inverse?: boolean;
    urlImage?: string | undefined;
    sansImage?: boolean;
    avecFilAriane?: boolean;
    liensFilAriane?: BreadcrumbSegment[];
    simple?: boolean;
    ficheCatalogue?: boolean;
  }

  let {
    titre,
    baliseTitre = "h1",
    description,
    mention,
    inverse = false,
    urlImage,
    sansImage = false,
    avecFilAriane = false,
    liensFilAriane = [],
    simple = false,
    ficheCatalogue = false,
  }: Props = $props();
</script>

<section
  class={[
    "lab-anssi-bandeau-page",
    {
      "lab-anssi-bandeau-page--inverse": inverse,
      "lab-anssi-bandeau-page--sans-image": sansImage,
      "lab-anssi-bandeau-page--avec-filariane": avecFilAriane,
      "lab-anssi-bandeau-page--simple": simple,
      "lab-anssi-bandeau-page--fiche-catalogue": ficheCatalogue,
    },
  ]}
>
  <DsfrContainer>
    {#if avecFilAriane}
      <DsfrBreadcrumb
        id="breadcrumb-hero"
        segments={liensFilAriane}
        buttonAriaLabel="vous êtes ici :"
        buttonLabel="Voir le fil d'Ariane"
        inverse={!inverse}
        hasMarginVariant
      />
    {/if}

    <div class="lab-anssi-bandeau-page__conteneur">
      <div class="lab-anssi-bandeau-page__principal">
        {#if $$slots.badgesgroup}
          <slot name="badgesgroup" />
        {/if}

        <svelte:element this={baliseTitre} class="lab-anssi-bandeau-page__titre">
          {titre}
        </svelte:element>

        <p class="lab-anssi-bandeau-page__description">{description}</p>

        {#if $$slots.buttonsgroup && !simple}
          <div class="lab-anssi-bandeau-page__actions">
            <slot name="buttonsgroup" />
          </div>
        {/if}

        {#if mention}
          <p class="lab-anssi-bandeau-page__mention">{mention}</p>
        {/if}
      </div>

      {#if !sansImage && !simple}
        <div class="lab-anssi-bandeau-page__secondaire">
          <figure class="lab-anssi-bandeau-page__illustration">
            <img src={urlImage} class="lab-anssi-bandeau-page__image" alt="" />
          </figure>
        </div>
      {/if}
    </div>
  </DsfrContainer>
</section>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  :host {
    display: block;
    background-color: transparent;
    box-sizing: border-box;
  }

  .lab-anssi-bandeau-page {
    --background-color: var(--artwork-major-blue-france);
    --text-color-titre: var(--text-inverted-grey);
    --text-color-description: var(--text-inverted-grey);

    background-color: var(--background-color);

    &,
    & * {
      box-sizing: border-box;
    }

    &__conteneur {
      padding-block: 48px;

      @include respond-from("md") {
        display: flex;
        align-items: center;
        margin: -0.75rem;
        padding-block: 36px;
      }
    }

    &__principal,
    &__secondaire {
      @include respond-from("md") {
        flex: 0 0 50%;
        max-width: 50%;
        width: 50%;
        padding: 0.75rem;
      }
    }

    &__principal {
      @include respond-to("sm") {
        margin-block-end: 40px;
      }
    }

    &__titre {
      color: var(--text-color-titre);
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      margin-block: 0 12px;

      @include respond-from("md") {
        font-size: 48px;
        line-height: 56px;
      }
    }

    &__description {
      color: var(--text-color-description);
      font-size: 18px;
      line-height: 28px;
      margin-block: 0;

      &:not(:last-child) {
        margin-block-end: 24px;
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: 16px;

      @include respond-from("md") {
        flex-direction: row;
      }
    }

    &__mention {
      color: var(--text-color-description);
      font-size: 14px;
      line-height: 24px;
      margin-block: 0;
    }

    &__illustration {
      margin: 0;
    }

    &__image {
      display: block;
      max-width: 100%;
    }

    // Variation "Inversé"
    &--inverse {
      --background-color: var(--background-alt-blue-france);
      --text-color-titre: var(--text-title-grey);
      --text-color-description: var(--text-default-grey);
    }

    // Variation "Avec Fil d'Ariane"
    &--avec-filariane {
      --dsfr-breadcrumb-margin: 0 0 24px 0;

      padding-block-start: 16px;

      .lab-anssi-bandeau-page {
        &__conteneur {
          padding-block-start: 0;
        }
      }
    }

    // Variation "Fiche Catalogue"
    &--fiche-catalogue {
      .lab-anssi-bandeau-page {
        &__conteneur,
        &__secondaire {
          padding-block-end: 0;
        }
      }
    }

    // Variation "Simple"
    &--simple {
      --dsfr-breadcrumb-margin: 0 0 16px 0;

      .lab-anssi-bandeau-page {
        &__conteneur {
          padding-block-end: 12px;
        }

        &__principal {
          flex: 0 0 100%;
          max-width: 100%;
          width: 100%;
        }
      }

      &:not(.lab-anssi-bandeau-page--avec-filariane) {
        .lab-anssi-bandeau-page__conteneur {
          padding-block-start: 12px;
        }
      }
    }
  }
</style>
