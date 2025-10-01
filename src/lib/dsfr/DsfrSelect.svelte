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
    },
  }}
/>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

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
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
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
  }: Props = $props();

  const disabledClass = $derived.by(() => {
    return disabled && "fr-select-group--disabled";
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }
</script>

<div class={["fr-select-group", disabledClass]}>
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
  {#if status !== "default"}
    <div class="fr-messages-group" id={status ? `${id}-messages` : undefined} aria-live="polite">
      <p
        class={["fr-message", `fr-message--${status}`]}
        id={status ? `${id}-message-${status}` : undefined}
      >
        {validMessage || errorMessage}
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
  @import "@gouvfr/dsfr/dist/component/select/select.main.css";

  .fr-select-group:not(:last-child) {
    margin-bottom: 0;
  }
</style>
