<svelte:options
  customElement={{
    tag: "dsfr-checkbox",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      name: { attribute: "name", type: "String" },
      size: { attribute: "size", type: "String" },
      hint: { attribute: "hint", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      checked: { attribute: "checked", type: "Boolean", reflect: true },
      value: { attribute: "value", type: "String", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      form: { attribute: "form", type: "String" },
      required: { attribute: "required", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";

  type ChecboxSize = Extract<Size, "sm" | "md">;
  interface Props {
    /** Attribut id de la checkbox */
    id: string;
    /** Libellé de la checkbox */
    label?: string;
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
    /** Valeur de la checkbox */
    value?: string;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Attribut form de la checkbox */
    form?: string;
    /** Attribut required de la checkbox */
    required?: boolean;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    name,
    size,
    hint,
    disabled,
    checked = $bindable(),
    value = $bindable(),
    status = "default",
    errorMessage,
    validMessage,
    form,
    required,
  }: Props = $props();

  const sizeClass = $derived(`fr-checkbox-group--${size}`);

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.checked);
  }
</script>

<div class={["fr-checkbox-group", sizeClass, `fr-checkbox-group--${status}`]}>
  <input
    type="checkbox"
    {id}
    {name}
    {disabled}
    {value}
    bind:checked
    aria-describedby={status ? `${id}-messages` : undefined}
    onchange={handleChange}
    {form}
    {required}
  />
  <label class="fr-label" for={id}>
    {#if label}
      {label}
    {:else}
      <slot></slot>
    {/if}

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>

  <slot name="messages-group">
    {#if status !== "default"}
      <DsfrMessagesGroup {id} {errorMessage} {validMessage} spaced />
    {/if}
  </slot>
</div>

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
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/hint-text";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("checkbox-group");
</style>
