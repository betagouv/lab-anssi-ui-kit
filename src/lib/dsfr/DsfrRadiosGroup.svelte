<svelte:options
  customElement={{
    tag: "dsfr-radios-group",
    props: {
      id: { attribute: "id", type: "String", reflect: true },
      legend: { attribute: "legend", type: "String" },
      radios: { attribute: "radios", type: "Object" },
      hint: { attribute: "hint", type: "String" },
      size: { attribute: "size", type: "String" },
      inline: { attribute: "inline", type: "Boolean" },
      name: { attribute: "name", type: "String", reflect: true },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      value: { attribute: "value", type: "String", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
      required: { attribute: "required", type: "Boolean" },
      legendSize: { attribute: "legend-size", type: "String" },
      legendWeight: { attribute: "legend-weight", type: "String" },
    },
    extend: (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }
      };
    },
  }}
/>

<script lang="ts">
  import type { Size, TextSize, TextWeight } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  setThemeable($host());

  type RadiosSize = Extract<Size, "sm" | "md">;
  type Radio = {
    id: string;
    label: string;
    value?: string;
    name?: string;
    hint?: string;
    disabled?: boolean;
    form?: string;
    required?: boolean;
  };

  interface Props {
    /** Attribut id du formulaire */
    id: string;
    /** Légende de l'ensemble des checkboxes */
    legend: string;
    /** Liste de radio */
    radios: Radio[];
    /** Texte additionnel sous la légende principale du composant */
    hint?: string;
    /** Taille des checkboxes */
    size?: RadiosSize;
    /** Passe en mode radios riches (ajoute un encadré et la possibilité d'associer un pictogramme) */
    rich?: boolean;
    /** Ajoute un pictogramme au radio riche */
    hasPictogram?: boolean;
    /** Eléments du formulaire en ligne */
    inline?: boolean;
    /** Attribut name applicable sur l'ensemble des radios buttons */
    name?: string;
    /** Désactive l'ensemble des radios */
    disabled?: boolean;
    /** Valeur des radios */
    value?: string;
    /** Statut du message */
    status?: "default" | "valid" | "error";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Attribut form du composant */
    form?: string;
    /** Attribut required du composant */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur la légende */
    legendSize?: TextSize;
    /** Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur la légende */
    legendWeight?: TextWeight;
  }

  let {
    id,
    legend,
    radios,
    hint,
    size = "md",
    rich,
    hasPictogram,
    inline,
    name,
    disabled,
    value = $bindable(),
    status = "default",
    errorMessage,
    validMessage,
    form,
    required,
    internals,
    legendSize,
    legendWeight,
  }: Props = $props();

  let firstRadioElement: HTMLInputElement;
  let host = $host();

  // Création de l'état de validation partagé
  const formValidation = createFormValidation();

  // Détermine si l'utilisateur a pris la main sur le status
  const isUserControlled = $derived(status !== "default");

  // Status et message calculés à afficher
  const computedStatus = $derived(isUserControlled ? status : formValidation.localStatus);
  const computedErrorMessage = $derived(
    isUserControlled ? errorMessage : formValidation.localErrorMessage,
  );

  /**
   * Gère l'événement change du groupe de radios.
   * Met à jour la valeur et déclenche l'événement 'valuechanged'.
   */
  function handleChange() {
    host.dispatchEvent(new CustomEvent("valuechanged", { detail: value, bubbles: true }));
  }

  /**
   * Capture la référence du premier input radio pour la validation.
   */
  function captureFirstRadio(node: HTMLInputElement) {
    if (!firstRadioElement) {
      firstRadioElement = node;
    }
  }

  /**
   * Définit un message de validité personnalisé pour le groupe de radios.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  // Configure la validation avec les références nécessaires
  // Pour un groupe de radios, on utilise le premier input radio comme référence
  // car c'est lui qui porte l'état de validité (required)
  $effect(() => {
    formValidation.setup(internals, firstRadioElement, host, () => {
      value = "";
    });
  });

  // Synchronise la valeur du formulaire et met à jour la validité
  $effect(() => {
    formValidation.syncFormValue(value, isUserControlled);
  });

  // Quand l'utilisateur prend la main sur le status, on efface les erreurs de validation natives
  $effect(() => {
    if (isUserControlled) {
      internals?.setValidity({});
    }
  });

  // Attache les event listeners pour la validation
  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<fieldset
  class={["fr-fieldset", `fr-fieldset--${computedStatus}`]}
  aria-labelledby={`${id}-legend ${id}-messages`}
  role="group"
  {id}
  {disabled}
  {form}
>
  <legend class="fr-fieldset__legend--regular fr-fieldset__legend" id={`${id}-legend`}>
    <span
      class={[legendSize && `fr-text--${legendSize}`, legendWeight && `fr-text--${legendWeight}`]}
    >
      {legend}
    </span>

    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>

  {#each radios as radio (radio.id)}
    <div class={["fr-fieldset__element", inline && "fr-fieldset__element--inline"]}>
      <div class={["fr-radio-group", `fr-radio-group--${size}`]}>
        <input
          type="radio"
          id={radio.id}
          {name}
          value={radio.value}
          bind:group={value}
          onchange={handleChange}
          onblur={formValidation.handleBlur}
          oninvalid={formValidation.handleInvalid}
          use:captureFirstRadio
          disabled={radio.disabled}
          {form}
          {required}
        />
        <label class="fr-label" for={radio.id}>
          {radio.label}
          {#if radio.hint}
            <span class="fr-hint-text">{radio.hint}</span>
          {/if}
        </label>
      </div>
    </div>
  {/each}

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
        {validMessage}
        context="fieldset"
      />
    {/if}
  </slot>
</fieldset>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/typography";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/font-weight";
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
