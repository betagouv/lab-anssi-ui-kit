<svelte:options
  customElement={{
    tag: "dsfr-input",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hideLabel: { attribute: "hide-label", type: "Boolean" },
      hint: { attribute: "hint", type: "String" },
      type: { attribute: "type", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      placeholder: { attribute: "placeholder", type: "String" },
      name: { attribute: "name", type: "String", reflect: true },
      autocomplete: { attribute: "autocomplete", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
      max: { attribute: "max", type: "String" },
      maxlength: { attribute: "maxlength", type: "Number" },
      min: { attribute: "min", type: "String" },
      minlength: { attribute: "minlength", type: "Number" },
      pattern: { attribute: "pattern", type: "String" },
      readonly: { attribute: "readonly", type: "Boolean" },
      required: { attribute: "required", type: "Boolean" },
      step: { attribute: "step", type: "Number" },
      icon: { attribute: "icon", type: "String" },
      addon: { attribute: "addon", type: "Boolean" },
      action: { attribute: "action", type: "Boolean" },
    },
    extend: (CustomElementClass) => {
      return class extends CustomElementClass {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }

        connectedCallback() {
          super.connectedCallback();

          const iconsStyleSheet = getIconsStyleSheet();
          const shadow = this.shadowRoot;

          if (shadow && !shadow.adoptedStyleSheets.includes(iconsStyleSheet)) {
            shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
          }
        }
      };
    },
  }}
/>

<script lang="ts">
  import { getIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  let host = $host();
  setThemeable(host);

  interface Props {
    /** Attribut id du champs de saisie */
    id: string;
    /** Libellé du champs de saisie */
    label: string;
    /** Permet de masquer le label */
    hideLabel?: boolean;
    /** Texte additionnel sous le libellé du champs de saisie */
    hint?: string;
    /** Type du champs de saisie, par défaut: "text" */
    type?: "date" | "email" | "password" | "number" | "search" | "tel" | "text" | "url";
    /** Ajoute une icône dans le champs de saisie */
    icon?: string;
    /** Associe un bouton d'envoi à l'input (variation addon) */
    addon?: boolean;
    /** Associe un bouton d'action à l'input (variation action) */
    action?: boolean;
    /** Valeur initiale du champs de saisie */
    value?: string;
    /** Texte avant saisie dans le champs de saisie */
    placeholder?: string;
    /** Attribut name du champs de saisie */
    name?: string;
    /** Attribut autocomplete du champs de saisie, voir la liste des valeurs possibles sur MDN */
    autocomplete?: string;
    /** Désactive le champs de saisie */
    disabled?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error" | "info";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Texte du message d'information */
    infoMessage?: string;
    /** Attribut form du composant */
    form?: string;
    /** Valeur de l'attribut max du champs de saisie _(valable uniquement dans ce composant pour les champs de type "date" et "number")_ */
    max?: string;
    /** Longueur maximale du champs de saisie _(valable uniquement pour les champs de type "text", "search", "url", "tel", "email", "password")_ */
    maxlength?: number;
    /** Valeur de l'attribut min du champs de saisie _(valable uniquement dans ce composant pour les champs de type "date" et "number")_ */
    min?: string;
    /** Longueur minimale du champs de saisie _(valable uniquement pour les champs de type "text", "search", "url", "tel", "email", "password")_ */
    minlength?: number;
    /** Attribut pattern du champs de saisie _(valable uniquement pour les champs de type "text", "search", "url", "tel", "email", "password")_ */
    pattern?: string;
    /** Rend le champs de saisie en lecture seule */
    readonly?: boolean;
    /** Rend le champs de saisie obligatoire */
    required?: boolean;
    /** Valeur de l'attribut step du champs de saisie _(valable uniquement dans ce composant pour les champs de type "date" et "number")_  */
    step?: number;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Callback appelé lors du changement de valeur du champ de saisie */
    onvaluechanged?: (value: string) => void;
  }

  let {
    id,
    label,
    hideLabel = false,
    hint,
    type = "text",
    icon,
    addon,
    action,
    value = $bindable(),
    placeholder,
    name,
    autocomplete,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    form,
    max,
    maxlength,
    min,
    minlength,
    pattern,
    readonly,
    required,
    step,
    internals,
    onvaluechanged,
  }: Props = $props();

  let formControlElement: HTMLInputElement;

  // Création de l'état de validation partagé
  const formValidation = createFormValidation();

  // Détermine si l'utilisateur a pris la main sur le status
  const isUserControlled = $derived(status !== "default");

  // Status et message calculés à afficher
  const computedStatus = $derived(isUserControlled ? status : formValidation.localStatus);
  const computedErrorMessage = $derived(
    isUserControlled ? errorMessage : formValidation.localErrorMessage,
  );

  const disabledClass = $derived(disabled && "fr-input-group--disabled");
  const iconClass = $derived(setIconClass(icon));
  const hasWrap = $derived(!!icon || !!addon || !!action);
  const wrapClasses = $derived([
    "fr-input-wrap",
    iconClass,
    addon && "fr-input-wrap--addon",
    action && "fr-input-wrap--action",
  ]);
  const statusClass = $derived(
    computedStatus !== "info" &&
      computedStatus !== "default" &&
      `fr-input-group--${computedStatus}`,
  );
  const isTypeDateOrNumber = $derived(type === "number" || type === "date");

  const isLabelEmpty = $derived(label === "");

  /**
   * Gère l'événement input de l'input.
   * Met à jour la valeur du composant et déclenche l'événement 'valuechanged'.
   *
   * @param {Event} event - L'événement input déclenché
   */
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;

    onvaluechanged?.(target.value);
    host?.dispatchEvent(new CustomEvent("valuechanged", { detail: target.value, bubbles: true }));
  }

  /**
   * Définit un message de validité personnalisé pour l'input.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  // Configure la validation avec les références nécessaires
  $effect(() => {
    formValidation.setup(internals, formControlElement, host, () => {
      value = "";
    });
  });

  // Synchronise la valeur du formulaire et met à jour la validité
  $effect(() => {
    formValidation.syncFormValue(value, isUserControlled);
  });

  // Quand l'utilisateur prend la main sur le status, on efface les erreurs de validation natives
  $effect(() => {
    if (isUserControlled) {
      internals?.setValidity({});
    }
  });

  // Attache les event listeners pour la validation
  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<div class={["fr-input-group", disabledClass, statusClass]}>
  <DsfrLabel
    for={id}
    {label}
    {hint}
    context="field"
    {status}
    {disabled}
    hidden={hideLabel || isLabelEmpty}
  />
  {#snippet inputField()}
    <input
      bind:this={formControlElement}
      {type}
      {id}
      class="fr-input"
      {name}
      bind:value
      {placeholder}
      {disabled}
      aria-describedby={computedStatus !== "default" ? `${id}-messages` : undefined}
      {autocomplete}
      oninput={handleInput}
      onblur={formValidation.handleBlur}
      oninvalid={formValidation.handleInvalid}
      {form}
      {readonly}
      {required}
      max={isTypeDateOrNumber ? max : undefined}
      maxlength={!isTypeDateOrNumber ? maxlength : undefined}
      min={isTypeDateOrNumber ? min : undefined}
      minlength={!isTypeDateOrNumber ? minlength : undefined}
      pattern={!isTypeDateOrNumber ? pattern : undefined}
      step={isTypeDateOrNumber ? step : undefined}
    />
  {/snippet}

  {#if hasWrap}
    <div class={wrapClasses}>
      {@render inputField()}
      {#if addon || action}
        <slot name="button"></slot>
      {/if}
    </div>
  {:else}
    {@render inputField()}
  {/if}

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={computedErrorMessage}
        {validMessage}
        {infoMessage}
      />
    {/if}
  </slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("input-group");

  .fr-input-group:not(:last-child) {
    margin-bottom: 0;
  }

  .fr-input-wrap--addon {
    :global(::slotted([slot="button"])) {
      border-radius: 0 0.25rem 0 0;
      overflow: hidden;
    }
  }

  .fr-input-wrap--action {
    :global(::slotted([slot="button"])) {
      margin-left: 1rem;
    }
  }
</style>
