<svelte:options
  customElement={{
    tag: "lab-anssi-bandeau-page",
    props: {
      titre: { attribute: "titre", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      description: { attribute: "description", type: "String" },
      mention: { attribute: "mention", type: "String" },
      urlImage: { attribute: "url-image", type: "String" },
      sansImage: { attribute: "sans-image", type: "Boolean" },
      avecFilAriane: { attribute: "avec-fil-ariane", type: "Boolean" },
      liensFilAriane: { attribute: "liens-fil-ariane", type: "Array" },
      type: { attribute: "type", type: "String" },
      theme: { attribute: "theme", type: "String" },
      inverse: { attribute: "inverse", type: "Boolean" },
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
    /** Titre du bandeau */
    titre?: string;
    /** Balise HTML (Hn) du titre */
    baliseTitre?: string;
    /** Description du bandeau */
    description?: string;
    /** Mention du bandeau */
    mention?: string;
    /** Url de l'image */
    urlImage?: string | undefined;
    /** Si "vrai", l'image n'est pas affichée */
    sansImage?: boolean;
    /** Si "vrai", le fil d'Ariane est affiché */
    avecFilAriane?: boolean;
    /** Segments du fil d'Ariane */
    liensFilAriane?: BreadcrumbSegment[];
    /** Type du bandeau */
    type?: "default" | "fiche" | "simple";
    /** Thème du bandeau */
    theme?: "clair" | "sombre";
    /** Inversion du thème _(déprécié - préférer l'utilisation de la prop ``theme="inverse"``)_ */
    inverse?: boolean;
    /** Variation "Simple" _(déprécié - préférer l'utilisation de la prop ``type="simple"``)_ */
    simple?: boolean;
    /** Variation "Fiche Catalogue" _(déprécié - préférer l'utilisation de la prop ``type="fiche"``)_ */
    ficheCatalogue?: boolean;
  }

  let {
    titre,
    baliseTitre = "h1",
    description,
    mention,
    urlImage,
    sansImage = false,
    avecFilAriane = false,
    liensFilAriane = [],
    type = "default",
    theme,
    inverse = false,
    simple = false,
    ficheCatalogue = false,
  }: Props = $props();

  const variationSimple = $derived(type === "simple" || simple);
  const variationFiche = $derived(type === "fiche" || ficheCatalogue);
  const themeClair = $derived(theme === "clair" || inverse);
</script>

<section
  class={[
    "lab-anssi-bandeau-page",
    {
      "lab-anssi-bandeau-page--clair": themeClair,
      "lab-anssi-bandeau-page--sans-image": sansImage,
      "lab-anssi-bandeau-page--avec-filariane": avecFilAriane,
      "lab-anssi-bandeau-page--simple": variationSimple,
      "lab-anssi-bandeau-page--fiche-catalogue": variationFiche,
      "lab-anssi-bandeau-page--avec-actions": $$slots.buttonsgroup,
      "lab-anssi-bandeau-page--avec-mention": mention || $$slots.mention,
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
        inverse={!themeClair}
        hasMarginVariant
      />
    {/if}

    <div class="lab-anssi-bandeau-page__conteneur">
      <div class="lab-anssi-bandeau-page__principal">
        {#if $$slots.badgesgroup}
          <slot name="badgesgroup" />
        {/if}

        <slot name="titre">
          <svelte:element this={baliseTitre} class="lab-anssi-bandeau-page__titre">
            {titre}
          </svelte:element>
        </slot>

        <slot name="description">
          <p class="lab-anssi-bandeau-page__description">
            {description}
          </p>
        </slot>

        {#if $$slots.buttonsgroup && !variationSimple}
          <div class="lab-anssi-bandeau-page__actions">
            <slot name="buttonsgroup" />
          </div>
        {/if}

        {#if mention || $$slots.mention}
          <slot name="mention">
            <p class="lab-anssi-bandeau-page__mention">
              {mention}
            </p>
          </slot>
        {/if}
      </div>

      {#if !sansImage && !variationSimple}
        <div class="lab-anssi-bandeau-page__secondaire">
          <slot name="media">
            <figure class="lab-anssi-bandeau-page__illustration">
              <img src={urlImage} class="lab-anssi-bandeau-page__image" alt="" />
            </figure>
          </slot>
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
    background-color: var(--background-color, var(--artwork-major-blue-france));

    &,
    & * {
      box-sizing: border-box;
    }

    &__conteneur {
      padding-block: rem(48px);

      @include respond-from("lg") {
        display: flex;
        align-items: center;
        margin-inline: rem(-12px);
        padding-block: rem(36px);
      }
    }

    &__principal,
    &__secondaire {
      @include respond-from("lg") {
        flex: 0 0 50%;
        max-width: 50%;
        width: 50%;
        padding: rem(12px);
      }
    }

    &__principal {
      @include respond-to("md") {
        padding-block-end: var(--spacing-block-end, rem(40px));
      }
    }

    &__titre,
    :global(::slotted([slot="titre"])) {
      color: var(--text-color-titre, var(--text-inverted-grey));
      font-weight: 700;
      font-size: rem(40px);
      line-height: rem(48px);
      margin-block: 0 rem(12px);
    }

    &__description,
    :global(::slotted([slot="description"])) {
      color: var(--text-color-description, var(--text-inverted-grey));
      font-size: rem(18px);
      line-height: rem(28px);
      margin-block: var(--description-margin-block, 0);
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: rem(16px);

      @include respond-from("lg") {
        flex-direction: row;
      }
    }

    &__mention,
    :global(::slotted([slot="mention"])) {
      color: var(--text-color-description, var(--text-inverted-grey));
      font-size: rem(14px);
      line-height: rem(24px);
      margin-block: 0;
    }

    &__illustration {
      margin: 0;
    }

    &__image {
      display: block;
      max-width: 100%;
    }

    // Variation "Clair"
    &--clair {
      --text-color-titre: var(--text-title-grey);
      --text-color-description: var(--text-default-grey);

      background-color: var(--background-color, var(--background-contrast-blue-france));
    }

    // Variation "Avec Fil d'Ariane"
    &--avec-filariane {
      --dsfr-breadcrumb-margin: 0 0 rem(24px) 0;

      padding-block-start: rem(16px);

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

        &__principal {
          --spacing-block-end: #{rem(32px)};
        }

        &__secondaire {
          align-self: flex-end;
        }
      }
    }

    // Variation "Simple"
    &--simple {
      --dsfr-breadcrumb-margin: 0 0 rem(16px) 0;

      .lab-anssi-bandeau-page {
        &__conteneur {
          padding-block-end: rem(12px);
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

    // Variation "Sans image"
    &--sans-image:not(.lab-anssi-bandeau-page--simple) {
      --spacing-block-end: 0;
    }

    &--avec-actions,
    &--avec-mention {
      --description-margin-block: 0 #{rem(24px)};
    }
  }
</style>
