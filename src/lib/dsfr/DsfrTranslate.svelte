<script lang="ts">
  type Language = {
    active: boolean;
    id: string;
    name: string;
    locale: string;
    href: string;
  };
  interface Props {
    /** Attribut 'id' du sélecteur de langue */
    id: string;
    /** Attribut 'id' du menu à controler */
    collapseId: string;
    /** Version sans bordure sur le bouton */
    noBorder?: boolean;
    languages: Language[];
    /** Attribut 'id' du bouton */
    buttonId?: string;
    /** Attribut 'title' du bouton */
    buttonTitle?: string;
    /** Variante du bouton de sélection de langue */
    buttonKind?: "primary" | "secondary" | "tertiary" | "tertiary-no-outline" | "inverted";
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/motion/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/display/module/hidden";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/navigation/navigation.main.css";
  @import "@gouvfr/dsfr/dist/component/translate/translate.main.css";

  @include set-shadow-host("block");
  @include set-dsfr-sizing("translate");
</style>
