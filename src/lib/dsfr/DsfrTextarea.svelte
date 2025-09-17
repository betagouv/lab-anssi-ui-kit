<svelte:options
  customElement={{
    tag: "dsfr-textarea",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      placeholder: { attribute: "placeholder", type: "String" },
      name: { attribute: "name", type: "String" },
      autocomplete: { attribute: "autocomplete", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      rows: { attribute: "rows", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Props {
    /** Attribut id du champs de saisie */
    id: string;
    /** Libellé du champs de saisie */
    label?: string;
    /** Texte additionnel sous le libellé du champs de saisie */
    hint?: string;
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
    /** Nombre de lignes */
    rows?: number;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    hint,
    value = $bindable(),
    placeholder,
    name,
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    rows,
  }: Props = $props();

  const disabledClass = $derived.by(() => {
    return disabled && "fr-input-group--disabled";
  });

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }
</script>

<div class={["fr-input-group", disabledClass]} id={`input-group-${id}`}>
  {#if label}
    <label class="fr-label" for={id}>
      {label}

      {#if hint}
        <span class="fr-hint-text">{hint}</span>
      {/if}
    </label>
  {/if}
  <textarea
    {id}
    class="fr-input"
    {name}
    bind:value
    {placeholder}
    {disabled}
    aria-describedby={status ? `${id}-messages` : undefined}
    oninput={handleInput}
    {rows}
  ></textarea>

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
  // @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  // @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  // @use "@gouvfr/dsfr/src/dsfr/component/input/main" as *;

  // .fr-input-group {
  //   box-sizing: border-box;
  // }

  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/form/form.min.css";
  @import "@gouvfr/dsfr/dist/component/input/input.min.css";
</style>
