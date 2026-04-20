<svelte:options
  customElement={{
    tag: "dsfr-user",
    props: {
      id: { attribute: "id", type: "String" },
      collapseId: { attribute: "collapse-id", type: "String" },
      buttonId: { attribute: "button-id", type: "String" },
      buttonLabel: { attribute: "button-label", type: "String" },
      buttonKind: { attribute: "button-kind", type: "String" },
      buttonIcon: { attribute: "button-icon", type: "String" },
      align: { attribute: "align", type: "String" },
      userName: { attribute: "user-name", type: "String" },
      userEmail: { attribute: "user-email", type: "String" },
      links: { attribute: "links", type: "Object" },
      disabled: { attribute: "disabled", type: "Boolean" },
      hasLogout: { attribute: "has-logout", type: "Boolean" },
      logoutLabel: { attribute: "logout-label", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Kind } from "$lib/types";
  import { clickOutside } from "$lib/directives/actions.svelte.ts";
  import { setIconClass, withIconsStyleSheet } from "$lib/utilitaires";

  import DsfrButton from "./DsfrButton.svelte";

  type ButtonKind = Extract<Kind, "tertiary" | "tertiary-no-outline">;
  type UserLink = {
    label: string;
    href?: string;
    icon?: string;
    active?: boolean;
    disabled?: boolean;
    markup?: "a" | "button";
  };

  interface Props {
    /** Attribut 'id' du composant */
    id?: string;
    /** Attribut 'id' du panel déroulant */
    collapseId: string;
    /** Attribut 'id' du bouton déclencheur */
    buttonId?: string;
    /** Libellé du bouton déclencheur */
    buttonLabel?: string;
    /** Variante du bouton déclencheur */
    buttonKind?: ButtonKind;
    /** Icône du bouton déclencheur */
    buttonIcon?: string;
    /** Alignement du menu déroulant<br>valeurs :<br>- left : aligné à gauche (par défaut)<br>- right : aligné à droite */
    align?: "left" | "right";
    /** Nom de l'utilisateur connecté */
    userName?: string;
    /** Texte de description de l'utilisateur (adresse email ou autre) */
    userEmail?: string;
    /** Liste des liens de navigation dans le menu utilisateur */
    links?: UserLink[];
    /** Désactive le bouton déclencheur et les liens du menu */
    disabled?: boolean;
    /** Affiche le bouton de déconnexion */
    hasLogout?: boolean;
    /** Libellé du bouton de déconnexion */
    logoutLabel?: string;
  }

  let {
    id,
    collapseId,
    buttonId,
    buttonLabel,
    buttonKind = "tertiary-no-outline",
    buttonIcon = "account-circle-fill",
    align = "right",
    userName,
    userEmail,
    links = [],
    disabled,
    hasLogout,
    logoutLabel = "Se déconnecter",
  }: Props = $props();

  let container: HTMLElement;
  let effectiveAlign = $state<"left" | "right">(align);
  let expanded = $state(false);
  const iconClass = $derived<boolean | string>(
    buttonIcon && `fr-btn--icon-left ${setIconClass(buttonIcon)}`,
  );

  /**
   * Détermine l'alignement optimal d'un élément déroulant en fonction de l'espace disponible dans la fenêtre.
   *
   * Cette fonction vérifie si l'élément déroulant dispose de suffisamment d'espace pour s'afficher
   * à l'alignement demandé. Si l'espace est insuffisant, elle définit l'alignement opposé.
   *
   * @param {HTMLElement} collapseElement - L'élément déroulant dont l'alignement doit être calculé
   * @returns {"left" | "right"} L'alignement optimal : "left" ou "right"
   */
  function defineAlignment(collapseElement: HTMLElement): "left" | "right" {
    const hostRect = $host().getBoundingClientRect();
    const containerWidth = collapseElement.offsetWidth || collapseElement.scrollWidth;
    const viewportWidth = window.innerWidth;

    const spaceOnRight = viewportWidth - hostRect.right;
    const spaceOnLeft = hostRect.left;

    if (align === "left" && spaceOnRight < containerWidth) return "right";
    if (align === "right" && spaceOnLeft < containerWidth) return "left";

    return align;
  }

  /**
   * Ajuste les propriétés CSS d'un élément pour gérer l'animation de collapse.
   *
   * Cette fonction calcule la hauteur de l'élément et définit les variables CSS
   * nécessaires pour animer le repli/dépli de l'élément.
   *
   * @param {HTMLElement} collapseElement - L'élément DOM à animer
   * @returns {void}
   */
  function adjustStyleProperties(collapseElement: HTMLElement) {
    collapseElement.style.setProperty("--collapser", "none");

    const height = collapseElement.offsetHeight;

    collapseElement.style.setProperty("--collapse", -height + "px");
    collapseElement.style.setProperty("--collapser", "");
  }

  /**
   * Gère l'animation de "collapsing" de l'élément qui doit se plier/déplier.
   *
   * @param {HTMLElement} collapseElement - L'élément DOM à animer
   * @param {boolean} expand - Indique si l'élément doit être expansé (true) ou réduit (false)
   *
   * @description
   * Cette fonction ajoute la classe "fr-collapsing" à l'élément, ajuste ses propriétés de style,
   * puis déclenche l'animation d'expansion ou de réduction en ajoutant/supprimant la classe
   * "fr-collapse--expanded" via requestAnimationFrame pour assurer une animation fluide.
   */
  function collapsing(collapseElement: HTMLElement, expand: boolean) {
    collapseElement.classList.add("fr-collapsing");
    adjustStyleProperties(collapseElement);

    requestAnimationFrame(() => {
      if (expand) {
        collapseElement.classList.add("fr-collapse--expanded");
      } else {
        collapseElement.classList.remove("fr-collapse--expanded");
      }
    });
  }

  /**
   * Gère le clic sur le bouton déclencheur du menu utilisateur.
   *
   * @param {MouseEvent} event - L'événement de clic souris
   * @description
   * - Arrête la propagation de l'événement
   * - Bascule l'état d'expansion du menu
   * - Met à jour l'attribut aria-expanded pour l'accessibilité
   * - Récupère l'élément contrôlé via aria-controls
   * - Définit l'alignement du menu déroulant si nécessaire
   * - Déclenche l'animation de fermeture/ouverture du menu
   */
  function handleClick(event: MouseEvent) {
    event.stopPropagation();

    expanded = !expanded;

    const button = event.currentTarget as HTMLButtonElement;
    const isExpanded = button.ariaExpanded === "true";
    const ariaControls = button.getAttribute("aria-controls");

    button.ariaExpanded = (!isExpanded).toString();

    const collapseElement = ariaControls
      ? button.parentElement.querySelector(`#${ariaControls}`)
      : null;

    if (collapseElement) {
      if (!isExpanded) {
        effectiveAlign = defineAlignment(collapseElement as HTMLElement);
      }
      collapsing(collapseElement as HTMLElement, !isExpanded);
    }
  }

  /**
   * Ferme le menu utilisateur en retirant la classe d'expansion et en mettant à jour l'attribut ARIA.
   *
   * Cette fonction :
   * - Récupère l'élément collapse via son ID
   * - Vérifie s'il est actuellement expandu
   * - Met à jour l'attribut `aria-expanded` du bouton de contrôle à "false"
   * - Déclenche l'animation de fermeture du collapse
   *
   * @returns {void}
   */
  function closeMenu() {
    const collapseElement = container?.querySelector(`#${collapseId}`);
    if (!collapseElement?.classList.contains("fr-collapse--expanded")) return;

    const button = container?.querySelector(`[aria-controls="${collapseId}"]`);
    if (button) button.ariaExpanded = "false";

    collapsing(collapseElement as HTMLElement, false);
  }

  /**
   * Émet un événement en lien avec le clic sur le bouton de déconnexion.
   *
   * @param {MouseEvent} event - L'événement de clic souris déclenchant la déconnexion
   */
  function handleLogout(event: MouseEvent) {
    event.stopPropagation();

    $host().dispatchEvent(new CustomEvent("logout", { bubbles: true, composed: true }));
  }

  /**
   * Gère le clic sur un lien utilisateur.
   *
   * Arrête la propagation de l'événement et émet un événement personnalisé
   * contenant le lien cliqué et son index.
   *
   * @param {MouseEvent} event - L'événement souris déclenchant le clic
   * @param {UserLink} link - L'objet lien utilisateur cliqué
   * @param {number} index - L'index du lien dans la liste
   */
  function handleLinkClick(event: MouseEvent, link: UserLink, index: number) {
    event.stopPropagation();

    $host().dispatchEvent(
      new CustomEvent("linkclicked", { detail: { link, index }, bubbles: true, composed: true }),
    );
  }

  /**
   * Gère la fin d'une transition CSS sur un élément pliable.
   * Supprime la classe "fr-collapsing" lorsque la transition est terminée.
   *
   * @param {TransitionEvent} event - L'événement de transition déclenché
   * @returns {void}
   */
  function ontransitionend(event: TransitionEvent) {
    const collapseElement = event.currentTarget as HTMLElement;

    if (collapseElement.classList.contains("fr-collapsing")) {
      collapseElement.classList.remove("fr-collapsing");
    }
  }
</script>

<div {id} class="fr-user fr-nav" use:clickOutside={closeMenu} bind:this={container}>
  <div class="fr-nav__item">
    <button
      id={buttonId}
      aria-controls={collapseId}
      aria-expanded={expanded}
      type="button"
      class={["fr-user__btn fr-btn fr-btn--sm", `fr-btn--${buttonKind}`, iconClass]}
      {disabled}
      onclick={handleClick}
    >
      {buttonLabel}
    </button>

    <div
      id={collapseId}
      class="fr-collapse fr-user__panel fr-menu"
      class:fr-user__panel--right={effectiveAlign === "right"}
      {ontransitionend}
    >
      <div class="fr-user__content fr-menu__list">
        {#if userName || userEmail}
          <div class="fr-user__info">
            {#if userName}
              <p class="fr-user__name">{userName}</p>
            {/if}
            {#if userEmail}
              <p class="fr-user__email">{userEmail}</p>
            {/if}
          </div>
        {/if}

        {#if links.length > 0}
          <div class="fr-user__menu">
            <ul class=" fr-user__list">
              {#each links as link, index}
                {@const markup = link.markup ?? (link.href ? "a" : "button")}
                <li class="fr-user__list-item">
                  <svelte:element
                    this={markup}
                    class={["fr-nav__link", "fr-user__link"]}
                    href={markup === "a" && !link.disabled ? link.href : undefined}
                    type={markup === "button" ? "button" : undefined}
                    disabled={markup === "button" && link.disabled ? true : undefined}
                    aria-disabled={markup === "a" && link.disabled ? true : undefined}
                    aria-current={link.active ? "page" : undefined}
                    role={markup === "a" ? "menuitem" : undefined}
                    onclick={(event: MouseEvent) =>
                      markup === "button" ? handleLinkClick(event, link, index) : undefined}
                  >
                    <span class={["fr-user__link-content", link.icon && `fr-icon-${link.icon}`]}>
                      {link.label}
                    </span>
                  </svelte:element>
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if hasLogout || $$slots.logout}
          <div class="fr-user__logout">
            <slot name="logout">
              <DsfrButton
                label={logoutLabel}
                kind="tertiary"
                size="sm"
                hasIcon
                icon="logout-box-r-line"
                centered
                onclick={handleLogout}
              >
                {logoutLabel}
              </DsfrButton>
            </slot>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  // DSFR Button
  @import "@gouvfr/dsfr/src/dsfr/component/button/index";
  @import "@gouvfr/dsfr/src/dsfr/component/button/style/module/default";
  @import "@gouvfr/dsfr/src/dsfr/component/button/style/scheme";
  @include _button-scheme;
  // DSFR Navigation
  @import "@gouvfr/dsfr/dist/component/navigation/navigation.main.min.css";

  @include set-dsfr-sizing("user") {
    position: relative;

    &:not(:has(.fr-user__info)) {
      .fr-user__list-item:first-child {
        border-top: none;
      }
    }

    &__panel {
      text-align: left;

      &--right {
        left: auto;
        right: 0;
      }
    }

    &__info {
      padding: 16px;
    }

    &__name,
    &__email {
      --text-spacing: 0;
    }

    &__name {
      color: var(--text-action-high-grey);
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
    }

    &__email {
      color: var(--text-mention-grey);
      font-size: 12px;
      line-height: 24px;
    }

    &__menu {
      padding-block-start: 0;
    }

    &__list {
      padding: 0;
      margin-block-end: 0;

      &-item {
        border-top: 1px solid var(--border-default-grey);
      }
    }

    &__link {
      box-shadow: none !important;

      &-content {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        justify-content: flex-start;
      }
    }

    &__logout {
      padding: 16px;
    }

    &__btn {
      font-size: 1rem;
      line-height: 1.5rem;
      min-height: 2.5rem;
      padding: 0.5rem 1rem;
      overflow: initial;
      max-width: 100%;
      max-height: none;
      font-weight: 500;
      min-height: 3rem;
      width: 100%;

      &::after {
        transition: transform 0.3s;
        flex: 0 0 auto;
        display: inline-block;
        vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
        background-color: currentColor;
        width: var(--icon-size);
        height: var(--icon-size);
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        -webkit-mask-image: url("icons/arrows/arrow-down-s-line.svg");
        mask-image: url("icons/arrows/arrow-down-s-line.svg");
        --icon-size: 1rem;
        content: "";
        margin-left: auto;
      }

      &[aria-expanded="true"] {
        color: var(--text-active-blue-france);
        background-color: var(--background-open-blue-france);

        --idle: transparent;
        --hover: var(--background-open-blue-france-hover);
        --active: var(--background-open-blue-france-active);

        &::after {
          transform: rotate(-180deg);
        }
        &:hover {
          background-color: var(--hover-tint);
        }

        &:active {
          background-color: var(--active-tint);
        }
      }

      @media (min-width: 62em) {
        min-height: auto;
        width: auto;
        font-size: 0.875rem;
        line-height: 1.5rem;
        padding: 0.25rem 0.75rem;

        &::after {
          margin-left: 0.25rem;
          margin-right: -0.25rem;
        }

        &::before {
          --icon-size: 1rem;
        }
      }
    }
  }
</style>
