<svelte:options
  customElement={{
    tag: "dsfr-radios-group",
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

  type RadiosSize = Extract<Size, "sm" | "md">;
  type Radio = {
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
    /** Légende de l’ensemble des checkboxes */
    legend: string;
    /** Liste de radio */
    radios: Radio[];
    /** Texte additionnel sous la légende */
    hint?: string;
    /** Taille des checkboxes */
    size?: RadiosSize;
    /** Passe en mode radios riches (ajoute un encadré et la possibilité d’associer un pictogramme) */
    rich?: boolean;
    /** Ajoute un pictogramme au radio riche */
    hasPictogram?: boolean;
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
    rich,
    hasPictogram,
    inline,
    disabled,
    value,
    status = "default",
    errorMessage,
    validMessage,
  }: Props = $props();

  let currentValue = $derived(value);

  function handleChange(event: Event) {
    $host().dispatchEvent(new CustomEvent("valuechanged", { detail: currentValue }));
  }
</script>

<fieldset
  class={["fr-fieldset", `fr-fieldset--${status}`]}
  aria-labelledby={`${id}-legend ${id}-messages`}
  role="group"
  {id}
  {disabled}
>
  <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id={`${id}-legend`}>
    {legend}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>

  {#each radios as { id, name, value, disabled, label, form, required } (id)}
    <div class={["fr-fieldset__element", inline && "fr-fieldset__element--inline"]}>
      <div class={["fr-radio-group", `fr-radio-group--${size}`]}>
        <input
          type="radio"
          {id}
          {name}
          {value}
          bind:group={currentValue}
          onchange={handleChange}
          {form}
          {required}
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
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/radio/radio.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("fieldset");
</style>
