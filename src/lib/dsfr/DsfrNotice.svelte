<svelte:options
  customElement={{
    tag: "dsfr-notice",
    props: {
      title: { attribute: "title", type: "String" },
      hasDescription: { attribute: "has-description", type: "Boolean" },
      desc: { attribute: "desc", type: "String" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      type: { attribute: "type", type: "String" },
      markup: { attribute: "markup", type: "String" },
      notice: { attribute: "notice", type: "Boolean" },
      dismissible: { attribute: "dismissible", type: "Boolean" },
      hasLink: { attribute: "has-link", type: "Boolean" },
      linkLabel: { attribute: "link-label", type: "String" },
      linkTitle: { attribute: "link-title", type: "String" },
      linkHref: { attribute: "link-href", type: "String" },
      blank: { attribute: "blank", type: "Boolean" },
      buttonLabel: { attribute: "button-label", type: "String" },
    },
    extend: (CustomElementClass) => {
      return class extends CustomElementClass {
        connectedCallback() {
          super.connectedCallback();

          const iconsStyleSheet = getIconsStyleSheet();
          const shadow = this.shadowRoot;

          if (shadow && !shadow.adoptedStyleSheets.includes(iconsStyleSheet)) {
            shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
          }
        }
      };
    },
  }}
/>

<script lang="ts">
  import { getIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";
  import DsfrContainer from "./DsfrContainer.svelte";

  setThemeable($host());

  export type NoticeType =
    | "info"
    | "warning"
    | "alert"
    | "weather-orange"
    | "weather-red"
    | "weather-purple"
    | "kidnapping"
    | "cyberattack"
    | "attack"
    | "witness";
  export type NoticeMarkup = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  export interface Props {
    /** Titre du bandeau */
    title: string;
    /** Le bandeau a une description */
    hasDescription?: boolean;
    /** Texte de description du bandeau */
    desc?: string;
    /** Le bandeau a une icône */
    hasIcon?: boolean;
    /** Nom de l'icône du bandeau */
    icon?: string;
    /** Type de bandeau */
    type?: NoticeType;
    /** Type de bandeau */
    markup?: NoticeMarkup;
    /**  Si true, ajoute un role notice (si insertion à la volée du bandeau) */
    notice?: boolean;
    /** Ajoute un bouton de fermeture */
    dismissible?: boolean;
    /** Le bandeau a un lien */
    hasLink?: boolean;
    /** Texte du lien du bandeau */
    linkLabel?: string;
    /** Title du lien du bandeau */
    linkTitle?: string;
    /** Href du lien du bandeau */
    linkHref?: string;
    /** Si true, target prend la valeur _blank, sinon _self */
    blank?: boolean;
    /** Libellé du bouton de fermeture */
    buttonLabel?: string;
  }

  let {
    title,
    hasDescription,
    desc,
    hasIcon,
    icon,
    type = "info",
    markup = "p",
    notice: roleNotice,
    dismissible,
    hasLink,
    linkLabel,
    linkTitle,
    linkHref,
    blank: linkBlank,
    buttonLabel,
  }: Props = $props();

  let visible = $state(true);

  const iconClass = $derived(hasIcon && icon && setIconClass(icon));

  const titleClasses = $derived(["fr-notice__title", iconClass]);
</script>

{#if visible}
  <div
    class={["fr-notice", `fr-notice--${type}`, !hasIcon && "fr-notice--no-icon"]}
    role={roleNotice ? "notice" : undefined}
  >
    <DsfrContainer>
      <div class="fr-notice__body">
        <svelte:element this={markup}>
          <span class={titleClasses}>{title}</span>
          {#if hasDescription}
            <span class="fr-notice__desc">{desc}</span>
          {/if}
          {#if hasLink}
            <a
              class="fr-notice__link"
              href={linkHref}
              title={linkTitle}
              target={linkBlank ? "_blank" : "_self"}
            >
              {linkLabel}
            </a>
          {/if}
        </svelte:element>

        {#if dismissible}
          <button
            type="button"
            class="fr-btn--close fr-btn"
            title={buttonLabel}
            onclick={() => (visible = false)}
          >
            {buttonLabel}
          </button>
        {/if}
      </div>
    </DsfrContainer>
  </div>
{/if}

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme();
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/button/main"; // TODO: voir dans quel mesure on peut utiliser le composant DsfrButton à la place
  @import "@gouvfr/dsfr/src/dsfr/component/notice/main";

  @include set-shadow-host();
  @include set-dsfr-sizing("notice");
</style>
