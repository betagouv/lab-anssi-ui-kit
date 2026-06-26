<svelte:options
  customElement={{
    tag: "dsfr-select",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hideLabel: { attribute: "hide-label", type: "Boolean" },
      value: { attribute: "value", type: "String", reflect: true },
      groupedOptions: { attribute: "grouped-options", type: "Boolean" },
      options: { attribute: "options", type: "Array" },
      optionGroups: { attribute: "option-groups", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      placeholderDisabled: { attribute: "placeholder-disabled", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
      required: { attribute: "required", type: "Boolean" },
      name: { attribute: "name", type: "String", reflect: true },
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
  import { setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  setThemeable($host());

  type Option = {
    value: string;
    label: string;
  };
  type OptionGroup = {
    label: string;
    options: Option[];
  };
  interface Props {
    /** Attribut id de la liste déroulante */
    id: string;
    /** Libellé de la liste déroulante */
    label: string;
    /** Permet de masquer le label */
    hideLabel?: boolean;
    /** Valeur initiale du champ */
    value?: string;
    /** Groupe d\'options */
    groupedOptions?: boolean;
    /** Options de la liste déroulante */
    options?: Option[] | undefined;
    /** Options de la liste déroulante avec groupes */
    optionGroups: OptionGroup | undefined;
    /** Texte additionnel sous le label */
    hint?: string;
    /** Texte avant sélection d'une option */
    placeholder?: string;
    /** Placeholder désactivé */
    placeholderDisabled?: boolean | undefined;
    /** Désactive la liste déroulante */
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
    /** Attribut required du composant */
    required?: boolean;
    /** Callback appelé lors du changement de valeur */
    onvaluechanged?: (value: string) => void;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Attribut name du champs de saisie */
    name?: string;
  }

  let {
    id,
    label,
    hideLabel = false,
    value = $bindable(),
    groupedOptions,
    options,
    hint,
    placeholder,
    placeholderDisabled,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    form,
    required,
    onvaluechanged,
    internals,
    name,
  }: Props = $props();

  let formControlElement: HTMLSelectElement;
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

  const disabledClass = $derived.by(() => {
    return disabled && "fr-select-group--disabled";
  });
  const statusClass = $derived(
    computedStatus !== "info" &&
      computedStatus !== "default" &&
      `fr-select-group--${computedStatus}`,
  );

  /**
   * Gère l'événement change du select.
   * Met à jour la valeur du composant et déclenche l'événement 'valuechanged'.
   *
   * @param {Event} event - L'événement change déclenché
   */
  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value;

    onvaluechanged?.(target.value);
    $host()?.dispatchEvent(
      new CustomEvent("valuechanged", { detail: target.value, bubbles: true }),
    );
  }

  /**
   * Définit un message de validité personnalisé pour le select.
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

<div class={["fr-select-group", statusClass, disabledClass]}>
  <DsfrLabel for={id} {label} {hint} hidden={hideLabel} context="field" {status} {disabled} />
  <select
    bind:this={formControlElement}
    class="fr-select"
    aria-describedby={computedStatus !== "default" ? `${id}-messages` : undefined}
    {id}
    {name}
    bind:value
    {disabled}
    onchange={handleChange}
    onblur={formValidation.handleBlur}
    oninvalid={formValidation.handleInvalid}
    {form}
    {required}
  >
    {#if placeholder}
      <option value="" selected disabled={placeholderDisabled}>{placeholder}</option>
    {/if}
    {#if $$slots.default}
      <slot></slot>
    {:else}
      {#each options as option}
        <option value={option.value}>
          {option.label}
        </option>
      {/each}
    {/if}
  </select>

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/select";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/select/select.main.css";

  @include set-shadow-host($tag: "dsfr-select");
  @include set-dsfr-sizing("select-group");

  .fr-select-group:not(:last-child) {
    margin-bottom: 0;
  }
</style>
