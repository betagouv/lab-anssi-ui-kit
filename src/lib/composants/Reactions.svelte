<svelte:options
  customElement={{
    tag: "lab-anssi-reactions",
    props: {
      reactions: { attribute: "reactions", type: "Array" },
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
    reactions?: Reaction[];
  }

  const { reactions = [] }: Props = $props();

  let dispatch = createEventDispatcher<{ ajoutereaction: string; supprimereaction: string }>();

  /**
   * Positionne dynamiquement le popover au-dessus du bouton déclencheur.
   *
   * @param {ToggleEvent} event - L'événement de bascule du popover.
   */
  function handlePopoverPosition(event: ToggleEvent) {
    const GAP = 4; // Espace entre le bouton et le popover

    const popover = event.currentTarget as HTMLElement;
    const popoverId = popover.getAttribute("id");
    if (!popoverId) return;

    const parent = popover.closest(".lab-anssi-reactions");

    const button = parent.querySelector(`[popovertarget="${popoverId}"]`) as HTMLElement;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    const popoverTop = buttonRect.top - popoverRect.height - GAP;
    const popoverLeft = buttonRect.left;

    popover.style.top = `${popoverTop + window.scrollY}px`;
    popover.style.left = `${popoverLeft + window.scrollX}px`;

    if (event.newState === "open") {
      popover.style.opacity = "1";
    } else {
      popover.style.opacity = "0";
    }
  }

  function gestionClicReaction(event: MouseEvent) {
    const bouton = event.currentTarget as HTMLButtonElement;
    const ariaPressed = bouton.ariaPressed;
    const estActif = ariaPressed === "true";

    bouton.ariaPressed = (!estActif).toString();
    if (estActif) {
      dispatch("supprimereaction", bouton.id);
    } else {
      dispatch("ajoutereaction", bouton.id);
    }
  }
</script>

{#snippet boutonReaction({ id, emoji, compteur = null, actif = false })}
  <button
    {id}
    type="button"
    class="lab-anssi-reactions__bouton"
    onclick={gestionClicReaction}
    aria-pressed={compteur ? actif : undefined}
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

<div class="lab-anssi-reactions">
  <div class="lab-anssi-reactions__conteneur">
    <button type="button" class="lab-anssi-reactions__declencheur" popovertarget="tooltipReactions">
      <span class="lab-anssi-reactions__icone">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
          ><path
            d="M15 18H18V15H20V18H23V20H20V23H18V20H15V18M12 17.5C9.67 17.5 7.69 16.04 6.89 14H15.69C14.5 14.78 13.62 15.97 13.23 17.36C12.83 17.45 12.42 17.5 12 17.5M8.5 11C7.67 11 7 10.33 7 9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5C10 10.33 9.33 11 8.5 11M15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5C17 10.33 16.33 11 15.5 11M12 20L13.07 19.93C13.18 20.61 13.4 21.26 13.72 21.85C13.16 21.95 12.58 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2C17.5 2 22 6.5 22 12C22 12.59 21.95 13.16 21.85 13.72C21.26 13.4 20.62 13.18 19.93 13.07L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
          /></svg
        >
      </span>
      <span class="lab-anssi-reactions__action">Ajouter une réaction</span>
    </button>

    {#each reactions as reaction (reaction.id)}
      {@render boutonReaction(reaction)}
    {/each}
  </div>

  <div
    id="tooltipReactions"
    class="lab-anssi-reactions__tooltip"
    popover
    ontoggle={handlePopoverPosition}
  >
    <div class="lab-anssi-reactions__conteneur">
      {#each reactions as { id, emoji } (id)}
        {@render boutonReaction({ id, emoji })}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .lab-anssi-reactions {
    box-sizing: border-box;

    &__conteneur {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__declencheur,
    &__bouton {
      --active-tint: var(--active);
      --hover-tint: var(--hover);

      appearance: none;
      background-color: var(--background-color, transparent);
      border-width: 0;
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

    &__tooltip {
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
  }
</style>
