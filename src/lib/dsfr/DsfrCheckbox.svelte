<svelte:options
  customElement={{
    tag: "dsfr-checkbox",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      name: { attribute: "name", type: "String" },
      size: { attribute: "size", type: "String" },
      hint: { attribute: "hint", type: "String" },
      checked: { attribute: "checked", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";

  type ChecboxSize = Extract<Size, "sm" | "md">;

  interface Props {
    /** Attribut id de la checkbox */
    id: string;
    /** Libellé de la checkbox */
    label: string;
    /** Attribut name de la checkbox */
    name?: string;
    /** Taille de checkbox */
    size?: ChecboxSize;
    /** Texte additionnel de la checkbox */
    hint?: string;
    /** Désactive la checkbox */
    disabled?: boolean;
    /** Etat de la checkbox */
    checked?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
  }

  let {
    id,
    label,
    name,
    size,
    hint,
    disabled,
    checked = $bindable(),
    status = "default",
    errorMessage,
    validMessage,
  }: Props = $props();

  let sizeClass = $derived(`fr-checkbox-group--${size}`);
</script>

<div class={["fr-checkbox-group", sizeClass]}>
  <input
    type="checkbox"
    {id}
    {name}
    {disabled}
    bind:checked
    aria-describedby={status ? `${id}-messages` : undefined}
  />
  <label class="fr-label" for={id}>
    {label}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>

  {#if status !== "default"}
    <div class="fr-messages-group" id={status ? `${id}-messages` : undefined} aria-live="polite">
      <p class="fr-message fr-message--error" id={status ? `${id}-message-${status}` : undefined}>
        {validMessage || errorMessage}
      </p>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/form/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/checkbox/main" as *;
</style>
