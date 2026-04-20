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

  // @ts-ignore: Required Import to use this component as webcomponent
  import Navigation from "$lib/composants/suite-cyber/navigation/Navigation.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import Bandeau from "$lib/composants/mes-services-cyber/bandeau/Bandeau.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrNavigation from "$lib/dsfr/DsfrNavigation.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  const { toolLinks } = headerArgs;

  const { Story } = defineMeta({
    title: "Exemples/MSS",
    component: DsfrHeader,
    argTypes: headerArgTypes,
    args: {
      ...headerArgs,
      brandService: "MonServiceSécurisé",
      hasBrandTagline: true,
      brandTagline: "Innovation ANSSI",
      brandLogoTitle: "République<br>Française",
      brandLinkId: "mss-brand-link",
      hasBrandOperator: true,
      brandOperatorAlt: "Logo ANSSI",
      brandOperatorSrc: "https://upload.wikimedia.org/wikipedia/fr/3/31/Anssi.png",
      brandOperatorStyle: "width: 64px",
      brandLinkTitle: "Retour à l'accueil du site - MonServiceSécurisé - République Française",
      hasToolLinks: true,
      toolLinks: [
        {
          label: "S'inscrire",
          markup: "button",
        },
        {
          label: "Me connecter",
          markup: "button",
          icon: "account-circle-fill",
        },
      ],
      navigationItems: [
        { id: "menu-1", label: "Accueil", href: "#", type: "link" },
        {
          id: "menu-2",
          label: "Promouvoir",
          type: "menu",
          collapsable: true,
          collapseId: "menu-2",
          items: [
            { id: "menu-1-1", label: "Promouvoir MonServiceSécurisé", href: "#", type: "link" },
            { id: "menu-1-2", label: "Devenir Ambassadeur/rice", href: "#", type: "link" },
          ],
        },
        { id: "menu-3", label: "Co-construire MonServiceSécurisé", href: "#", type: "link" },
        { id: "menu-4", label: "Conseils Cyber", href: "#", type: "link" },
        { id: "menu-5", label: "L'homologation simplifiée", href: "#", type: "link" },
      ],
    },
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrHeader>;
</script>

<Story name="Header MSS (non connecté)">
  {#snippet template(args: Args)}
    <div class="mss-header-container">
      <dsfr-header
        id={args.id}
        is-mourning={args.isMourning || undefined}
        menu-id={args.menuId}
        menu-modal-id={args.menuModalId}
        has-tool-links={args.hasToolLinks || undefined}
        tool-links={JSON.stringify(args.toolLinks)}
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
        fluid={args.fluid || undefined}
      >
        <!-- (Mobile) Le bouton "Suite Cyber" se place avant le burger menu -->
        <lab-anssi-bouton-suite-cyber-navigation
          source-utm="mon-service-lab-anssi"
          slot="beforenavbarbuttons"
          class="suite-cyber-mobile"
        ></lab-anssi-bouton-suite-cyber-navigation>

        <!-- (Desktop) Le bouton "Suite Cyber" se place avant les "tools links" -->
        <lab-anssi-bouton-suite-cyber-navigation
          source-utm="mon-service-lab-anssi"
          slot="beforetoolslinks"
        ></lab-anssi-bouton-suite-cyber-navigation>
      </dsfr-header>
    </div>
  {/snippet}
</Story>
