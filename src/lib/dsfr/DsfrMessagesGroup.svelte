<svelte:options
  customElement={{
    tag: "dsfr-messages-group",
    props: {
      id: { attribute: "id", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      warningMessage: { attribute: "warning-message", type: "String" },
      spaced: { attribute: "spaced", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  interface Props {
    /** Attribut id du groupe de messages */
    id: string;
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message d'information */
    infoMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Texte du message d'avertissement */
    warningMessage?: string;
    /** Indique si le composant est espacé de son parent */
    spaced?: boolean;
  }

  let {
    id,
    errorMessage,
    validMessage,
    infoMessage,
    warningMessage,
    spaced = false,
  }: Props = $props();

  let showErrorMessage = $derived(!!errorMessage);
  let showValidMessage = $derived(!showErrorMessage && !!validMessage);
</script>

{#snippet message(status: string, message: string)}
  <p id="{id}-message-{status}" class="fr-message fr-message--{status}">
    {message}
  </p>
{/snippet}

<div
  class="fr-messages-group"
  class:fr-messages-group--spaced={spaced}
  id={`${id}-messages`}
  aria-live="polite"
>
  {#if showErrorMessage}
    <!-- Error Message -->
    {@render message("error", errorMessage)}
  {:else if showValidMessage}
    <!-- Valid Message -->
    {@render message("valid", validMessage)}
  {/if}

  <!-- Warning Message -->
  {#if warningMessage}
    {@render message("warning", warningMessage)}
  {/if}

  <!-- Info Message -->
  {#if infoMessage}
    {@render message("info", infoMessage)}
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/message";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();

  @include set-shadow-host();
  @include set-dsfr-sizing("messages-group") {
    &--spaced {
      .fr-message:first-child {
        margin-top: 1rem;
      }
    }
  }
</style>
