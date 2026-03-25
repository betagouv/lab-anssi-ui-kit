<svelte:options
  customElement={{
    tag: "dsfr-messages-group",
    props: {
      id: { attribute: "id", type: "String" },
      messages: { attribute: "messages", type: "Object" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      context: { attribute: "context", type: "String" },
    },
  }}
/>

<script lang="ts">
  /**
   * Structure de messages contrainte :
   * - `errors` et `valids` sont mutuellement exclusifs (union discriminée)
   * - `infos` et `warnings` peuvent coexister avec n'importe quel statut
   */
  export type MessagesGroup =
    | { errors: string[]; valids?: never; infos?: string[]; warnings?: string[] }
    | { valids: string[]; errors?: never; infos?: string[]; warnings?: string[] }
    | { errors?: never; valids?: never; infos?: string[]; warnings?: string[] };

  type ResolvedMessage = {
    type: "error" | "valid" | "info" | "warning";
    text: string;
  };

  interface Props {
    /** Attribut id du champ parent, utilisé pour générer les IDs des messages */
    id: string;
    /** API avancée : messages structurés (erreurs et succès sont mutuellement exclusifs) */
    messages?: MessagesGroup;
    /** Statut du message (API simplifiée) */
    status?: "default" | "valid" | "error" | "info";
    /** Texte du message d'erreur (API simplifiée) */
    errorMessage?: string;
    /** Texte du message de succès (API simplifiée) */
    validMessage?: string;
    /** Texte du message d'information (API simplifiée) */
    infoMessage?: string;
    /**
     * Contexte d'affichage du composant.
     * - "field" (défaut) : le premier message reçoit une marge supérieure (input, select, checkbox, toggle…)
     * - "fieldset" : le groupe reçoit un layout flex avec padding, et le dernier message une marge inférieure
     */
    context?: "field" | "fieldset";
  }

  const {
    id,
    messages,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    context = "field",
  }: Props = $props();

  function toResolved(type: ResolvedMessage["type"], texts: string[] = []): ResolvedMessage[] {
    return texts.map((text) => ({ type, text }));
  }

  const resolvedMessages = $derived.by<ResolvedMessage[]>(() => {
    if (messages) {
      return [
        ...toResolved("error", messages.errors),
        ...toResolved("valid", messages.valids),
        ...toResolved("warning", messages.warnings),
        ...toResolved("info", messages.infos),
      ];
    }

    if (status === "default") return [];

    const text = validMessage || errorMessage || infoMessage;
    if (!text) return [];

    return [{ type: status as ResolvedMessage["type"], text }];
  });

  const messageIds = $derived.by(() => {
    const counts: Partial<Record<ResolvedMessage["type"], number>> = {};
    return resolvedMessages.map(({ type }) => {
      const count = counts[type] ?? 0;
      counts[type] = count + 1;
      return `${id}-message-${type}${count > 0 ? `-${count}` : ""}`;
    });
  });
</script>

{#if resolvedMessages.length > 0}
  <div
    class="fr-messages-group"
    class:fr-messages-group--field={context === "field"}
    class:fr-messages-group--fieldset={context === "fieldset"}
    id={`${id}-messages`}
    aria-live="polite"
  >
    {#each resolvedMessages as message, i}
      <p class={["fr-message", `fr-message--${message.type}`]} id={messageIds[i]}>
        {message.text}
      </p>
    {/each}
  </div>
{/if}

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/message";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();

  @include set-shadow-host();
  @include set-dsfr-sizing("messages-group") {
    &--field {
      // Contexte field (défaut) : input, select, checkbox, toggle…
      // Le premier message reçoit une marge supérieure pour l'espacer du champ
      .fr-message:first-child {
        margin-top: 1rem;
      }
    }

    // Contexte fieldset : checkboxes-group, radios-group
    // Le conteneur adopte le layout flex du fieldset, le dernier message reçoit une marge inférieure
    &--fieldset {
      flex: 1 1 100%;
      padding-left: 0.5rem;
      padding-right: 0.5rem;

      .fr-message:first-child {
        margin-top: 0;
      }

      .fr-message:last-child {
        margin-bottom: 1rem;
      }
    }
  }
</style>
