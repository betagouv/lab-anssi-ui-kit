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

export const trapFocus: Action<HTMLElement> = (element: HTMLElement) => {
  const allFocusableElements = element.querySelectorAll<HTMLElement>(
    "input,button,textarea,a,[tabindex]:not([tabindex='-1'])",
  );
  const firstFocusableElement = allFocusableElements[0];
  const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Tab") {
      if (event.shiftKey) {
        // Shift + Tab
        if (event.target === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (event.target === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
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
