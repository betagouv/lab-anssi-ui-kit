<svelte:options
  customElement={{
    tag: "dsfr-translate",
    props: {
      id: { attribute: "id", type: "String" },
      collapseId: { attribute: "collapse-id", type: "String" },
      noBorder: { attribute: "no-border", type: "Boolean" },
      languages: { attribute: "languages", type: "Array" },
      buttonId: { attribute: "button-id", type: "String" },
      buttonTitle: { attribute: "button-title", type: "String" },
      buttonKind: { attribute: "button-kind", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Kind, TranslateLanguage } from "$lib/types";
  interface Props {
    /** Attribut 'id' du sélecteur de langue */
    id: string;
    /** Attribut 'id' du menu à controler */
    collapseId: string;
    /** Version sans bordure sur le bouton */
    noBorder?: boolean;
    languages: TranslateLanguage[];
    /** Attribut 'id' du bouton */
    buttonId?: string;
    /** Attribut 'title' du bouton */
    buttonTitle?: string;
    /** Variante du bouton de sélection de langue */
    buttonKind?: Kind;
  }

  let {
    id,
    collapseId,
    noBorder,
    languages,
    buttonId,
    buttonTitle,
    buttonKind = "tertiary",
  }: Props = $props();

  let expanded = $state(false);

  // Récupère l'itam dans le tableau `languages` qui est actif
  const activeLanguage = languages.find((language) => language.active) ?? languages[0];
</script>

<div {id} class="fr-translate fr-nav">
  <div class="fr-nav__item">
    <button
      aria-controls={collapseId}
      aria-expanded={expanded}
      title={buttonTitle}
      type="button"
      id={buttonId}
      class={["fr-translate__btn fr-btn", `fr-btn--${buttonKind}`]}
      onclick={() => (expanded = !expanded)}
    >
      {activeLanguage.locale.toUpperCase()}
      <span class="fr-hidden-lg">&nbsp;- {activeLanguage.name}</span>
    </button>
    <div
      class={["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": expanded }]}
      id={collapseId}
    >
      {#if languages && languages.length > 0}
        <ul class="fr-menu__list">
          {#each languages as language}
            <li>
              <a
                class="fr-translate__language fr-nav__link"
                hreflang={language.locale}
                lang={language.locale}
                href={language.href}
                id={language.id}
                aria-current={language.active ? "true" : undefined}
              >
                {language.locale.toUpperCase()} - {language.name}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/display/module/hidden";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  // DSFR Button
  @import "@gouvfr/dsfr/src/dsfr/component/button/index";
  @import "@gouvfr/dsfr/src/dsfr/component/button/style/module/default";
  @import "@gouvfr/dsfr/src/dsfr/component/button/style/scheme";
  @include _button-scheme;
  // DSFR Navigation
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/index";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/default";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/module/menu";
  @import "@gouvfr/dsfr/src/dsfr/component/navigation/style/scheme";
  @include _navigation-scheme;
  // DSFR Translate
  @import "@gouvfr/dsfr/dist/component/translate/translate.main.css";

  @include set-shadow-host("block");
  @include set-dsfr-sizing("translate");
</style>
