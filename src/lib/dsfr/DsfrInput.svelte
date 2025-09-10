<svelte:options
  customElement={{
    tag: "dsfr-input",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      type: { attribute: "type", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      placeholder: { attribute: "placeholder", type: "String" },
      name: { attribute: "name", type: "String" },
      autocomplete: { attribute: "autocomplete", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Props {
    /** Attribut id du champs de saisie */
    id: string;
    /** Libellé du champs de saisie */
    label: string;
    /** Texte additionnel sous le libellé du champs de saisie */
    hint?: string;
    /** Type du champs de saisie, par défaut: "text" */
    type?: "date" | "email" | "password" | "number" | "search" | "tel" | "text" | "url";
    /** Ajoute une icône dans le champs de saisie */
    icon?: string;
    /** Valeur initiale du champs de saisie */
    value?: string;
    /** Texte avant saisie dans le champs de saisie */
    placeholder?: string;
    /** Attribut name du champs de saisie */
    name?: string;
    /** Attribut autocomplete du champs de saisie, voir la liste des valeurs possibles sur MDN */
    autocomplete?: string;
    /** Désactive le champs de saisie */
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
    hint,
    type = "text",
    value = $bindable(),
    placeholder,
    name,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
  }: Props = $props();

  const disabledClass = $derived.by(() => {
    return disabled && "fr-input-group--disabled";
  });

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }
</script>

<div class={["fr-input-group", disabledClass]} id="input-group-16">
  <label class="fr-label" for={id}>
    {label}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
  <input
    {type}
    {id}
    class="fr-input"
    {name}
    bind:value
    {placeholder}
    {disabled}
    aria-describedby={status ? `${id}-messages` : undefined}
    oninput={handleInput}
  />

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
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/input/main" as *;
</style>
