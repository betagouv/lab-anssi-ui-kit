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
    {#each filtres as { icone, valeur: id, libelle } (id)}
      <label class="lab-anssi-filtres__element">
        <input
          type="radio"
          class="lab-anssi-filtres__input"
          name="filtres"
          value={id}
          checked={id === valeur}
          hidden
          onchange={() => handleFilterClick(id)}
        />
        <span class="lab-anssi-filtres__icone">
          {@html icone}
        </span>
        <span class="lab-anssi-filtres__libelle">{libelle}</span>
      </label>
    {/each}
  </div>
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/decisions";

  .lab-anssi-filtres {
    box-sizing: border-box;
    background: var(--filtres-bg, #ffffff);
    border: 1px solid var(--border-default-grey);
    border-radius: 4px;

    &__conteneur {
      display: flex;
      flex-direction: column;

      @include a-partir-de("tablette-grand") {
        flex-direction: row;
      }
    }

    &__element {
      align-items: center;
      color: var(--text-action-high-grey);
      cursor: pointer;
      display: flex;
      gap: 8px;
      padding: 7px;

      @include a-partir-de("tablette-grand") {
        flex-direction: column;
        flex: 1;
        gap: 0;
        padding: 15px 15px 23px;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--border-default-grey);

        @include a-partir-de("tablette-grand") {
          border-bottom: none;
          border-right: 1px solid var(--border-default-grey);
        }
      }

      &:hover {
        background-color: var(--background-default-grey-hover);
      }

      &:active {
        background-color: var(--background-default-grey-active);
      }

      &:has(input:checked) {
        background-color: var(--background-action-low-blue-france);
        color: var(--text-action-high-blue-france);

        &:hover {
          background-color: var(--background-action-low-blue-france-hover);
        }

        &:active {
          background-color: var(--background-action-low-blue-france-active);
        }
      }
    }

    &__icone {
      flex-shrink: 0;
      height: 42px;
      width: 42px;

      @include a-partir-de("tablette-grand") {
        height: 56px;
        margin: 0 auto;
        width: 56px;
      }

      :global(svg) {
        display: block;
        height: auto;
        max-width: 100%;
      }
    }

    &__libelle {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;

      @include a-partir-de("tablette-grand") {
        text-align: center;
      }
    }

    &--horizontal {
      @include a-partir-de("tablette-grand") {
        .lab-anssi-filtres {
          &__element {
            flex-direction: row;
            gap: 8px;
            justify-content: center;
            padding-block: 3px;
          }

          &__icone {
            margin: 0;
            height: 42px;
            width: 42px;
          }

          &__libelle {
            font-size: 14px;
            gap: 8px;
            text-align: left;
          }
        }
      }
    }
  }
</style>
