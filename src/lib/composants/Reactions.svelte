<svelte:options
  customElement={{
    tag: "lab-anssi-reactions",
    props: {
      reactions: { attribute: "reactions", type: "Array" },
      variant: { attribute: "variant", type: "String" },
      tooltipTexte: { attribute: "tooltip-texte", type: "String" },
      tooltipId: { attribute: "tooltip-id", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type Reaction = {
    id: string;
    emoji: string;
    compteur?: number | null;
    actif?: boolean;
  };
  interface Props {
    /** Liste des réactions */
    reactions?: Reaction[];
    /** Style des boutons de réaction<br>Valeurs :<br>- tertiaire : boutons avec bordure<br>- tertiaire-sans-bordure : boutons sans bordure */
    variant?: "tertiaire" | "tertiaire-sans-bordure";
    /** Contenu de l'infobulle */
    tooltipTexte?: string;
    /** Identifiant de l'infobulle */
    tooltipId?: string;
  }

  let {
    reactions = [],
    variant = "tertiaire-sans-bordure",
    tooltipTexte,
    tooltipId,
  }: Props = $props();

  let tooltipShown = $state(false);
  let popoverShown = $state(false);

  let popoverElement: HTMLElement | null = null;
  let tooltipElement: HTMLElement | null = null;
  let triggerButton: HTMLElement | null = null;

  let dispatch = createEventDispatcher<{ ajouteReaction: string; supprimeReaction: string }>();

  /**
   * Positionne dynamiquement le popover au-dessus du bouton déclencheur.
   *
   * @param {ToggleEvent} event - L'événement de bascule du popover.
   */
  function handlePopover(event: ToggleEvent) {
    if (!popoverElement) return;

    const GAP = 4;

    const popoverId = popoverElement.getAttribute("id");
    if (!popoverId) return;

    const parent = popoverElement.closest(".lab-anssi-reactions");
    const button = parent?.querySelector(`[popovertarget="${popoverId}"]`) as HTMLElement;
    if (!button) return;

    if (event.newState === "open") {
      popoverShown = true;

      // Récupération des dimensions
      const buttonRect = button.getBoundingClientRect();
      const popoverRect = popoverElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Marges de sécurité
      const VERTICAL_MARGIN = 8;

      // Position par défaut : au-dessus et aligné à gauche du bouton
      let top = buttonRect.top - popoverRect.height - GAP;
      let left = buttonRect.left;

      // Ajustement vertical : si pas assez de place en haut, placer en bas
      if (top < VERTICAL_MARGIN) {
        top = buttonRect.bottom + GAP;

        if (top + popoverRect.height > viewportHeight - VERTICAL_MARGIN) {
          top = Math.max(VERTICAL_MARGIN, (viewportHeight - popoverRect.height) / 2);
        }
      }

      // Application des positions finales
      popoverElement.style.top = `${top}px`;
      popoverElement.style.left = `${left}px`;
      popoverElement.style.opacity = "1";
    } else {
      popoverShown = false;
      popoverElement.style.opacity = "0";
    }
  }

  /**
   * Gère la position du popover lors du défilement de la page.
   * Recalcule et ajuste automatiquement la position verticale du popover
   * pour qu'il reste visible dans la fenêtre d'affichage.
   * Masque également le tooltip si celui-ci est affiché.
   *
   * @returns {void}
   */
  function handlePopoverScroll() {
    if (!popoverShown || !popoverElement || !triggerButton) return;

    tooltipShown = false;

    const GAP = 4;

    // Récupération des nouvelles dimensions après scroll
    const buttonRect = triggerButton.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const VERTICAL_MARGIN = 8;

    // Recalcul de la position verticale
    let newTop = buttonRect.top - popoverRect.height - GAP;

    // Ajustement vertical si nécessaire
    if (newTop < VERTICAL_MARGIN) {
      newTop = buttonRect.bottom + GAP;

      if (newTop + popoverRect.height > viewportHeight - VERTICAL_MARGIN) {
        newTop = Math.max(VERTICAL_MARGIN, (viewportHeight - popoverRect.height) / 2);
      }
    }

    // Application de la nouvelle position
    popoverElement.style.top = `${newTop}px`;
  }

  /**
   * Gère le clic sur un bouton de réaction.
   *
   * @param {MouseEvent} event - L'événement de clic provenant du bouton de réaction.
   * @fires supprimeReaction - Émis lorsque la réaction est désactivée (détail : bouton.id).
   * @fires ajouteReaction - Émis lorsque la réaction est activée (détail : bouton.id).
   */
  function gestionClicReaction(event: MouseEvent) {
    const bouton = event.currentTarget as HTMLButtonElement;
    const id = bouton.id;

    // Trouve la réaction et récupère son état actuel
    const reaction = reactions.find((reaction) => reaction.id === id);
    const estActif = !!reaction?.actif;
    const nouveauActif = !estActif;

    // Met à jour le tableau de façon réactive
    reactions = reactions.map((reaction) =>
      reaction.id === id ? { ...reaction, actif: nouveauActif } : reaction,
    );

    // Émet un événement en fonction de l'état de la réaction
    if (estActif) {
      dispatch("supprimeReaction", id);
    } else {
      dispatch("ajouteReaction", id);
    }
  }

  /**
   * Gère l'affichage et le positionnement d'un tooltip lors d'un survol de souris.
   *
   * @param {MouseEvent} event - Événement souris du gestionnaire de survol
   * @returns {void}
   */
  function handleTooltip(): void {
    if (!tooltipElement || popoverShown) return;

    const buttonRect = triggerButton.getBoundingClientRect();
    const buttonRectCenter = buttonRect.left + buttonRect.width * 0.5;

    tooltipElement.style.display = "block";

    const tooltipRect = tooltipElement.getBoundingClientRect();

    // Dimensions de la fenêtre
    const viewportWidth = window.innerWidth;

    // Position par défaut : au-dessus et centré
    let top = buttonRect.top - tooltipRect.height;
    let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

    // Ajustement horizontal : éviter que le tooltip sorte des côtés
    const HORIZONTAL_MARGIN = 8;
    if (left < HORIZONTAL_MARGIN) {
      left = HORIZONTAL_MARGIN;
    } else if (left + tooltipRect.width > viewportWidth - HORIZONTAL_MARGIN) {
      left = viewportWidth - tooltipRect.width - HORIZONTAL_MARGIN;
    }

    // Ajustement vertical : si pas assez de place en haut, placer en bas
    const VERTICAL_MARGIN = 8;
    if (top < VERTICAL_MARGIN) {
      top = buttonRect.bottom;
      // Ajouter une classe pour inverser la flèche si nécessaire
      tooltipElement.classList.remove("fr-placement--top");
      tooltipElement.classList.add("fr-placement--bottom");
    } else {
      tooltipElement.classList.remove("fr-placement--bottom");
      tooltipElement.classList.add("fr-placement--top");
    }

    // Application des positions finales
    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.left = `${left}px`;

    // Calcul de la position de la flèche en fonction du décalage horizontal
    const tooltipCenter = left + tooltipRect.width / 2;
    const arrowPosition = buttonRectCenter - tooltipCenter;

    // Limiter la position de la flèche dans les limites du tooltip
    const maxArrowOffset = tooltipRect.width / 2 - 16; // 16px de marge pour la flèche
    const clampedArrowPosition = Math.max(-maxArrowOffset, Math.min(maxArrowOffset, arrowPosition));

    tooltipElement.style.setProperty("--arrow-x", `${clampedArrowPosition.toFixed(2)}px`);

    tooltipShown = true;
  }
</script>

<svelte:window onscroll={handlePopoverScroll} />

{#snippet boutonReaction({ id, emoji, compteur = null, actif = false })}
  <button
    {id}
    type="button"
    class="lab-anssi-reactions__bouton"
    onclick={gestionClicReaction}
    aria-pressed={actif}
  >
    {#if !compteur}
      <span class="lab-anssi-reactions__label">Réagir avec l'emoji</span>
    {/if}

    <span class="lab-anssi-reactions__emoji">{@html emoji}</span>

    {#if compteur}
      <span class="lab-anssi-reactions__compteur">{compteur}</span>
    {/if}
  </button>
{/snippet}

<div class={["lab-anssi-reactions", `lab-anssi-reactions--${variant}`]}>
  <div class="lab-anssi-reactions__conteneur">
    <button
      type="button"
      class="lab-anssi-reactions__declencheur"
      popovertarget="popoverReactions"
      aria-describedby={tooltipId}
      onclick={() => (tooltipShown = false)}
      onblur={() => (tooltipShown = false)}
      onmouseout={() => (tooltipShown = false)}
      onfocus={handleTooltip}
      onmouseover={handleTooltip}
      bind:this={triggerButton}
    >
      <span class="lab-anssi-reactions__icone">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
          ><path
            d="M15 18H18V15H20V18H23V20H20V23H18V20H15V18M12 17.5C9.67 17.5 7.69 16.04 6.89 14H15.69C14.5 14.78 13.62 15.97 13.23 17.36C12.83 17.45 12.42 17.5 12 17.5M8.5 11C7.67 11 7 10.33 7 9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5C10 10.33 9.33 11 8.5 11M15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5C17 10.33 16.33 11 15.5 11M12 20L13.07 19.93C13.18 20.61 13.4 21.26 13.72 21.85C13.16 21.95 12.58 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2C17.5 2 22 6.5 22 12C22 12.59 21.95 13.16 21.85 13.72C21.26 13.4 20.62 13.18 19.93 13.07L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
          /></svg
        >
      </span>
      <span class="lab-anssi-reactions__action">Ajouter une réaction</span>
    </button>
    {#if tooltipTexte}
      <span
        class="fr-tooltip fr-placement fr-placement--start"
        class:fr-tooltip--shown={tooltipShown}
        id={tooltipId}
        role="tooltip"
        bind:this={tooltipElement}
      >
        {tooltipTexte}
      </span>
    {/if}

    {#each reactions as reaction (reaction.id)}
      {#if reaction.compteur}
        {@render boutonReaction(reaction)}
      {/if}
    {/each}
  </div>

  <div
    id="popoverReactions"
    class="lab-anssi-reactions__popover"
    popover
    ontoggle={handlePopover}
    bind:this={popoverElement}
  >
    <div class="lab-anssi-reactions__conteneur">
      {#each reactions as { id, emoji, actif } (id)}
        {@render boutonReaction({ id, emoji, actif })}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/placement/module";
  @import "@gouvfr/dsfr/dist/component/tooltip/tooltip.main.min.css";

  .lab-anssi-reactions {
    box-sizing: border-box;

    &__conteneur {
      display: flex;
      align-items: center;
      gap: var(--gap, 4px);
    }

    &__declencheur,
    &__bouton {
      --active-tint: var(--active);
      --hover-tint: var(--hover);

      appearance: none;
      background-color: var(--background-color, transparent);
      border: 1px solid var(--border-color, transparent);
      cursor: pointer;
      font: inherit;

      &:hover {
        --background-color: var(--hover-tint);
      }

      &:active {
        --background-color: var(--active-tint);
      }
    }

    &__declencheur {
      color: #666666;
      padding: 4px;
      position: relative;
    }

    &__icone {
      svg {
        fill: currentColor;
        display: block;
        height: 24px;
        width: 24px;
      }
    }

    &__action {
      @include visually-hidden();
    }

    &__bouton {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      &[aria-pressed="true"] {
        background-color: var(--background-action-low-blue-france);
        color: var(--text-action-high-blue-france);

        &:hover {
          background-color: var(--background-action-low-blue-france-hover);
        }

        &:active {
          background-color: var(--background-action-low-blue-france-active);
        }
      }
    }

    &__label {
      @include visually-hidden();
    }

    &__popover {
      &:popover-open {
        border-width: 0;
        background-color: #fff;
        padding: 6px;
        border-radius: 4px;
        box-shadow: var(--raised-shadow);
        margin: 0;
        opacity: 0;
      }

      .lab-anssi-reactions__bouton {
        font-size: 18px;
      }
    }

    &--tertiaire {
      & > .lab-anssi-reactions__conteneur {
        --gap: 8px;

        .lab-anssi-reactions {
          &__declencheur,
          &__bouton {
            --border-color: var(--border-default-grey);

            &[aria-pressed="true"] {
              --border-color: var(--border-action-high-blue-france);
            }
          }
        }
      }
    }
  }

  .fr-tooltip {
    pointer-events: none;
  }
</style>
