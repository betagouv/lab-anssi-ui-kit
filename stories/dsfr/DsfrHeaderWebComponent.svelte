<script lang="ts">
  interface Props {
    id?: string;
    isMourning?: boolean;
    menuId?: string;
    menuModalId?: string;
    hasToolLinks?: boolean;
    toolLinks?: ToolLink[];
    duplicateToolLinks?: boolean;
    hasTranslate?: boolean;
    translateId?: string;
    translateCollapseId?: string;
    translateButtonTitle?: string;
    translateButtonKind?: ButtonKind;
    translateLanguages?: TranslateLanguage[];
    hasSearch?: boolean;
    searchId?: string;
    searchModalId?: string;
    searchBtnId?: string;
    searchInputId?: string;
    searchLabel?: string;
    searchPlaceholder?: string;
    searchTitle?: string;
    brandLogoTitle: string;
    brandService?: string;
    hasBrandTagline?: boolean;
    brandTagline?: string;
    brandLinkId?: string;
    brandLinkTitle?: string;
    brandLinkHref?: string;
    hasBrandOperator?: boolean;
    brandOperatorAlt?: string;
    brandOperatorSrc?: string;
    brandOperatorStyle?: string;
    hasNavigation?: boolean;
    navigationId?: string;
    navigationAriaLabel?: string;
    navigationItems?: MenuItem[];
    hasHeaderTag?: boolean;
  }

  let { id, isMourning, menuId, menuModalId, hasToolLinks, toolLinks, duplicateToolLinks, hasTranslate, translateId, translateCollapseId, translateButtonTitle, translateButtonKind, translateLanguages, hasSearch, searchId, searchModalId, searchBtnId, searchInputId, searchLabel, searchPlaceholder, searchTitle, brandLogoTitle, brandService, hasBrandTagline, brandTagline, brandLinkId, brandLinkTitle, brandLinkHref, hasBrandOperator, brandOperatorAlt, brandOperatorSrc, brandOperatorStyle, hasNavigation, navigationId, navigationAriaLabel, navigationItems, hasHeaderTag }: Props = $props();
</script>

<dsfr-header
  {id}
  is-mourning={isMourning}
  menu-id={menuId}
  menu-modal-id={menuModalId}
  has-tool-links={hasToolLinks}
  tool-links={toolLinks}
  duplicate-tool-links={duplicateToolLinks}
  has-translate={hasTranslate}
  translate-id={translateId}
  translate-collapse-id={translateCollapseId}
  translate-button-title={translateButtonTitle}
  translate-button-kind={translateButtonKind}
  translate-languages={translateLanguages}
  has-search={hasSearch}
  search-id={searchId}
  search-modal-id={searchModalId}
  search-btn-id={searchBtnId}
  search-input-id={searchInputId}
  search-label={searchLabel}
  search-placeholder={searchPlaceholder}
  search-title={searchTitle}
  brand-logo-title={brandLogoTitle}
  brand-service={brandService}
  has-brand-tagline={hasBrandTagline}
  brand-tagline={brandTagline}
  brand-link-id={brandLinkId}
  brand-link-title={brandLinkTitle}
  brand-link-href={brandLinkHref}
  has-brand-operator={hasBrandOperator}
  brand-operator-alt={brandOperatorAlt}
  brand-operator-src={brandOperatorSrc}
  brand-operator-style={brandOperatorStyle}
  has-navigation={hasNavigation}
  navigation-id={navigationId}
  navigation-aria-label={navigationAriaLabel}
  navigation-items={navigationItems}
  has-header-tag={hasHeaderTag}
></dsfr-header>
