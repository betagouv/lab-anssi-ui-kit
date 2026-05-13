<svelte:options
  customElement={{
    tag: "dsfr-checkboxes-group",
    props: {
      id: { attribute: "id", type: "String" },
      legend: { attribute: "legend", type: "String" },
      checkboxes: { attribute: "checkboxes", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      size: { attribute: "size", type: "String" },
      inline: { attribute: "inline", type: "Boolean" },
      name: { attribute: "name", type: "String", reflect: true },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      values: { attribute: "values", type: "Object", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
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
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  setThemeable($host());

  type CheckboxesSize = Extract<Size, "sm" | "md">;
  type SelectedValues = string[];
  type Checkbox = {
    label: string;
    id: string;
    name?: string;
    value: string;
    hint?: string;
    disabled?: boolean;
    form?: string;
    required?: boolean;
  };
  interface Props {
    /** Attribut id du formulaire */
    id: string;
    /** Légende de l'ensemble des checkboxes */
    legend: string;
    /** Liste de checkbox */
    checkboxes: Checkbox[];
    /** Texte additionnel sous la légende */
    hint?: string;
    /** Taille des checkboxes */
    size?: CheckboxesSize;
    /** Eléments du formulaire en ligne */
    inline?: boolean;
    /** Désactive l'ensemble des checkboxes */
    disabled?: boolean;
    /** Valeur des checkboxes */
    values?: SelectedValues;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Attribut name du composant */
    name?: string;
    /** Attribut form du composant */
    form?: string;
    /** Rend le groupe de checkboxes obligatoire (au moins une sélection requise) */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
  }

  let {
    id,
    legend,
    checkboxes,
    hint,
    size = "md",
    inline,
    disabled,
    values = $bindable(),
    status = "default",
    errorMessage,
    validMessage,
    name,
    form,
    required,
    internals,
  }: Props = $props();

  let validityCheckbox: HTMLInputElement;
  let host = $host();

  // Création de l'état de validation partagé
  const formValidation = createFormValidation();

  // Détermine si l'utilisateur a pris la main sur le status
  const isUserControlled = $derived(status !== "default");

  // Status et message calculés à afficher
  const computedStatus = $derived(isUserControlled ? status : formValidation.localStatus);
  const computedErrorMessage = $derived(
    isUserControlled ? errorMessage : formValidation.localErrorMessage,
  );

  /**
   * Gère l'événement change du groupe de checkboxes.
   * Met à jour les valeurs et déclenche l'événement 'valueschanged'.
   */
  function handleChange() {
    host.dispatchEvent(new CustomEvent("valueschanged", { detail: values, bubbles: true }));
  }

  /**
   * Capture la référence de l'élément utilisé pour la validation du groupe.
   */
  function captureValidityCheckbox(node: HTMLInputElement) {
    if (!validityCheckbox) {
      validityCheckbox = node;
    }
  }

  /**
   * Définit un message de validité personnalisé pour le groupe de checkboxes.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  // Configure la validation avec les références nécessaires
  // Pour un groupe de checkboxes, on utilise le premier input comme référence
  $effect(() => {
    formValidation.setup(internals, validityCheckbox, host, () => {
      values = [];
    });
  });

  // Synchronise la valeur du formulaire et met à jour la validité
  // Pour les checkboxes, on utilise FormData pour envoyer plusieurs valeurs avec le même nom
  $effect(() => {
    if (!internals) return;

    const formData = new FormData();
    const fieldName = name ?? id;

    if (values && values.length > 0) {
      for (const val of values) {
        formData.append(fieldName, val);
      }
      internals.setFormValue(formData);
    } else {
      internals.setFormValue("");
    }

    if (isUserControlled) {
      internals.setValidity({});
      return;
    }

    formValidation.updateValidity();
  });

  // Attache les event listeners pour la validation
  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<fieldset
  class={["fr-fieldset", `fr-fieldset--${computedStatus}`]}
  aria-labelledby={`${id}-legend ${id}-messages`}
  role="group"
  {id}
  {disabled}
  {form}
>
  <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id={`${id}-legend`}>
    {legend}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>

  {#each checkboxes as item, i (item.id)}
    <div class={["fr-fieldset__element", { "fr-fieldset__element--inline": inline }]}>
      <div class={["fr-checkbox-group", `fr-checkbox-group--${size}`]}>
        <input
          type="checkbox"
          id={item.id}
          name={name || id || item.name}
          value={item.value || item.id}
          bind:group={values}
          onchange={handleChange}
          onblur={formValidation.handleBlur}
          oninvalid={formValidation.handleInvalid}
          use:captureValidityCheckbox
          disabled={item.disabled || disabled}
          form={item.form || form}
          required={i === 0
            ? (required && (values ?? []).length === 0) ||
              checkboxes.some((c) => c.required && !(values ?? []).includes(c.value || c.id))
            : item.required && !(values ?? []).includes(item.value || item.id)}
        />
        <label class="fr-label" for={item.id}>
          {item.label}

          {#if item.hint}
            <span class="fr-hint-text">{item.hint}</span>
          {/if}
        </label>
      </div>
    </div>
  {/each}

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
        {validMessage}
        context="fieldset"
      />
    {/if}
  </slot>
</fieldset>

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
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("fieldset");
  @include set-dsfr-sizing("checkbox-group") {
    @include set-themeable-checkbox();
    @include set-themeable-checkbox-sm();
  }
</style>
