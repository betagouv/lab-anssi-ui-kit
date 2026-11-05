<svelte:options
  customElement={{
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hint: { attribute: "hint", type: "String" },
      name: { attribute: "name", type: "String", reflect: true },
      accept: { attribute: "accept", type: "String" },
      multiple: { attribute: "multiple", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      required: { attribute: "required", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      form: { attribute: "form", type: "String", reflect: true },
      labelSize: { attribute: "label-size", type: "String" },
      labelWeight: { attribute: "label-weight", type: "String" },
    },
    extend: avecEnregistrementIdempotent("dsfr-upload", (CustomElementClass) => {
      return class extends CustomElementClass {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }
      };
    }),
  }}
/>

<script lang="ts">
  import type { TextSize, TextWeight } from "$lib/types";
  import { avecEnregistrementIdempotent, setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  interface Props {
    /** Attribut id du champ d'upload */
    id: string;
    /** Libellé du champ d'upload */
    label: string;
    /** Texte additionnel sous le libellé (ex: taille max, formats supportés) */
    hint?: string;
    /** Attribut name du champ d'upload */
    name?: string;
    /** Types de fichiers acceptés (ex: ".jpg,.png,.pdf") */
    accept?: string;
    /** Permet la sélection de plusieurs fichiers */
    multiple?: boolean;
    /** Désactive le champ d'upload */
    disabled?: boolean;
    /** Rend le champ d'upload obligatoire */
    required?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error" | "info";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Texte du message d'information */
    infoMessage?: string;
    /** Attribut form du composant */
    form?: string;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Callback appelé lors du changement de fichier(s) */
    onvaluechanged?: (files: FileList | null) => void;
    /** Applique une classe utilitaire de taille de texte DSFR sur le label */
    labelSize?: TextSize;
    /** Applique une classe utilitaire de graisse DSFR sur le label */
    labelWeight?: TextWeight;
  }

  let {
    id,
    label,
    hint,
    name,
    accept,
    multiple,
    disabled,
    required,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    form,
    internals,
    onvaluechanged,
    labelSize,
    labelWeight,
  }: Props = $props();

  let hostElement: HTMLElement = $host();
  setThemeable(hostElement);

  let formControlElement: HTMLInputElement;

  const formValidation = createFormValidation();

  const isUserControlled = $derived(status !== "default");

  const computedStatus = $derived(isUserControlled ? status : formValidation.localStatus);
  const computedErrorMessage = $derived(
    isUserControlled ? errorMessage : formValidation.localErrorMessage,
  );

  const disabledClass = $derived(disabled && "fr-upload-group--disabled");
  const statusClass = $derived(
    computedStatus !== "info" &&
      computedStatus !== "default" &&
      `fr-upload-group--${computedStatus}`,
  );

  /**
   * Synchronise la valeur du champ de formulaire avec les fichiers sélectionnés.
   *
   * Si plusieurs fichiers sont sélectionnés et que le champ autorise plusieurs fichiers,
   * on construit un FormData pour représenter l'ensemble des fichiers. Sinon, on envoie
   * simplement le premier fichier sélectionné. Si aucun fichier n'est présent, la valeur
   * du formulaire est vidée.
   *
   * @param {FileList | null} files - La liste des fichiers sélectionnés dans l'input.
   */
  function syncFileFormValue(files: FileList | null) {
    if (!internals) return;

    if (files && files.length > 0) {
      if (multiple) {
        const formData = new FormData();
        for (const file of files) {
          formData.append(name ?? id, file);
        }
        internals.setFormValue(formData);
      } else {
        internals.setFormValue(files[0]);
      }
    } else {
      internals.setFormValue(null);
    }
  }

  /**
   * Gère la sélection de fichiers dans l'input d'upload.
   * Synchronise la valeur du champ avec le formulaire, valide le composant,
   * déclenche le callback utilisateur et émet un événement de changement.
   *
   * @param {Event} event - L'événement de changement émis par l'input file.
   */
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    syncFileFormValue(files);

    if (isUserControlled) {
      internals?.setValidity({});
    } else {
      formValidation.updateValidity();
    }

    onvaluechanged?.(files);
    hostElement?.dispatchEvent(new CustomEvent("valuechanged", { detail: files, bubbles: true }));
  }

  /**
   * Définit un message de validité personnalisé pour l'input.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  // Configure la validation avec les références nécessaires
  $effect(() => {
    formValidation.setup(internals, formControlElement, hostElement, () => {
      if (formControlElement) {
        formControlElement.value = "";
      }

      syncFileFormValue(null);
    });
  });

  $effect(() => {
    void required;

    if (!internals || !formControlElement) return;

    syncFileFormValue(formControlElement.files);

    if (isUserControlled) {
      internals.setValidity({});
    } else {
      formValidation.updateValidity();
    }
  });

  // Attache les event listeners pour la validation
  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<div class={["fr-upload-group", disabledClass, statusClass]}>
  <DsfrLabel
    for={id}
    {label}
    {hint}
    context="field"
    {status}
    {disabled}
    {labelSize}
    {labelWeight}
  />
  <input
    bind:this={formControlElement}
    type="file"
    {id}
    class="fr-upload"
    {name}
    {accept}
    {multiple}
    {disabled}
    {required}
    {form}
    aria-describedby={computedStatus !== "default" ? `${id}-messages` : undefined}
    onchange={handleChange}
    onblur={formValidation.handleBlur}
    oninvalid={formValidation.handleInvalid}
  />

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={computedErrorMessage}
        {validMessage}
        {infoMessage}
      />
    {/if}
  </slot>
</div>

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/upload/upload.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("upload-group");
</style>
