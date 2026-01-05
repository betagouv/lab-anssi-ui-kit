<svelte:options
  customElement={{
    tag: "dsfr-input",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      type: { attribute: "type", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      placeholder: { attribute: "placeholder", type: "String" },
      name: { attribute: "name", type: "String" },
      autocomplete: { attribute: "autocomplete", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      form: { attribute: "form", type: "String" },
      max: { attribute: "max", type: "String" },
      maxlength: { attribute: "maxlength", type: "Number" },
      min: { attribute: "min", type: "String" },
      minlength: { attribute: "minlength", type: "Number" },
      pattern: { attribute: "pattern", type: "String" },
      readonly: { attribute: "readonly", type: "Boolean" },
      required: { attribute: "required", type: "Boolean" },
      step: { attribute: "step", type: "Number" },
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
  import { createEventDispatcher } from "svelte";
  import { setIconClass } from "$lib/utilitaires";
  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";

  interface Props {
    /** Attribut id du champs de saisie */
    id: string;
    /** Libellé du champs de saisie */
    label: string;
    /** Texte additionnel sous le libellé du champs de saisie */
    hint?: string;
    /** Type du champs de saisie, par défaut: "text" */
    type?: "date" | "email" | "password" | "number" | "search" | "tel" | "text" | "url";
    /** Ajoute une icône dans le champs de saisie */
    icon?: string;
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
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    hint,
    type = "text",
    icon,
    value = $bindable(),
    placeholder,
    name,
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
  }: Props = $props();

  const disabledClass = $derived.by(() => {
    return disabled && "fr-input-group--disabled";
  });
  const iconClass = $derived(setIconClass(icon));
  const statusClass = $derived(status !== "info" && `fr-input-group--${status}`);
  const isTypeDateOrNumber = $derived(type === "number" || type === "date");

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }

  $effect(() => {
    if (!internals) return;

    internals.setFormValue(value ?? "");
  });
</script>

<div class={["fr-input-group", disabledClass, statusClass]}>
  {#if label}
    <label class="fr-label" for={id}>
      {label}
      {#if hint}
        <span class="fr-hint-text">{hint}</span>
      {/if}
    </label>
  {/if}
  {#if icon}
    <div class={["fr-input-wrap", iconClass]}>
      <input
        {type}
        {id}
        class="fr-input"
        {name}
        bind:value
        {placeholder}
        {disabled}
        aria-describedby={status ? `${id}-messages` : undefined}
        oninput={handleInput}
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
    </div>
  {:else}
    <input
      {type}
      {id}
      class="fr-input"
      {name}
      bind:value
      {placeholder}
      {disabled}
      aria-describedby={status ? `${id}-messages` : undefined}
      oninput={handleInput}
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
  {/if}

  <slot name="messages-group">
    {#if status !== "default"}
      <DsfrMessagesGroup {id} {errorMessage} {validMessage} {infoMessage} spaced />
    {/if}
  </slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/hint-text";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("input-group");

  .fr-input-group:not(:last-child) {
    margin-bottom: 0;
  }
</style>
