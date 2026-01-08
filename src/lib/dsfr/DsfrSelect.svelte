<svelte:options
  customElement={{
    tag: "dsfr-select",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      groupedOptions: { attribute: "grouped-options", type: "Boolean" },
      options: { attribute: "options", type: "Array" },
      optionGroups: { attribute: "option-groups", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      placeholderDisabled: { attribute: "placeholder-disabled", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      form: { attribute: "form", type: "String" },
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
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
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
    internals,
  }: Props = $props();

  const disabledClass = $derived.by(() => {
    return disabled && "fr-select-group--disabled";
  });
  const statusClass = $derived(status !== "info" && `fr-select-group--${status}`);

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }

  $effect(() => {
    if (!internals) return;

    internals.setFormValue(value ?? "");
  });
</script>

<div class={["fr-select-group", statusClass, disabledClass]}>
  <label class="fr-label" for={id}>
    {label}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
  <select
    class="fr-select"
    aria-describedby={status ? `${id}-messages` : undefined}
    {id}
    name={id}
    bind:value
    {disabled}
    onchange={handleChange}
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/select";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/hint-text";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();
  @import "@gouvfr/dsfr/dist/component/select/select.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("select-group");

  .fr-select-group:not(:last-child) {
    margin-bottom: 0;
  }
</style>
