<svelte:options
  customElement={{
    tag: "lab-anssi-multi-select",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      options: { attribute: "options", type: "Array" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      values: { attribute: "values", type: "Array" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import {
    clickOutside,
    pressEscape,
    stopPropagation,
    trapFocus,
  } from "$lib/directives/actions.svelte.ts";

  type Option = {
    id: string;
    value: string;
    label: string;
  };
  interface Props {
    /** Attribut id de la liste déroulante */
    id: string;
    /** Libellé de la liste déroulante */
    label: string;
    /** Options de la liste déroulante */
    options?: Option[];
    /** Texte additionnel sous le label */
    hint?: string;
    /** Texte avant sélection d'une option */
    placeholder?: string;
    /** Désactive la liste déroulante */
    disabled?: boolean;
    /** Valeur des checkboxes */
    values?: string[];
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Taille de checkbox */
  }
  const {
    id = "",
    label,
    options,
    hint,
    placeholder = "",
    disabled,
    values = [],
    status,
    errorMessage,
    validMessage,
  }: Props = $props();

  const statusClass = $derived.by(() => {
    if (status === "valid") return "fr-select-group--valid";
    if (status === "error") return "fr-select-group--error";
    return "";
  });

  const disabledClass = $derived(disabled ? "fr-select-group--disabled" : "");

  let currentValues: string[] = $state(values || []);
  function handleChange(event: Event) {
    // REVIEW deprecate this event in favor of valueschanged
    $host().dispatchEvent(new CustomEvent<string[]>("valuechanged", { detail: currentValues }));
    $host().dispatchEvent(new CustomEvent<string[]>("valueschanged", { detail: currentValues }));
  }

  let summary = $state<HTMLElement>(undefined);
  let open = $state(false);
  function closeDropdown() {
    if (open) {
      open = false;
      summary.focus();
    }
  }

  const message = $derived.by(() => {
    if (currentValues.length === 0) {
      return placeholder ?? "";
    }
    if (currentValues.length === 1) {
      return `1 option sélectionnée`;
    }
    return `${currentValues.length} options sélectionnées`;
  });
</script>

<div class={["fr-select-group", statusClass, disabledClass]} aria-disabled={disabled}>
  <label class="fr-label" for={id}>
    {label}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
  <details
    class="fr-select"
    aria-describedby={status ? `${id}-messages` : undefined}
    {id}
    bind:open
    name={id}
    aria-disabled={disabled}
    onchange={handleChange}
    use:clickOutside={closeDropdown}
    use:pressEscape={closeDropdown}
  >
    <summary
      bind:this={summary}
      aria-disabled={disabled}
      tabindex={disabled ? -1 : undefined}
      onclick={closeDropdown}
      use:stopPropagation
    >
      {message}
    </summary>
    <div class="fr-select__dropdown" use:stopPropagation use:trapFocus>
      {#each options as { id, value, label } (id)}
        <div class={["fr-fieldset__element", "fr-fieldset__element--inline"]}>
          <div class={["fr-checkbox-group", "fr-checkbox-group--sm"]}>
            <input
              type="checkbox"
              {id}
              {disabled}
              {value}
              bind:group={currentValues}
              aria-describedby={status ? `${id}-messages` : undefined}
            />
            <label class="fr-label" for={id}>
              {label}
              {#if hint}
                <span class="fr-hint-text">{hint}</span>
              {/if}
            </label>
          </div>
        </div>
      {/each}
    </div>
  </details>
  {#if status !== "default" && (validMessage || errorMessage)}
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
  @use "@gouvfr/dsfr/src/dsfr/core/style/color/module/decisions";
  @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/select/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/checkbox/main" as *;

  details {
    border-radius: 0.25rem 0.25rem 0 0;
    position: relative;

    summary {
      border-radius: 0.25rem 0.25rem 0 0;
      cursor: pointer;
      list-style: none;
      margin: -8px -40px -8px -16px;
      padding: 8px 40px 8px 16px;

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }
    }
  }

  details summary:focus,
  details summary:focus-visible,
  details[open] summary {
    outline: 2px solid #0a76f6;
    outline-offset: 2px;
  }

  .fr-select-group--disabled summary {
    cursor: not-allowed;
    pointer-events: none;
  }

  .fr-select {
    width: auto;
  }

  .fr-select__dropdown {
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: grid;
    padding: 1rem;
    width: var(--dropdown-width, 100%);

    position: absolute;
    left: 0;
    top: 100%;
    z-index: 100;
  }

  .fr-checkbox-group,
  .fr-checkbox-group input[type="checkbox"],
  .fr-checkbox-group label {
    cursor: pointer;

    input[type="checkbox"]:focus + label:before {
      outline: 2px solid #0a76f6;
      outline-offset: 2px;
    }
  }
</style>
