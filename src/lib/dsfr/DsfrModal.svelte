<svelte:options
  customElement={{
    tag: "dsfr-modal",
    props: {
      id: { attribute: "id", type: "String" },
      title: { attribute: "title", type: "String" },
      icon: { attribute: "icon", type: "String" },
      size: { attribute: "size", type: "String" },
      top: { attribute: "top", type: "Boolean" },
      concealingBackdrop: { attribute: "concealing-backdrop", type: "Boolean" },
      opened: { attribute: "opened", type: "Boolean" },
      footer: { attribute: "has-footer", type: "Boolean" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { withIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type Markup = "div" | "dialog";
  type ModalSize = Extract<Size, "sm" | "md" | "lg">;

  interface Props {
    /** Identifiant unique de la modale */
    id: string;
    /** Titre de la modale */
    title?: string;
    /** Nom de l'icône associée au titre */
    icon?: string;
    /** Taille de la modale */
    size?: ModalSize;
    /** Positionnement de la modale en haut en mobile */
    top?: boolean;
    /** Fermeture au clic à l'exterieur de la modale */
    concealingBackdrop?: boolean;
    /** Type de balise HTML */
    markup?: Markup;
    /** Modale avec footer */
    footer?: boolean;
    /** Ouverture de la modale */
    opened?: boolean;
  }

  let {
    id,
    title,
    icon,
    size = "md",
    top = false,
    concealingBackdrop = true,
    markup = "dialog",
    opened = false,
    footer = false,
  }: Props = $props();

  let dialogElement: HTMLDialogElement | HTMLDivElement | undefined = $state();
  let bodyElement: HTMLDivElement | undefined = $state();
  let hasScrollDivider = $state(false);
  let previouslyFocused: Element | null = null;
  let previousOpened = false;

  const SIZES: Record<string, { md: number; lg: number }> = {
    sm: { md: 6, lg: 4 },
    md: { md: 8, lg: 6 },
    lg: { md: 10, lg: 8 },
  };

  const iconClass = $derived(icon && setIconClass(icon));
  const titleId = $derived(`${id}-title`);
  const sizeConfig = $derived(SIZES[size] || SIZES.md);

  /**
   * Évalue si le séparateur de scroll doit être affiché.
   * Ajoute la classe `fr-scroll-divider` sur `.fr-modal__body` lorsque
   * le contenu déborde et que l'utilisateur n'a pas scrollé jusqu'en bas.
   */
  function setDivider() {
    if (!bodyElement) return;

    if (bodyElement.scrollHeight > bodyElement.clientHeight) {
      hasScrollDivider =
        bodyElement.offsetHeight + bodyElement.scrollTop < bodyElement.scrollHeight;
    } else {
      hasScrollDivider = false;
    }
  }

  $effect(() => {
    if (opened && !previousOpened) {
      previouslyFocused = document.activeElement;
      console.log("previouslyFocused ==== ", previouslyFocused);

      setTimeout(() => {
        setDivider();
        dialogElement?.querySelector<HTMLElement>(".fr-btn--close")?.focus();
      });

      $host().dispatchEvent(new CustomEvent("open", { bubbles: true }));
    } else if (!opened && previousOpened) {
      hasScrollDivider = false;

      if (previouslyFocused instanceof HTMLElement) {
        console.log("Set Focus");
        previouslyFocused.focus();
      }
      previouslyFocused = null;

      $host().dispatchEvent(new CustomEvent("close", { bubbles: true }));
    }

    previousOpened = opened;
  });

  function close() {
    opened = false;
  }

  /**
   * Gère le clic sur le "voile" de la boîte de dialogue
   *
   * @param {MouseEvent} event - L'événement de clic souris
   */
  function handleDialogClick(event: MouseEvent) {
    if (concealingBackdrop && event.target === dialogElement) {
      close();
    }
  }

  /**
   * Gère les événements clavier pour la modale
   *
   * @param {KeyboardEvent} event - L'événement clavier déclenché
   */
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }
</script>

<svelte:element
  this={markup}
  bind:this={dialogElement}
  {id}
  class={["fr-modal", { "fr-modal--opened": opened, "fr-modal--top": top }]}
  aria-labelledby={title ? titleId : undefined}
  aria-modal={opened || undefined}
  open={opened || undefined}
  onclick={handleDialogClick}
  onkeydown={handleKeydown}
  role={markup === "div" ? "dialog" : undefined}
  tabindex={markup === "div" ? 0 : undefined}
>
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class={`fr-col-12 fr-col-md-${sizeConfig.md} fr-col-lg-${sizeConfig.lg}`}>
        <div
          bind:this={bodyElement}
          class={["fr-modal__body", { "fr-scroll-divider": hasScrollDivider }]}
          onscroll={setDivider}
        >
          <div class="fr-modal__header">
            <button
              aria-controls={id}
              title={`Fermer la modale ${title}`}
              type="button"
              class="fr-btn--close fr-btn"
              onclick={close}
            >
              Fermer
            </button>
          </div>
          <div class="fr-modal__content">
            {#if title}
              <h2 id={titleId} class="fr-modal__title">
                {#if icon}
                  <span class={["fr-icon--lg", iconClass]} aria-hidden="true"></span>
                {/if}

                {title}
              </h2>
            {/if}
            <slot></slot>
          </div>
          {#if footer && $$slots.footer}
            <div class="fr-modal__footer">
              <slot name="footer"></slot>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</svelte:element>

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme();
  @import "@gouvfr/dsfr/dist/component/modal/modal.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("modal") {
    :global(::slotted([slot="footer"])) {
      margin-bottom: -1rem;
      width: calc(100% + 1rem);
    }
  }
</style>
