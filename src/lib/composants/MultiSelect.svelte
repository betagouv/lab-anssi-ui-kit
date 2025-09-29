<svelte:options
  customElement={{
    tag: "lab-anssi-multi-select",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      options: { attribute: "options", type: "Array" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      size: { attribute: "size", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      values: { attribute: "values", type: "Array" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  type ChecboxSize = "sm" | "md";
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
    size?: ChecboxSize;
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
    size = "md",
  }: Props = $props();

  const sizeClass = $derived(`fr-checkbox-group--${size}`);

  let currentValues: string[] = $state(values || []);
  function handleChange(event: Event) {
    $host().dispatchEvent(new CustomEvent<string[]>("valuechanged", { detail: currentValues }));
  }
</script>

<div class={["fr-select-group", `disabled: ${disabled}`]}>
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
    name={id}
    aria-disabled={disabled}
    onchange={handleChange}
  >
    {#if placeholder !== undefined}
      <summary aria-disabled={disabled}>
        {placeholder}
      </summary>
    {/if}
    <div class="fr-select__options">
      {#each options as { id, name, value, label } (id)}
        <div class={["fr-fieldset__element", "fr-fieldset__element--inline"]}>
          <div class={["fr-checkbox-group", sizeClass]}>
            <input
              type="checkbox"
              {id}
              {name}
              {disabled}
              {value}
              bind:group={currentValues}
              aria-describedby={status ? `${id}-messages` : undefined}
              onchange={handleChange}
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
  @use "@gouvfr/dsfr/src/dsfr/component/select/main";
  @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
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

      &:focus-visible {
        outline: 2px solid #0a76f6;
        outline-offset: 2px;
      }

      &::marker,
      &::-webkit-details-marker {
        display: none;
      }
    }
  }

  .fr-select {
    width: auto;
  }

  .fr-select__options {
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
