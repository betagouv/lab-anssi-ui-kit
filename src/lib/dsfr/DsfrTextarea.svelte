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
  import { createEventDispatcher, onMount } from "svelte";

  type TextareaStatus = "default" | "valid" | "error";
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
    autocomplete?: "on" | "off";
    /** Désactive le champs de saisie */
    disabled?: boolean;
    /** Statut du message */
    status?: TextareaStatus;
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Nombre de lignes */
    rows?: number;
    /** Texte du message d'information */
    infoMessage?: string;
    /** ID du formulaire auquel associer ce champ */
    form?: string;
    /** Longueur maximale du texte */
    maxlength?: number;
    /** Longueur minimale du texte */
    minlength?: number;
    /** Rend le champ en lecture seule */
    readonly?: boolean;
    /** Rend le champ obligatoire */
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
    status,
    errorMessage,
    validMessage,
    infoMessage,
    rows,
    autocomplete,
    form,
    maxlength,
    minlength,
    readonly,
    required,
    internals,
  }: Props = $props();

  let textareaElement: HTMLTextAreaElement;
  let localStatus: TextareaStatus = $state("default");
  let finalStatus = $derived(status ?? localStatus);
  let formWasSubmitted = $state(false);

  /**
   * Met à jour la valeur du formulaire et gère la validation du textarea.
   *
   * Cette fonction synchronise la valeur du textarea avec les mécanismes internes
   * du formulaire, vérifie la validité des données saisies et met à jour
   * l'état de validation ainsi que les messages d'erreur correspondants.
   *
   * @param {string | undefined} newValue - La nouvelle valeur à assigner au textarea
   */
  function updateFormValue(newValue: string | undefined) {
    if (!internals || !textareaElement) return;

    internals.setFormValue(newValue || "");

    const isValid = textareaElement.validity.valid;
    const flags = !isValid ? textareaElement.validity : {};
    const message = !isValid ? textareaElement.validationMessage : "";
    const anchor = !isValid ? textareaElement : null;

    internals.setValidity(flags, message, anchor);

    if (!status) {
      localStatus = isValid ? "valid" : "error";
      errorMessage = isValid ? undefined : textareaElement.validationMessage;
    }
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    updateFormValue(value);
    dispatch("valuechanged", value);
  }

  $effect(() => {
    updateFormValue();
  });

  onMount(() => {
    /**
     * Gestionnaire d'événement déclenché lorsque le champ textarea est invalide lors de la validation.
     * Empêche l'affichage de la bulle de validation native du navigateur et déclenche
     * la validation personnalisée du formulaire.
     *
     * @param {Event} e - L'événement d'invalidité déclenché par le navigateur
     */
    function handleInvalid(e: Event) {
      e.preventDefault();
      formWasSubmitted = true;
      updateFormValue(value);
    }

    $host()?.addEventListener("invalid", handleInvalid);

    return () => $host()?.removeEventListener("invalid", handleInvalid);
  });

  const statusClass = $derived(
    formWasSubmitted && finalStatus !== "info" && `fr-input-group--${finalStatus}`,
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
    bind:this={textareaElement}
    {id}
    class="fr-input"
    {name}
    bind:value
    {placeholder}
    {disabled}
    aria-describedby={formWasSubmitted && finalStatus ? `${id}-messages` : undefined}
    oninput={handleInput}
    {rows}
    {autocomplete}
    {form}
    {maxlength}
    {minlength}
    {readonly}
    {required}
  ></textarea>

  {#if formWasSubmitted && finalStatus !== "default" && (validMessage || errorMessage || infoMessage)}
    <div
      class="fr-messages-group"
      id={finalStatus ? `${id}-messages` : undefined}
      aria-live="polite"
    >
      <p
        class={["fr-message", `fr-message--${finalStatus}`]}
        id={finalStatus ? `${id}-message-${finalStatus}` : undefined}
      >
        {validMessage || errorMessage || infoMessage}
      </p>
    </div>
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("input-group");
</style>
