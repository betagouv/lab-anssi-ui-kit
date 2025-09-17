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
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  type CheckboxesSize = Extract<Size, "sm" | "md">;
  type Checkbox = {
    label: string;
    id: string;
    name?: string;
    value?: string;
    hint?: string;
    disabled?: boolean;
  };
  interface Props {
    /** Attribut id du formulaire */
    id: string;
    /** Légende de l’ensemble des checkboxes */
    legend: string;
    /** Liste de checkbox */
    checkboxes: Checkbox[];
    /** Texte additionnel sous la légende */
    hint?: string;
    /** Taille des checkboxes */
    size?: CheckboxesSize;
    /** Eléments du formulaire en ligne */
    inline?: boolean;
    /** Désactive l’ensemble des checkboxes */
    disabled?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
  }

  let {
    id,
    legend,
    checkboxes,
    hint,
    size = "md",
    inline,
    disabled,
    status,
    errorMessage,
    validMessage,
  }: Props = $props();

  type SelectedValues = string[];
  let checkboxesValues: SelectedValues = $state([]);

  const dispatch = createEventDispatcher<{ valuechanged: SelectedValues }>();

  function handleChange(event: Event) {
    dispatch("valuechanged", checkboxesValues);
  }
</script>

<fieldset
  class={["fr-fieldset", `fr-fieldset--${status}`]}
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

  {#each checkboxes as item (item.id)}
    <div class={["fr-fieldset__element", { "fr-fieldset__element--inline": inline }]}>
      <div class={["fr-checkbox-group", `fr-checkbox-group--${size}`]}>
        <input
          type="checkbox"
          id={item.id}
          name={item.value}
          disabled={item.disabled || undefined}
          value={item.value}
          bind:group={checkboxesValues}
          onchange={handleChange}
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
</fieldset>

<style lang="scss">
  // @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  // @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  // @use "@gouvfr/dsfr/src/dsfr/component/checkbox/main" as *;

  // .fr-fieldset {
  //   box-sizing: border-box;
  // }

  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/form/form.min.css";
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.min.css";
</style>
