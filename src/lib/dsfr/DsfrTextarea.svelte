<svelte:options
  customElement={{
    tag: "dsfr-textarea",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      placeholder: { attribute: "placeholder", type: "String" },
      name: { attribute: "name", type: "String" },
      autocomplete: { attribute: "autocomplete", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      rows: { attribute: "rows", type: "String" },
      form: { attribute: "form", type: "String" },
      maxlength: { attribute: "maxlength", type: "Number" },
      minlength: { attribute: "minlength", type: "Number" },
      readonly: { attribute: "readonly", type: "Boolean" },
      required: { attribute: "required", type: "Boolean" },
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
  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";

  interface Props {
    /** Attribut id du champs de saisie */
    id: string;
    /** Libellé du champs de saisie */
    label?: string;
    /** Texte additionnel sous le libellé du champs de saisie */
    hint?: string;
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
    /** Nombre de lignes */
    rows?: number;
    /** Texte du message d'information */
    infoMessage?: string;
    /** Attribut form du composant */
    form?: string;
    /** Longueur maximale du champs de saisie _(valable uniquement pour les champs de type "text", "search", "url", "tel", "email", "password")_ */
    maxlength?: number;
    /** Longueur minimale du champs de saisie _(valable uniquement pour les champs de type "text", "search", "url", "tel", "email", "password")_ */
    minlength?: number;
    /** Rend le champs de saisie en lecture seule */
    readonly?: boolean;
    /** Rend le champs de saisie obligatoire */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    hint,
    value = $bindable(),
    placeholder,
    name,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    rows,
    form,
    maxlength,
    minlength,
    readonly,
    required,
    internals,
  }: Props = $props();

  let formControlElement: HTMLTextAreaElement;
  let customValidityMessage = $state("");
  let hasInteracted = $state(false);
  let host = $host();
  let localStatus = $state<"default" | "error">("default");
  let localErrorMessage = $state("");

  // Détermine si l'utilisateur a pris la main sur le status
  const isUserControlled = $derived(status !== "default");

  // Status et message calculés à afficher
  const computedStatus = $derived(isUserControlled ? status : localStatus);
  const computedErrorMessage = $derived(isUserControlled ? errorMessage : localErrorMessage);

  /**
   * Met à jour la validité du textarea.
   * Vérifie les messages de validité personnalisés et la validité native du formulaire.
   * Met à jour l'état local et le message d'erreur si l'utilisateur a interagi avec le champ.
   */
  function updateValidity() {
    if (!internals || !formControlElement) return;

    if (customValidityMessage) {
      internals.setValidity({ customError: true }, customValidityMessage, formControlElement);

      if (hasInteracted) {
        localStatus = "error";
        localErrorMessage = customValidityMessage;
      }
    } else if (!formControlElement.validity.valid) {
      internals.setValidity(
        formControlElement.validity,
        formControlElement.validationMessage,
        formControlElement,
      );

      if (hasInteracted) {
        localStatus = "error";
        localErrorMessage = formControlElement.validationMessage;
      }
    } else {
      internals.setValidity({});

      if (hasInteracted) {
        localStatus = "default";
        localErrorMessage = "";
      }
    }
  }

  /**
   * Gère l'événement blur du textarea.
   * Marque le composant comme ayant interagi si la valeur n'est pas vide.
   *
   * @param {Event} event - L'événement blur déclenché
   */
  function handleBlur(event: Event) {
    const target = event.target as HTMLTextAreaElement;

    if (!hasInteracted && target.value) {
      hasInteracted = true;
      updateValidity();
    }
  }

  /**
   * Gère l'événement input du textarea.
   * Met à jour la valeur du composant et déclenche l'événement 'valuechanged'.
   *
   * @param {Event} event - L'événement input déclenché
   */
  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;

    dispatch("valuechanged", target.value);
  }

  /**
   * Gère l'événement invalid du textarea.
   * Marque le composant comme ayant interagi et met à jour la validité.
   *
   * @param {Event} event - L'événement invalid déclenché
   */
  function handleInvalid(event: Event) {
    event.preventDefault();
    hasInteracted = true;
    updateValidity();
  }

  /**
   * Définit un message de validité personnalisé pour le textarea.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  export function setCustomValidity(message: string) {
    customValidityMessage = message;
    updateValidity();
  }

  $effect(() => {
    if (!internals || !formControlElement) return;

    internals.setFormValue(value ?? "");
    updateValidity();
  });

  /**
   * Gère l'événement formreset du formulaire.
   * Réinitialise l'état du composant lors du reset du formulaire.
   */
  function handleFormReset() {
    value = "";
    hasInteracted = false;
    localStatus = "default";
    localErrorMessage = "";
    customValidityMessage = "";

    if (internals) {
      internals.setValidity({});
    }
  }

  $effect(() => {
    if (!host) return;

    host.addEventListener("invalid", handleInvalid);

    return () => {
      host.removeEventListener("invalid", handleInvalid);
    };
  });

  $effect(() => {
    if (!internals) return;

    internals.form?.addEventListener("reset", handleFormReset);

    return () => {
      internals.form?.removeEventListener("reset", handleFormReset);
    };
  });

  const statusClass = $derived(
    computedStatus !== "info" &&
      computedStatus !== "default" &&
      `fr-input-group--${computedStatus}`,
  );
</script>

<div
  class={["fr-input-group", statusClass, { "fr-input-group--disabled": disabled }]}
  id={`input-group-${id}`}
>
  {#if label}
    <label class="fr-label" for={id}>
      {label}

      {#if hint}
        <span class="fr-hint-text">{hint}</span>
      {/if}
    </label>
  {/if}
  <textarea
    bind:this={formControlElement}
    {id}
    class="fr-input"
    {name}
    bind:value
    {placeholder}
    {disabled}
    aria-describedby={computedStatus ? `${id}-messages` : undefined}
    {rows}
    {form}
    {maxlength}
    {minlength}
    {readonly}
    {required}
    oninput={handleInput}
    onblur={handleBlur}
    oninvalid={handleInvalid}
  ></textarea>

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
        {validMessage}
        {infoMessage}
        spaced
      />
    {/if}
  </slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/hint-text";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("input-group");
</style>
