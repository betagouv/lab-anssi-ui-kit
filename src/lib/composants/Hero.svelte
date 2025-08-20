<svelte:options
  customElement={{
    tag: "lab-anssi-hero",
    props: {
      titre: { attribute: "titre", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      description: { attribute: "description", type: "String" },
      actions: { attribute: "actions", type: "Object" },
      inverse: { attribute: "inverse", type: "Boolean" },
      urlImage: { attribute: "url-image", type: "String" },
      sansImage: { attribute: "sans-image", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Snippet } from "svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  interface Props {
    titre: string;
    baliseTitre: string;
    description: string;
    actions?: Snippet<[any]>;
    inverse?: boolean;
    urlImage?: string | undefined;
    sansImage?: boolean;
  }

  let {
    titre,
    baliseTitre = "h1",
    description,
    inverse = false,
    actions,
    urlImage,
    sansImage = false,
  }: Props = $props();
</script>

<section
  class={[
    "lab-anssi-hero",
    { "lab-anssi-hero--inverse": inverse },
    { "lab-anssi-hero--sans-image": sansImage },
  ]}
>
  <DsfrContainer>
    <div class="lab-anssi-hero__conteneur">
      <div class="lab-anssi-hero__principal">
        <svelte:element this={baliseTitre} class="lab-anssi-hero__titre">
          {titre}
        </svelte:element>
        <p class="lab-anssi-hero__description">{description}</p>

        {#if actions}
          <div class="lab-anssi-hero__actions">
            {@render actions()}
          </div>
        {/if}
      </div>

      {#if !sansImage}
        <div class="lab-anssi-hero__aside">
          <figure class="lab-anssi-hero__figure">
            <img src={urlImage} class="lab-anssi-hero__image" alt="" />
          </figure>
        </div>
      {/if}
    </div>
  </DsfrContainer>
</section>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/_decisions.scss";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-hero {
    --background-color: var(--artwork-major-blue-france);
    --text-color-titre: var(--text-inverted-grey);
    --text-color-description: var(--text-inverted-grey);

    background-color: var(--background-color);

    &__conteneur {
      padding-block: 48px;

      @include respond-from("md") {
        display: flex;
        align-items: center;
        gap: 24px;
      }
    }

    &__principal {
      @include respond-to("sm") {
        margin-block-end: 32px;
      }
    }

    &__titre {
      color: var(--text-color-titre);
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      margin-block: 0 8px;
    }

    &__description {
      color: var(--text-color-description);
      font-size: 20px;
      line-height: 32px;
      margin-block: 0;

      &:not(:last-child) {
        margin-block-end: 32px;
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

    &__figure {
      margin: 0;
      max-width: 588px;
    }

    &__image {
      max-width: 100%;
    }

    // Variation "Inversé"
    &--inverse {
      --background-color: var(--background-contrast-blue-france);
      --text-color-titre: var(--text-title-blue-france);
      --text-color-description: var(--text-default-grey);
    }

    // Variation "Avec Image"
    &--sans-image {
      .lab-anssi-hero {
        &__conteneur {
          justify-content: center;
          padding-block: 72px;
          text-align: center;
        }

        &__titre {
          margin-block-end: 16px;
        }
      }
    }
  }
</style>
