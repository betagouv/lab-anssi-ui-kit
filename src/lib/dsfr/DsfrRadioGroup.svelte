<svelte:options
  customElement={{
    tag: "dsfr-radio-group",
    props: {
      id: { attribute: "id", type: "String" },
      legend: { attribute: "legend", type: "String" },
      radios: { attribute: "radios", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      size: { attribute: "size", type: "String" },
      inline: { attribute: "inline", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      value: { attribute: "value", type: "String", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { ref } from "process";

  type RadioSize = Extract<Size, "sm" | "md">;
  type Radio = {
    label: string;
    id: string;
    name?: string;
    value: string;
    hint?: string;
    disabled?: boolean;
  };
  interface Props {
    /** Attribut id du formulaire */
    id: string;
    /** Légende de l’ensemble des checkboxes */
    legend: string;
    /** Liste de radio */
    radios: Radio[];
    /** Texte additionnel sous la légende */
    hint?: string;
    /** Taille des checkboxes */
    size?: RadioSize;
    /** Eléments du formulaire en ligne */
    inline?: boolean;
    /** Désactive l’ensemble des radios */
    disabled?: boolean;
    /** Valeur des radios */
    value?: string;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
  }

  const {
    id,
    legend,
    radios,
    hint,
    size = "md",
    inline,
    disabled,
    value = "",
    status,
    errorMessage,
    validMessage,
  }: Props = $props();

  let currentValue = $state(value);
  const sizeClass = $derived(`fr-radio-group--${size}`);

  function handleChange(event: Event) {
    $host().dispatchEvent(new CustomEvent("valuechanged", { detail: currentValue }));
  }
</script>

<fieldset
  class={["fr-fieldset"]}
  class:fr-fieldset--default={status === "default" || !status}
  class:fr-fieldset--valid={status === "valid"}
  class:fr-fieldset--error={status === "error"}
  aria-labelledby={`${id}-legend ${id}-messages`}
  {id}
  {disabled}
>
  <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id={`${id}-legend`}>
    {legend}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>

  {#each radios as { id, name, value, disabled, label } (id)}
    <div class={["fr-fieldset__element"]} class:fr-fieldset__element--inline={inline}>
      <div
        class={["fr-checkbox-group"]}
        class:fr-checkbox-group--sm={size === "sm"}
        class:fr-checkbox-group--md={size === "md"}
      >
        <div class={["fr-radio-group", sizeClass]}>
          <input
            type="radio"
            {id}
            {name}
            {value}
            {disabled}
            bind:group={currentValue}
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
    </div>
  {/each}
  {#if status !== "default" && (errorMessage || validMessage)}
    <div class="fr-messages-group" id={status ? `${id}-messages` : undefined} aria-live="polite">
      <p
        class={["fr-message", `fr-message--${status}`]}
        id={status ? `${id}-message-${status}` : undefined}
      >
        {validMessage || errorMessage}
      </p>
    </div>
  {/if}
</fieldset>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/radio/main" as *;

  .fr-fieldset {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &__legend {
      &--regular {
        margin: 0;
        padding-left: 0;
        padding-right: 0;
      }
    }

    &__element {
      padding: 0;

      &--inline:not(:first-of-type) {
        padding-left: 8px;
      }

      &--inline:not(:last-of-type) {
        padding-right: 8px;
      }
    }
  }
</style>
