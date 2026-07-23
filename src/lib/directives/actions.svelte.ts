import type { Action } from "svelte/action";

export const clickOutside: Action<HTMLElement, () => void> = (
  element: HTMLElement,
  callbackFunction: () => void,
) => {
  const handleClick = (event: MouseEvent) => {
    if (!element.contains(event.target as HTMLElement)) {
      callbackFunction();
    }
  };

  $effect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  });
};

export const pressEscape: Action<HTMLElement, () => void> = (
  element: HTMLElement,
  callbackFunction: () => void,
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      callbackFunction();
    }
  };

  $effect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  });
};

export const stopPropagation: Action<HTMLElement> = (element: HTMLElement) => {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  $effect(() => {
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("click", handleClick);
    };
  });
};

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Collecte récursivement tous les éléments focusables dans un conteneur,
 * y compris ceux dans les slots et les Shadow DOM.
 *
 * @param root - L'élément racine ou la Shadow Root à analyser.
 * @param result - Le tableau où stocker les éléments focusables trouvés.
 */
function collectFocusables(root: HTMLElement | ShadowRoot, result: HTMLElement[]) {
  root.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS).forEach((el) => {
    result.push(el);
  });

  root.querySelectorAll("slot").forEach((slot) => {
    slot.assignedElements({ flatten: true }).forEach((el) => {
      if (el instanceof HTMLElement) {
        if (el.matches(FOCUSABLE_ELEMENTS)) result.push(el);

        result.push(...el.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));

        if (el.shadowRoot) collectFocusables(el.shadowRoot, result);
      }
    });
  });

  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    if (el.shadowRoot && !el.matches(FOCUSABLE_ELEMENTS)) {
      collectFocusables(el.shadowRoot, result);
    }
  });
}

/**
 * Récupère tous les éléments focusables contenus dans un élément donné.
 * Parcourt l'élément et tous ses descendants pour collecter les éléments focusables.
 *
 * @param element - L'élément conteneur à analyser.
 *
 * @returns Un tableau contenant tous les éléments focusables trouvés.
 */
function getFocusableElements(element: HTMLElement): HTMLElement[] {
  const elements: HTMLElement[] = [];

  collectFocusables(element, elements);

  return elements;
}

/**
 * Action Svelte qui restreint le focus à l'intérieur d'un élément.
 * Empêche la navigation au clavier (Tab) de sortir du conteneur en boucle le focus
 * entre le premier et le dernier élément focusable.
 *
 * @param element - L'élément conteneur dans lequel piéger le focus.
 */
export const trapFocus: Action<HTMLElement> = (element: HTMLElement) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const focusables = getFocusableElements(element);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    let active: Element | null = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }

    if (event.shiftKey) {
      if (active === first || !focusables.includes(active as HTMLElement)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last || !focusables.includes(active as HTMLElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  $effect(() => {
    element.addEventListener("keydown", handleKeyDown);
    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  });
};

/**
 * Action Svelte : crée par programmation un élément <slot name="..."> à l'intérieur de l'élément.
 *
 * Cette action contourne la restriction de Svelte concernant les noms de slot dynamiques.
 * Ne fait rien si slotName est nul.
 */
export function createSlot(node: HTMLElement, slotName: string | null) {
  if (!slotName) return;

  const slot = document.createElement("slot");
  slot.name = slotName;

  // Déplace le contenu existant dans le slot comme contenu de secours
  while (node.firstChild) {
    slot.appendChild(node.firstChild);
  }
  node.appendChild(slot);

  return {
    update(newSlotName: string | null) {
      if (newSlotName) slot.name = newSlotName;
    },
    destroy() {
      // Restaurer le contenu avant de supprimer l'élément slot
      while (slot.firstChild) {
        node.insertBefore(slot.firstChild, slot);
      }
      slot.remove();
    },
  };
}

/**
 * Action Svelte qui applique l'état `indeterminate` à une case à cocher.
 *
 * @param node - L'élément input de type checkbox à mettre à jour.
 * @param value - L'état initial indéterminé à appliquer.
 * @returns Un objet avec une méthode `update` pour synchroniser les changements de valeur.
 */
export function setIndeterminate(node: HTMLInputElement, value: boolean) {
  node.indeterminate = value;

  return {
    update(newValue: boolean) {
      node.indeterminate = newValue;
    },
  };
}
