<svelte:options
  customElement={{
    tag: "dsfr-search",
    props: {
      inputId: { attribute: "input-id", type: "String" },
      inputLabel: { attribute: "input-label", type: "String" },
      buttonLabel: { attribute: "button-label", type: "String" },
      buttonTitle: { attribute: "button-title", type: "String" },
      buttonType: { attribute: "button-type", type: "String" },
      size: { attribute: "size", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      form: { attribute: "form", type: "String", reflect: true },
      maxlength: { attribute: "maxlength", type: "Number" },
      minlength: { attribute: "minlength", type: "Number" },
      name: { attribute: "name", type: "String", reflect: true },
      pattern: { attribute: "pattern", type: "String" },
      readonly: { attribute: "readonly", type: "Boolean" },
      required: { attribute: "required", type: "Boolean" },
      labelSize: { attribute: "label-size", type: "String" },
      labelWeight: { attribute: "label-weight", type: "String" },
    },
    extend: (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }
      };
    },
  }}
/>

<script lang="ts">
  import type { Size, TextSize, TextWeight } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";

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
    /** Type du bouton */
    buttonType: "button" | "submit";
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
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Callback appelé lors du changement de valeur du champ de recherche */
    onvaluechanged?: (value: string) => void;
    /** Callback appelé lors de la soumission de la recherche */
    onsearch?: (value: string) => void;
    /** Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur le label */
    labelSize?: TextSize;
    /** Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur le label */
    labelWeight?: TextWeight;
  }

  let {
    inputId,
    inputLabel,
    buttonLabel,
    buttonTitle,
    buttonType = "submit",
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
    internals,
    onvaluechanged,
    onsearch,
    labelSize,
    labelWeight,
  }: Props = $props();

  let formControlElement: HTMLInputElement;
  let host = $host();

  const formValidation = createFormValidation();
  const sizeClass = $derived(`fr-search-bar--${size}`);

  /**
   * Gère le changement de valeur de l'input de recherche.
   * Met à jour la valeur et déclenche l'événement 'valuechanged'.
   *
   * @param {Event} event - L'événement input
   */
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    value = target.value;

    onvaluechanged?.(target.value);
    $host()?.dispatchEvent(
      new CustomEvent("valuechanged", { detail: target.value, bubbles: true }),
    );
  }

  /**
   * Gère le clic sur le bouton de recherche.
   * Si le bouton est de type "submit" et associé à un formulaire, on soumet le formulaire.
   * Sinon, déclenche l'événement de recherche personnalisé.
   *
   * @param {MouseEvent | KeyboardEvent} event - L'événement souris ou clavier
   */
  function handleButtonClick(event: MouseEvent | KeyboardEvent) {
    if (buttonType === "submit" && internals?.form) {
      event.preventDefault();
      internals.form.requestSubmit();

      return;
    }

    onsearch?.(value);
    $host()?.dispatchEvent(new CustomEvent("search", { detail: value, bubbles: true }));
  }

  /**
   * Déclenche la recherche si la touche Entrée est pressée.
   * Le comportement par défaut de la touche Entrée dans un champ de recherche est de soumettre le formulaire. Cependant, si le bouton de recherche n'est pas de type "submit", nous voulons déclencher l'événement de recherche personnalisé.
   *
   * @param {KeyboardEvent} event - L'événement clavier
   */
  function handleInputKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter") return;

    handleButtonClick(event);
  }

  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  $effect(() => {
    formValidation.setup(internals, formControlElement, host, () => {
      value = "";
    });
  });

  $effect(() => {
    formValidation.syncFormValue(value);
  });

  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<div class={["fr-search-bar", sizeClass]} role="search">
  <DsfrLabel for={inputId} label={inputLabel} hidden {labelSize} {labelWeight} />
  <input
    bind:this={formControlElement}
    type="search"
    id={inputId}
    class="fr-input"
    bind:value
    {placeholder}
    oninput={handleInput}
    onkeydown={handleInputKeydown}
    onblur={formValidation.handleBlur}
    oninvalid={formValidation.handleInvalid}
    {disabled}
    {form}
    {maxlength}
    {minlength}
    {name}
    {pattern}
    {readonly}
    {required}
  />

  <button
    title={buttonTitle}
    type={buttonType}
    class="fr-btn"
    {disabled}
    onclick={handleButtonClick}
  >
    {buttonLabel}
  </button>
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
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

  @include set-shadow-host($tag: "dsfr-search");
  @include set-dsfr-sizing("search-bar");
</style>
