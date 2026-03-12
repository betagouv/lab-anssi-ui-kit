<svelte:options
  customElement={{
    tag: "dsfr-label",
    props: {
      for: { attribute: "for", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      hidden: { attribute: "hidden", type: "Boolean" },
      id: { attribute: "id", type: "String" },
      class: { attribute: "class", type: "String" },
      context: { attribute: "context", type: "String" },
      inline: { attribute: "inline", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  interface Props {
    /** Attribut for du label (id du champ associé) */
    for: string;
    /** Texte du label */
    label?: string;
    /** Texte additionnel sous le label */
    hint?: string;
    /** Masque visuellement le label tout en le gardant accessible */
    hidden?: boolean;
    /** Attribut id du label */
    id?: string;
    /** Classe(s) additionnelle(s) */
    class?: string;
    /**
     * Contexte d'affichage du composant.
     * - "field" : inside input-group ou select-group → fr-hint-text reçoit une marge supérieure
     * - "default" (défaut) : checkbox, radio, segmented… → pas de marge spécifique
     */
    context?: "field" | "default";
    /** Gère les états du label lorsque celui-ci est aligné horizontalement avec le champ */
    inline?: boolean;
    /**
     * Statut du champ associé, applique la couleur correspondante sur le label.
     * - "error" → fr-label--error
     * - "valid" → fr-label--success
     * - "info"  → fr-label--info
     */
    status?: "default" | "valid" | "error" | "info";
    /** Désactive le label (applique la couleur désactivée) */
    disabled?: boolean;
  }

  const {
    for: forAttr,
    label,
    hint,
    hidden = false,
    id,
    class: extraClass,
    context = "default",
    inline = false,
    status = "default",
    disabled = false,
  }: Props = $props();
</script>

<label
  class={[
    "fr-label",
    extraClass,
    {
      "fr-sr-only": hidden,
      "fr-label--field": context === "field",
      "fr-label--inline": inline,
      "fr-label--error": status === "error",
      "fr-label--success": status === "valid",
      "fr-label--info": status === "info",
      "fr-label--disabled": disabled,
    },
  ]}
  for={forAttr}
  {id}
>
  {label}
  {#if hint}
    <span class="fr-hint-text">{hint}</span>
  {/if}
</label>

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "src/lib/styles/dsfr-label-hint.scss";

  @include set-shadow-host();
  @include set-dsfr-sizing("label") {
    &--field {
      margin-bottom: 0.5rem;

      .fr-hint-text {
        margin-top: 0.25rem;
      }
    }

    &--inline {
      .fr-hint-text {
        margin: 0;
        width: 100%;
      }
    }
  }

  .fr-sr-only {
    @include sr-only();
  }
</style>
