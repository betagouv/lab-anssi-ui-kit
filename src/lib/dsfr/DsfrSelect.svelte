<svelte:options
  customElement={{
    tag: "dsfr-select",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      groupedOptions: { attribute: "grouped-options", type: "Boolean" },
      options: { attribute: "options", type: "Array" },
      optionGroups: { attribute: "option-groups", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Snippet } from "svelte";

  type Options = {
    value: string;
    label: string;
  };
  type OptionGroups = {
    label: string;
    options: Options[];
  };

  interface Props {
    /** Attribut id de la liste déroulante */
    id: string;
    /** Libellé de la liste déroulante */
    label: string;
    /** Groupe d\'options */
    groupedOptions?: boolean;
    /** Options de la liste déroulante */
    options?: Options[];
    /** Options de la liste déroulante avec groupes */
    optionGroups: OptionGroups;
    /** Texte additionnel sous le label */
    hint?: string;
    /** Texte avant sélection d'une option */
    placeholder?: string;
    /** Désactive la liste déroulante */
    disabled?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Slot par défaut */
    children?: Snippet;
  }

  let {
    id,
    label,
    groupedOptions,
    options,
    hint,
    placeholder,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    children,
  }: Props = $props();

  let disabledClass = $derived.by(() => {
    return disabled && "fr-select-group--disabled";
  });
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
    {disabled}
  >
    {#if placeholder}
      <option value="" selected disabled>{placeholder}</option>
    {/if}
    {#if children}
      {@render children()}
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
