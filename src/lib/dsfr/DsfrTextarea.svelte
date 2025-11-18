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
    status?: "default" | "valid" | "error" | "info";
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
    status = "default",
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

  function updateFormValue(newValue: string | undefined) {
    if (internals) {
      internals.setFormValue(newValue || "");
    }
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    value = target.value;
    updateFormValue(value);
    dispatch("valuechanged", value);
  }
  const statusClass = $derived(status !== "info" && `fr-input-group--${status}`);

  $effect(() => {
    updateFormValue();
  });
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
    {id}
    class="fr-input"
    {name}
    bind:value
    {placeholder}
    {disabled}
    aria-describedby={status ? `${id}-messages` : undefined}
    oninput={handleInput}
    {rows}
    {autocomplete}
    {form}
    {maxlength}
    {minlength}
    {readonly}
    {required}
  ></textarea>

  {#if status !== "default"}
    <div class="fr-messages-group" id={status ? `${id}-messages` : undefined} aria-live="polite">
      <p
        class={["fr-message", `fr-message--${status}`]}
        id={status ? `${id}-message-${status}` : undefined}
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
