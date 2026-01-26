<svelte:options
  customElement={{
    tag: "dsfr-toggle",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      hintId: { attribute: "hint-id", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      checked: { attribute: "checked", type: "Boolean" },
      border: { attribute: "border", type: "Boolean" },
      state: { attribute: "state", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      form: { attribute: "form", type: "String" },
      required: { attribute: "required", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";
  import { createEventDispatcher } from "svelte";

  setThemeable($host());

  type Status = "default" | "valid" | "error";
  interface Props {
    /** Attribut id de l'input */
    id: string;
    /** Libellé de l'interrupteur */
    label?: string;
    /** Texte additionnel de l'interrupteur */
    hint?: string;
    /** ID du texte additionnel de l'interrupteur */
    hintId: string;
    /** Désactive l'interrupteur */
    disabled?: boolean;
    /** Coche l'interrupteur */
    checked?: boolean;
    /** Ajoute une bordure sous l'interrupteur */
    border?: boolean;
    /** Place le libellé sur la gauche */
    left?: boolean;
    /** Ajoute les libellés "activé"/"désactivé" sous le champ */
    state?: boolean;
    /** Statut du message */
    status?: Status;
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Attribut form du composant */
    form?: string;
    /** Attribut required de la checkbox */
    required?: boolean;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    hint,
    hintId,
    disabled = false,
    checked = $bindable(),
    border = false,
    left = false,
    state = false,
    status = "default",
    errorMessage,
    validMessage,
    form,
    required,
    ...restProps
  }: Props = $props();

  const messagesGroupId = $derived(`${id}-messages`);
  const ariaDescribedBy = $derived.by(() => {
    const ids = [];

    if (hint) ids.push(hintId);
    if (status === "error" || status === "valid") ids.push(messagesGroupId);

    return ids.join(" ") || undefined;
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.checked);
  }
</script>

<div
  class={["fr-toggle", `fr-toggle--${status}`]}
  class:fr-toggle--border-bottom={border}
  class:fr-toggle--label-left={left}
>
  <input
    type="checkbox"
    class="fr-toggle__input"
    aria-describedby={ariaDescribedBy}
    {id}
    {disabled}
    bind:checked
    onchange={handleChange}
    {form}
    {required}
    {...restProps}
  />
  <label
    for={id}
    class="fr-toggle__label"
    data-fr-checked-label={state ? "Activé" : undefined}
    data-fr-unchecked-label={state ? "Désactivé" : undefined}
    style={state ? "--toggle-status-width: 2.5rem;" : undefined}
  >
    <span>{label}</span>
  </label>
  {#if hint}
    <p id={hintId} class="fr-hint-text">
      {hint}
    </p>
  {/if}
  {#if status !== "default"}
    <div class="fr-messages-group" id={messagesGroupId} aria-live="polite">
      <p class={["fr-message", `fr-message--${status}`]} id={`${messagesGroupId}-${status}`}>
        {validMessage || errorMessage}
      </p>
    </div>
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Components
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/toggle/toggle.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("toggle") {
    input[type="checkbox"] {
      &:checked ~ .fr-toggle__label {
        &::after,
        &::before {
          --data-uri-svg: none;
        }

        &::before {
          background-color: var(--background-active-blue-france);
        }

        span::after {
          --color-icon-check: var(--border-action-high-blue-france);

          @include set-icon-check(var(--color-icon-check)) {
            left: calc(40px - 20px);
            position: absolute;
            top: 6px;
            z-index: 1;
          }
        }
      }

      &:disabled ~ .fr-toggle__label {
        &::before {
          --data-uri-svg: none;
          --color-label-shadow: var(--border-disabled-grey);
        }

        span::after {
          --color-icon-check: var(--text-disabled-grey);
        }
      }
    }

    label::before {
      --data-uri-svg: none;
      box-shadow: inset 0 0 0 1px var(--color-label-shadow, currentColor);
    }

    &--label-left input[type="checkbox"]:checked ~ .fr-toggle__label {
      span::after {
        left: calc(100% - 20px);
      }
    }
  }

  //
</style>
