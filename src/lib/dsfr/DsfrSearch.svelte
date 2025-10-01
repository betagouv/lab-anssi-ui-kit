<svelte:options
  customElement={{
    tag: "dsfr-search",
    props: {
      inputId: { attribute: "input-id", type: "String" },
      inputLabel: { attribute: "input-label", type: "String" },
      buttonLabel: { attribute: "button-label", type: "String" },
      buttonTitle: { attribute: "button-title", type: "String" },
      size: { attribute: "size", type: "String" },
      inputPlaceholder: { attribute: "input-placeholder", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  type SearchSize = Extract<Size, "md" | "lg">;
  interface Props {
    /** Attribut 'id' de l'input */
    inputId: string;
    /** Libellé de l'input */
    inputLabel: string;
    /** Libellé du bouton */
    buttonLabel: string;
    /** Titre du bouton */
    buttonTitle: string;
    /** Taille de la barre de recherche (défaut: md) */
    size?: SearchSize;
    /** Placeholder de l'input */
    inputPlaceholder?: string;
    /** Valeur initiale du champs de saisie */
    value?: string;
  }

  const dispatch = createEventDispatcher();

  let {
    inputId,
    inputLabel,
    buttonLabel,
    buttonTitle,
    size = "md",
    inputPlaceholder,
    value = $bindable(),
  }: Props = $props();

  const sizeClass = $derived(`fr-search-bar--${size}`);

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }
</script>

<div class={["fr-search-bar", sizeClass]} role="search">
  {#if inputLabel}
    <label class="fr-label" for={inputId}> {inputLabel} </label>
  {/if}
  <input
    type="search"
    id={inputId}
    class="fr-input"
    bind:value
    placeholder={inputPlaceholder}
    oninput={handleInput}
  />

  <button title={buttonTitle} type="button" class="fr-btn">
    {buttonLabel}
  </button>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/search/search.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("search-bar");
</style>
