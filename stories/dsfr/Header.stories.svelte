<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";

  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { toolLinks } = headerArgs;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Header",
    component: DsfrHeader,
    argTypes: headerArgTypes,
    args: {
      ...headerArgs,
      toolLinks: [
        ...toolLinks.buttons,
        {
          classes: ["fr-btn--display"],
          url: "#",
          label: "Paramètres d'affichage",
          markup: "button",
        },
      ],
      brandOperatorSrc: PlaceholderPortrait,
    },
    render: template,
  });

  type Args = ComponentProps<DsfrHeader>;
</script>

{#snippet template(args: Args)}
  <dsfr-header
    id={args.id}
    is-mourning={args.isMourning || undefined}
    menu-id={args.menuId}
    menu-modal-id={args.menuModalId}
    has-tool-links={args.hasToolLinks || undefined}
    tool-links={args.toolLinks}
    duplicate-tool-links={args.duplicateToolLinks || undefined}
    has-translate={args.hasTranslate || undefined}
    translate-id={args.translateId}
    translate-collapse-id={args.translateCollapseId}
    translate-button-title={args.translateButtonTitle}
    translate-button-kind={args.translateButtonKind}
    translate-languages={JSON.stringify(args.translateLanguages)}
    has-search={args.hasSearch || undefined}
    search-id={args.searchId}
    search-modal-id={args.searchModalId}
    search-btn-id={args.searchBtnId}
    search-input-id={args.searchInputId}
    search-label={args.searchLabel}
    search-placeholder={args.searchPlaceholder}
    search-title={args.searchTitle}
    brand-logo-title={args.brandLogoTitle}
    brand-service={args.brandService}
    has-brand-tagline={args.hasBrandTagline || undefined}
    brand-tagline={args.brandTagline}
    brand-link-id={args.brandLinkId}
    brand-link-title={args.brandLinkTitle}
    brand-link-href={args.brandLinkHref}
    has-brand-operator={args.hasBrandOperator || undefined}
    brand-operator-alt={args.brandOperatorAlt}
    brand-operator-src={args.brandOperatorSrc}
    brand-operator-style={args.brandOperatorStyle}
    has-navigation={args.hasNavigation || undefined}
    navigation-id={args.navigationId}
    navigation-aria-label={args.navigationAriaLabel}
    navigation-items={JSON.stringify(args.navigationItems)}
    has-header-tag={args.hasHeaderTag || undefined}
  >
    <!-- Tool Links -->
    <dsfr-buttons-group
      size="sm"
      slot="toolLinks"
      buttons={[
        {
          label: "Contact",
          preset: "team",
          href: "#",
        },
        {
          label: "Espace recruteur",
          preset: "briefcase",
          href: "#",
        },
        {
          label: "Espace compte",
          preset: "account",
          href: "#",
        },
      ]}
      inline="true"
    ></dsfr-buttons-group>

    <!-- Tool Links (modal) -->
    <dsfr-buttons-group
      slot="modalToolLinks"
      buttons={[
        {
          label: "Contact",
          preset: "team",
          href: "#",
        },
        {
          label: "Espace recruteur",
          preset: "briefcase",
          href: "#",
        },
        {
          label: "Espace compte",
          preset: "account",
          href: "#",
        },
      ]}
    ></dsfr-buttons-group>
  </dsfr-header>
{/snippet}

<Story name="Défaut" args={{ hasToolLinks: undefined, hasTranslate: undefined }} />

<Story name="Avec Tool Links" args={{ hasSearch: undefined }} />

<Story name="Exemple - Header MQC">
  {#snippet template()}
    <dsfr-header
      brand-service="MesQuestionsCyber"
      has-brand-tagline
      brand-tagline="Innovation ANSSI"
      brand-link-href="https://cyber.gouv.fr/"
      has-brand-operator
      brand-operator-src="https://cyber.gouv.fr/themes/open_theme/logo.svg"
      brand-operator-style="width: 66px"
    >
      <dsfr-badge label="Bêta" accent="green-emeraude" type="accent" slot="headerbadge"
      ></dsfr-badge>
    </dsfr-header>
  {/snippet}
</Story>
