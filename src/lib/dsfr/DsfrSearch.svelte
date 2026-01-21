<svelte:options
  customElement={{
    tag: "dsfr-search",
    props: {
      inputId: { attribute: "input-id", type: "String" },
      inputLabel: { attribute: "input-label", type: "String" },
      buttonLabel: { attribute: "button-label", type: "String" },
      buttonTitle: { attribute: "button-title", type: "String" },
      size: { attribute: "size", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      disabled: { attribute: "disabled", type: "Boolean" },
      form: { attribute: "form", type: "String" },
      maxlength: { attribute: "maxlength", type: "Number" },
      minlength: { attribute: "minlength", type: "Number" },
      name: { attribute: "name", type: "String" },
      pattern: { attribute: "pattern", type: "String" },
      readonly: { attribute: "readonly", type: "Boolean" },
      required: { attribute: "required", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";
  import { createEventDispatcher } from "svelte";

  setThemeable($host());

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
    placeholder?: string;
    /** Valeur initiale du champs de saisie */
    value?: string;
    /** Désactive le champ de saisie */
    disabled?: boolean;
    /** Attribut form du composant */
    form?: string;
    /** Longueur maximale du champ de saisie */
    maxlength?: number;
    /** Longueur minimale du champ de saisie */
    minlength?: number;
    /** Attribut name du composant */
    name?: string;
    /** Attribut pattern du composant */
    pattern?: string;
    /** Rend le champ de saisie en lecture seule */
    readonly?: boolean;
    /** Rend le champ de saisie obligatoire */
    required?: boolean;
  }

  const dispatch = createEventDispatcher();

  let {
    inputId,
    inputLabel,
    buttonLabel,
    buttonTitle,
    size = "md",
    placeholder,
    value = $bindable(),
    disabled,
    form,
    maxlength,
    minlength,
    name,
    pattern,
    readonly,
    required,
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
    {placeholder}
    oninput={handleInput}
    {disabled}
    {form}
    {maxlength}
    {minlength}
    {name}
    {pattern}
    {readonly}
    {required}
  />

  <button title={buttonTitle} type="button" class="fr-btn" {disabled}>
    {buttonLabel}
  </button>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/search/search.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("search-bar");
</style>
