<svelte:options
  customElement={{
    tag: "lab-anssi-filtres",
    props: {
      elements: { attribute: "elements", type: "Array" },
      filtres: { attribute: "filtres", type: "Array" },
      horizontal: { attribute: "horizontal", type: "Boolean" },
      elementActif: { attribute: "element-actif", type: "String" },
      valeur: { attribute: "valeur", type: "String" },
      type: { attribute: "type", type: "String" },
    },
  }}
/>

<script lang="ts">
  type ElementFiltre = {
    icone: string;
    libelle: string;
    valeur: string;
    description?: string;
    href?: string;
  };

  interface Props {
    /** Variante d'affichage : `"filtres"` pour des radio buttons, `"liens"` pour des ancres. */
    type?: "filtres" | "liens";
    /** Liste des éléments à afficher (liens ou filtres). */
    elements?: ElementFiltre[];
    /** Valeur de l'élément actif (correspond à `ElementFiltre.valeur`). */
    elementActif?: string;
    /** Affiche les éléments sur une seule ligne en mode desktop. */
    horizontal?: boolean;
    /** Callback appelé lors du changement d'élément actif. */
    onvaleurachangee?: (valeur: string) => void;
    /** @deprecated Utiliser `elements` à la place. */
    filtres?: ElementFiltre[];
    /** @deprecated Utiliser `elementActif` à la place. */
    valeur?: string;
  }

  let {
    elements = [],
    filtres,
    horizontal = false,
    elementActif = "",
    valeur,
    onvaleurachangee,
    type = "filtres",
  }: Props = $props();

  const elementsEffectifs = $derived(filtres ?? elements);
  const elementActifEffectif = $derived(valeur ?? elementActif);

  function handleFilterClick(nouvelleValeur: string) {
    if (elementActifEffectif === nouvelleValeur) return;
    elementActif = nouvelleValeur;
    onvaleurachangee?.(nouvelleValeur);
    $host()?.dispatchEvent(
      new CustomEvent("valeurachangee", { detail: nouvelleValeur, bubbles: true }),
    );
  }

  const avecDescription = $derived(elementsEffectifs.some((element) => !!element.description));
</script>

<div
  class={[
    "lab-anssi-filtres",
    {
      "lab-anssi-filtres--horizontal": horizontal,
      "lab-anssi-filtres--avec-description": avecDescription,
    },
  ]}
>
  <div class="lab-anssi-filtres__conteneur">
    <slot>
      {#each elementsEffectifs as filtre (filtre.valeur)}
        <div
          class={["lab-anssi-filtres__element", { actif: filtre.valeur === elementActifEffectif }]}
        >
          <span class="lab-anssi-filtres__icone">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html filtre.icone}
          </span>

          <div class="lab-anssi-filtres__contenu">
            {#if type === "filtres"}
              <label class="lab-anssi-filtres__libelle">
                {filtre.libelle}
                <input
                  type="radio"
                  class="lab-anssi-filtres__input"
                  name="filtres"
                  value={filtre.valeur}
                  checked={filtre.valeur === elementActifEffectif}
                  hidden
                  onchange={() => handleFilterClick(filtre.valeur)}
                />
              </label>
            {:else if type === "liens"}
              <p class="lab-anssi-filtres__libelle">
                <a
                  href={filtre.href ?? "#"}
                  class="lab-anssi-filtres__lien"
                  aria-current={filtre.valeur === elementActifEffectif ? "page" : undefined}
                >
                  {filtre.libelle}
                </a>
              </p>
            {/if}
            {#if filtre.description}
              <p class="lab-anssi-filtres__description">
                {filtre.description}
              </p>
            {/if}
          </div>
        </div>
      {/each}
    </slot>
  </div>
</div>

<style lang="scss">
  @mixin enlarge() {
    &::after {
      content: "";
      position: absolute;
      inset: 0;
    }
  }

  .lab-anssi-filtres {
    box-sizing: border-box;
    background-color: var(--filtres-bg, var(--background-raised-grey, #ffffff));
    filter: drop-shadow(var(--raised-shadow));

    &__conteneur {
      display: flex;
      flex-direction: column;

      @include a-partir-de("tablette-grand") {
        flex-direction: row;
      }
    }

    &__element {
      --element-min-height: #{rem(58px)};
      --element-gap: #{rem(8px)};

      align-items: center;
      box-sizing: border-box;
      color: var(--text-action-high-grey);
      display: flex;
      gap: var(--element-gap);
      min-height: var(--element-min-height);
      padding: rem(8px) rem(8px) rem(8px) rem(12px);
      position: relative;

      @include a-partir-de("tablette-grand") {
        --element-min-height: #{rem(136px)};
        --element-gap: 0;

        flex-direction: column;
        flex: 1;
        padding: rem(16px) 0 0;
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

      &.actif,
      &:has(input:checked) {
        box-shadow: inset 0 -4px 0 var(--border-action-high-blue-france, #000091);
      }
    }

    &__icone {
      --taille-icone: #{rem(42px)};

      flex-shrink: 0;
      height: var(--taille-icone);
      width: var(--taille-icone);

      @include a-partir-de("tablette-grand") {
        --taille-icone: #{rem(64px)};

        margin: 0 auto rem(4px);
      }

      :global(svg) {
        display: block;
        height: auto;
        max-width: 100%;
      }
    }

    &__libelle {
      --libelle-margin: #{rem(2px)};

      display: block;
      font-weight: 700;
      font-size: rem(18px);
      line-height: rem(28px);
      margin: 0;

      &:not(:last-child) {
        margin-block-end: var(--libelle-margin);
      }

      @include a-partir-de("tablette-grand") {
        --libelle-margin: #{rem(8px)};

        text-align: center;
      }
    }

    @at-root label.lab-anssi-filtres__libelle {
      @include enlarge();
    }

    &__lien {
      @include enlarge();

      color: inherit;
      text-decoration: none;
    }

    &__description {
      color: var(--text-default-grey);
      display: block;
      font-size: rem(14px);
      line-height: rem(24px);
      margin: 0;
    }

    &--avec-description {
      .lab-anssi-filtres {
        &__element {
          --element-min-height: #{rem(70px)};

          @include a-partir-de("tablette-grand") {
            --element-min-height: #{rem(168px)};

            padding-block-end: rem(24px);
          }
        }
      }
    }

    &--horizontal {
      @include a-partir-de("tablette-grand") {
        .lab-anssi-filtres {
          &__element {
            --element-gap: #{rem(8px)};
            --element-min-height: auto;

            min-height: auto;
            justify-content: center;
            padding-block: rem(3px);
          }

          &__icone {
            --taille-icone: #{rem(42px)};

            margin: 0;
          }

          &__libelle {
            font-size: rem(14px);
            gap: rem(8px);
            text-align: left;
          }
        }
      }
    }
  }
</style>
