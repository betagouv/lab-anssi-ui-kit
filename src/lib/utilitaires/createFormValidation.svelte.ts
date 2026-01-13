/**
 * Crée un état de validation pour les composants de formulaire.
 * Encapsule la logique de validation des contraintes HTML pour les custom elements.
 *
 * @returns Un objet contenant l'état de validation et les méthodes associées
 *
 * @example
 * ```typescript
 * const validation = createFormValidation();
 *
 * // Dans un $effect
 * validation.setup(internals, formControlElement, host, () => value);
 *
 * // Dans le template
 * <input
 *   bind:this={formControlElement}
 *   onblur={validation.handleBlur}
 *   oninvalid={validation.handleInvalid}
 * />
 * ```
 */
export function createFormValidation() {
  let customValidityMessage = $state("");
  let hasInteracted = $state(false);
  let localStatus = $state<"default" | "error">("default");
  let localErrorMessage = $state("");

  let internals: ElementInternals | undefined;
  let formControlElement:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | HTMLFieldSetElement
    | undefined;
  let host: HTMLElement | undefined;
  let resetValueCallback: (() => void) | undefined;

  /**
   * Met à jour la validité du champ de formulaire.
   * Vérifie les messages de validité personnalisés et la validité native du formulaire.
   * Met à jour l'état local et le message d'erreur si l'utilisateur a interagi avec le champ.
   */
  function updateValidity() {
    if (!internals || !formControlElement) return;

    if (customValidityMessage) {
      internals.setValidity({ customError: true }, customValidityMessage, formControlElement);

      if (hasInteracted) {
        localStatus = "error";
        localErrorMessage = customValidityMessage;
      }
    } else if (!formControlElement.validity.valid) {
      internals.setValidity(
        formControlElement.validity,
        formControlElement.validationMessage,
        formControlElement,
      );

      if (hasInteracted) {
        localStatus = "error";
        localErrorMessage = formControlElement.validationMessage;
      }
    } else {
      internals.setValidity({});

      if (hasInteracted) {
        localStatus = "default";
        localErrorMessage = "";
      }
    }
  }

  /**
   * Gère l'événement blur du champ de formulaire.
   * Marque le composant comme ayant interagi si la valeur n'est pas vide.
   *
   * @param {Event} event - L'événement blur déclenché
   */
  function handleBlur(event: Event) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLFieldSetElement;

    // Pour les fieldsets, on vérifie différemment car ils n'ont pas de propriété value
    if (formControlElement instanceof HTMLFieldSetElement) {
      if (!hasInteracted) {
        hasInteracted = true;
        updateValidity();
      }
    } else if (!hasInteracted && "value" in target && target.value) {
      hasInteracted = true;
      updateValidity();
    }
  }

  /**
   * Gère l'événement invalid du champ de formulaire.
   * Marque le composant comme ayant interagi et met à jour la validité.
   *
   * @param {Event} event - L'événement invalid déclenché
   */
  function handleInvalid(event: Event) {
    event.preventDefault();
    hasInteracted = true;
    updateValidity();
  }

  /**
   * Gère l'événement formreset du formulaire.
   * Réinitialise l'état du composant lors du reset du formulaire.
   */
  function handleFormReset() {
    if (resetValueCallback) {
      resetValueCallback();
    }

    hasInteracted = false;
    localStatus = "default";
    localErrorMessage = "";
    customValidityMessage = "";

    if (internals) {
      internals.setValidity({});
    }
  }

  /**
   * Définit un message de validité personnalisé pour le champ.
   * Met à jour le message de validité personnalisé et déclenche la vérification de validité.
   *
   * @param {string} message - Le message de validité personnalisé à définir
   */
  function setCustomValidity(message: string) {
    customValidityMessage = message;
    updateValidity();
  }

  /**
   * Configure la validation avec les références nécessaires.
   * Cette méthode doit être appelée dans un $effect pour établir les liaisons.
   *
   * @param {ElementInternals} internalsRef - L'interface ElementInternals du custom element
   * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLFieldSetElement} element - L'élément de formulaire natif
   * @param {HTMLElement} hostElement - L'élément hôte du custom element
   * @param {() => void} resetCallback - Fonction pour réinitialiser la valeur lors du reset
   */
  function setup(
    internalsRef: ElementInternals | undefined,
    element:
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLFieldSetElement
      | undefined,
    hostElement: HTMLElement | undefined,
    resetCallback: () => void,
  ) {
    internals = internalsRef;
    formControlElement = element;
    host = hostElement;
    resetValueCallback = resetCallback;
  }

  /**
   * Synchronise la valeur du formulaire et met à jour la validité.
   * À appeler dans un $effect qui observe les changements de valeur.
   *
   * @param {string | undefined} value - La valeur actuelle du champ
   */
  function syncFormValue(value: string | undefined) {
    if (!internals || !formControlElement) return;

    internals.setFormValue(value ?? "");
    updateValidity();
  }

  /**
   * Attache les event listeners pour la validation.
   * À appeler dans un $effect pour gérer le cycle de vie.
   *
   * @returns Fonction de cleanup pour retirer les listeners
   */
  function attachListeners() {
    if (!host || !internals) return;

    host.addEventListener("invalid", handleInvalid);
    internals.form?.addEventListener("reset", handleFormReset);

    return () => {
      host?.removeEventListener("invalid", handleInvalid);
      internals?.form?.removeEventListener("reset", handleFormReset);
    };
  }

  return {
    // État réactif
    get customValidityMessage() {
      return customValidityMessage;
    },
    get hasInteracted() {
      return hasInteracted;
    },
    get localStatus() {
      return localStatus;
    },
    get localErrorMessage() {
      return localErrorMessage;
    },

    // Méthodes
    setup,
    updateValidity,
    handleBlur,
    handleInvalid,
    setCustomValidity,
    syncFormValue,
    attachListeners,
  };
}
