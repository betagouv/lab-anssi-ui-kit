<svelte:options
  customElement={{
    tag: "dsfr-checkbox",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      name: { attribute: "name", type: "String", reflect: true },
      size: { attribute: "size", type: "String" },
      hint: { attribute: "hint", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      checked: { attribute: "checked", type: "Boolean", reflect: true },
      value: { attribute: "value", type: "String", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
      required: { attribute: "required", type: "Boolean" },
      indeterminate: { attribute: "indeterminate", type: "Boolean", reflect: true },
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
  import { createEventDispatcher } from "svelte";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";
  import { setIndeterminate } from "$lib/directives/actions.svelte.ts";

  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  setThemeable($host());

  type ChecboxSize = Extract<Size, "sm" | "md">;
  interface Props {
    /** Attribut id de la checkbox */
    id: string;
    /** Libellé de la checkbox */
    label?: string;
    /** Attribut name de la checkbox */
    name?: string;
    /** Taille de checkbox */
    size?: ChecboxSize;
    /** Texte additionnel de la checkbox */
    hint?: string;
    /** Désactive la checkbox */
    disabled?: boolean;
    /** Etat de la checkbox */
    checked?: boolean;
    /** Valeur de la checkbox */
    value?: string;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Attribut form de la checkbox */
    form?: string;
    /** Attribut required de la checkbox */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Attribut indeterminate de la checkbox */
    indeterminate?: boolean;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    name,
    size,
    hint,
    disabled,
    checked = $bindable(),
    value = $bindable(),
    status = "default",
    errorMessage,
    validMessage,
    form,
    required,
    internals,
    indeterminate,
  }: Props = $props();

  let formControlElement: HTMLInputElement;
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

  const sizeClass = $derived(`fr-checkbox-group--${size}`);
  const statusClass = $derived(
    computedStatus !== "default" && `fr-checkbox-group--${computedStatus}`,
  );

  /**
   * Gère l'événement change de la checkbox.
   * Met à jour la valeur du composant et déclenche l'événement 'valuechanged'.
   *
   * @param {Event} event - L'événement change déclenché
   */
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;

    dispatch("valuechanged", checked);
  }

  /**
   * Définit un message de validité personnalisé pour la checkbox.
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
      checked = false;
    });
  });

  // Synchronise la valeur du formulaire et met à jour la validité
  // Pour les checkboxes, on envoie la valeur ou null selon l'état checked
  $effect(() => {
    if (!internals || !formControlElement) return;

    if (checked) {
      internals.setFormValue(value ?? "on");
    } else {
      internals.setFormValue(null);
    }

    if (isUserControlled) {
      internals.setValidity({});
    } else {
      formValidation.updateValidity();
    }
  });

  // Attache les event listeners pour la validation
  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<div class={["fr-checkbox-group", sizeClass, statusClass]}>
  <input
    bind:this={formControlElement}
    type="checkbox"
    {id}
    {name}
    {disabled}
    {value}
    bind:checked
    aria-describedby={computedStatus !== "default" ? `${id}-messages` : undefined}
    onchange={handleChange}
    onblur={formValidation.handleBlur}
    oninvalid={formValidation.handleInvalid}
    {form}
    {required}
    use:setIndeterminate={indeterminate}
  />
  <label class="fr-label" for={id}>
    {#if label}
      {label}
    {:else}
      <slot></slot>
    {/if}

    {#if hint || $$slots.hint}
      <span class="fr-hint-text">
        <slot name="hint">
          {hint}
        </slot>
      </span>
    {/if}
  </label>

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
        {validMessage}
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("checkbox-group") {
    @include set-themeable-checkbox();
    @include set-themeable-checkbox-sm();
  }
</style>
