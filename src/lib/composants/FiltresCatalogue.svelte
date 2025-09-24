<svelte:options
  customElement={{
    tag: "lab-anssi-filtres",
    props: {
      filtres: { attribute: "filtres", type: "Array" },
      horizontal: { attribute: "horizontal", type: "Boolean" },
      valeur: { attribute: "valeur", type: "String" },
    },
  }}
/>

<script lang="ts">
  type Filtre = { icone: string; libelle: string; valeur: string };

  interface Props {
    filtres: Filtre[];
    horizontal?: boolean;
    valeur?: string;
  }

  let { filtres, horizontal = false, valeur = "" }: Props = $props();

  function handleFilterClick(nouvelleValeur: string) {
    if (valeur === nouvelleValeur) return;
    valeur = nouvelleValeur;
    $host().dispatchEvent(new CustomEvent("valeurachangee", { detail: nouvelleValeur }));
  }
</script>

<div class={["lab-anssi-filtres", { "lab-anssi-filtres--horizontal": horizontal }]}>
  <div class="lab-anssi-filtres__conteneur">
    {#each filtres as { icone: icon, valeur: id, libelle: label } (id)}
      <button
        class="lab-anssi-filtres__item"
        class:active={id === valeur}
        onclick={() => handleFilterClick(id)}
      >
        <div class="lab-anssi-filtres__icon">
          {@html icon}
        </div>
        <span class="lab-anssi-filtres__label">{label}</span>
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/decisions";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  .lab-anssi-filtres {
    box-sizing: border-box;
    background: var(--filtres-bg, #ffffff);
    border-radius: 4px;

    &__conteneur {
      display: flex;
      gap: 0;

      @include respond-to("sm") {
        overflow-x: auto;
      }
    }

    &__item {
      @include reset-bouton();

      flex: 1;
      border: 1px solid var(--border-default-grey);
      padding: 16px 24px 24px;

      // Font properties
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      text-decoration: none;

      &:not(:last-child) {
        border-right: none;
      }

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &:hover {
        background-color: var(--background-alt-grey);
      }

      &:active {
        background-color: var(--background-default-grey-active);
      }

      &:focus-visible {
        @include set-focus();
      }

      // Modifier pour l'élément actif
      &.active {
        background-color: var(--background-action-low-blue-france);

        &:hover {
          background-color: var(--background-action-low-blue-france-hover);
        }

        &:active {
          background-color: var(--background-action-low-blue-france-active);
        }
      }
    }

    &__icon,
    &__label {
      cursor: pointer;
    }

    &__icon {
      margin: 0 auto;
      width: 56px;
      height: 56px;

      :global(svg) {
        max-width: 100%;
        height: auto;
        display: block;
      }
    }

    &--horizontal {
      .lab-anssi-filtres {
        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-block: 8px;
          gap: 8px;
        }

        &__icon {
          margin: 0;
          height: 42px;
          width: 42px;
        }
      }
    }
  }
</style>
