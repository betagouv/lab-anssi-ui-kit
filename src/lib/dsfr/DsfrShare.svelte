<svelte:options
  customElement={{
    tag: "dsfr-share",
    props: {
      title: { attribute: "title", type: "String" },
      buttons: { attribute: "buttons", type: "Object" },
      disabled: { attribute: "disabled", type: "Boolean" },
      text: { attribute: "text", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import { setThemeable, withIconsStyleSheet } from "$lib/utilitaires";

  setThemeable($host());

  const SOCIAL_TYPES = [
    "facebook",
    "twitter-x",
    "twitter",
    "bluesky",
    "threads",
    "linkedin",
    "mastodon",
  ] as const;

  type SocialType = (typeof SOCIAL_TYPES)[number];
  type ShareButtonType = SocialType | "mail" | "copy";

  export interface ShareButton {
    /** Type du bouton de partage */
    type: ShareButtonType;
    /** Libellé du bouton */
    label: string;
    /** URL de partage (requis pour les types sociaux et mail) */
    url?: string;
    /** Largeur de la fenêtre popup (types sociaux uniquement) */
    width?: number;
    /** Hauteur de la fenêtre popup (types sociaux uniquement) */
    height?: number;
  }

  interface Props {
    /** Titre du bloc de partage */
    title?: string;
    /** Liste des boutons de partage */
    buttons?: ShareButton[];
    /** Désactive les boutons sociaux (consentement cookies) */
    disabled?: boolean;
    /** Texte informatif affiché quand disabled est vrai (accepte du HTML) */
    text?: string;
  }

  let { title = "Partager la page", buttons = [], disabled = false, text }: Props = $props();

  function isSocial(type: ShareButtonType): type is SocialType {
    return SOCIAL_TYPES.includes(type as SocialType);
  }

  function isDisabled(button: ShareButton): boolean {
    return disabled && isSocial(button.type);
  }

  function openSharePopup(event: MouseEvent, button: ShareButton) {
    event.preventDefault();
    window.open(
      button.url,
      button.label,
      `toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${button.width ?? 600},height=${button.height ?? 450}`,
    );
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
  }
</script>

<div class="fr-share">
  <p class="fr-share__title">{title}</p>

  {#if disabled && (text || $$slots.text)}
    <p class="fr-share__text">
      <slot name="text">
        {text}
      </slot>
    </p>
  {/if}

  <ul class="fr-btns-group">
    {#each buttons as button}
      <li>
        {#if button.type === "copy"}
          <button type="button" class={`fr-btn fr-btn--${button.type}`} onclick={copyToClipboard}>
            {button.label}
          </button>
        {:else if isDisabled(button)}
          <a class={`fr-btn fr-btn--${button.type}`} aria-disabled="true" role="link">
            {button.label}
          </a>
        {:else if isSocial(button.type)}
          <a
            href={button.url}
            target="_blank"
            rel="noopener external"
            class={`fr-btn fr-btn--${button.type}`}
            onclick={(e: MouseEvent) => openSharePopup(e, button)}
          >
            {button.label}
          </a>
        {:else}
          <a
            href={button.url}
            target="_blank"
            rel="noopener external"
            class={`fr-btn fr-btn--${button.type}`}
          >
            {button.label}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/share/share.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("share");
  @include set-dsfr-sizing("btn");
</style>
