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

  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { toolLinks } = headerArgs;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Header",
    component: DsfrHeader,
    argTypes: {
      ...headerArgTypes,
      beforenavbarbuttons: {
        description:
          "Contenu inséré avant les boutons de la barre de navigation mobile (recherche, menu)",
        control: false,
        table: { category: "Slots" },
      },
      headerbadge: {
        description: "Badge affiché dans l'en-tête (ex : bêta, nouveau)",
        control: false,
        table: { category: "Slots" },
      },
      beforetoolslinks: {
        description: "Contenu inséré avant les liens d'accès rapide dans la barre d'outils",
        control: false,
        table: { category: "Slots" },
      },
      toolLinks: {
        description: "Liens d'accès rapide personnalisés (remplace la prop `toolLinks`)",
        control: false,
        table: { category: "Slots" },
      },
      translate: {
        description: "Bouton de traduction personnalisé",
        control: false,
        table: { category: "Slots" },
      },
      searchbar: {
        description: "Barre de recherche personnalisée (remplace le DsfrSearch par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      modalToolLinks: {
        description: "Liens d'accès rapide dans la modale mobile",
        control: false,
        table: { category: "Slots" },
      },
      navigation: {
        description: "Navigation principale personnalisée (remplace le DsfrNavigation par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      fluid: {
        control: "boolean",
        description: "Permet de définir le conteneur comme 'fluide' ou non",
        type: {
          value: "boolean",
        },
      },
    },
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
        {
          url: "#",
          label: "Mon compte",
          markup: "button",
          icon: "account-circle-line",
        },
      ],
      brandOperatorSrc: PlaceholderPortrait,
      navItems: [
        {
          id: "navigation-01",
          type: "menu",
          active: true,
          collapsable: true,
          collapseId: "navigation-01",
          label: "Intitulé menu",
          items: [
            {
              id: "navigation-item-01-1",
              type: "link",
              active: false,
              collapsable: false,
              label: "Intitulé lien",
              href: "#",
            },
            {
              id: "navigation-item-01-2",
              type: "link",
              active: true,
              collapsable: false,
              label: "Intitulé lien",
              href: "#",
            },
            {
              id: "navigation-item-01-3",
              type: "link",
              active: false,
              collapsable: false,
              label: "Intitulé lien",
              href: "#",
            },
          ],
        },
        {
          id: "navigation-item-02",
          type: "link",
          active: false,
          collapsable: false,
          label: "Intitulé lien",
          href: "#",
        },
        {
          id: "navigation-03",
          type: "menu",
          active: false,
          collapsable: true,
          collapseId: "navigation-03",
          label: "Intitulé menu",
          items: [
            {
              id: "navigation-item-03-1",
              type: "link",
              active: false,
              collapsable: false,
              label: "Intitulé lien",
              href: "#",
            },
            {
              id: "navigation-03-2",
              type: "menu",
              active: false,
              collapsable: true,
              collapseId: "navigation-03-2",
              label: "Intitulé menu",
              items: [
                {
                  id: "navigation-item-03-2-1",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-03-2-2",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-03-2-3",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
              ],
            },
            {
              id: "navigation-item-03-3",
              type: "link",
              active: false,
              collapsable: false,
              label: "Intitulé lien",
              href: "#",
            },
          ],
        },
        {
          id: "navigation-04",
          type: "mega-menu",
          active: false,
          collapsable: true,
          collapseId: "navigation-04",
          label: "Intitulé mega menu",
          close: "Fermer le menu",
          leader: {
            title: "Titre éditorialisé",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit.",
            link: {
              id: "link-leader-04",
              label: "Voir toute la rubrique",
              iconPlace: "right",
              icon: "arrow-right-line",
            },
          },
          categories: [
            {
              label: "Catégorie 1",
              href: "#",
              items: [
                {
                  id: "navigation-item-04-1-1",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-1-2",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-1-3",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
              ],
            },
            {
              label: "Catégorie 2",
              href: "#",
              items: [
                {
                  id: "navigation-item-04-2-1",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-2-2",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-2-3",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
              ],
            },
            {
              label: "Catégorie 3",
              href: "#",
              items: [
                {
                  id: "navigation-item-04-3-1",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-3-2",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-3-3",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
              ],
            },
            {
              label: "Catégorie 4",
              href: "#",
              items: [
                {
                  id: "navigation-item-04-4-1",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-4-2",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
                {
                  id: "navigation-item-04-4-3",
                  type: "link",
                  active: false,
                  collapsable: false,
                  label: "Intitulé lien",
                  href: "#",
                },
              ],
            },
          ],
        },
      ],
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-header"),
        },
      },
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
  </dsfr-header>
{/snippet}

<Story name="Défaut" />

<Story name="Avec Tool Links" args={{ hasSearch: undefined, hasToolLinks: true }} />

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

<Story
  name="Exemple - Header MSS"
  args={{
    brandService: "",
    hasBrandTagline: true,
    brandTagline: "",
    brandLogoTitle: "République<br>Française",
    brandLinkId: "mss-brand-link",
    hasBrandOperator: true,
    brandOperatorAlt: "Logo ANSSI",
    brandOperatorSrc: "https://upload.wikimedia.org/wikipedia/fr/3/31/Anssi.png",
    brandOperatorStyle: "width: 64px",
    hasToolLinks: true,
    toolLinks: [
      { label: "Inscription", url: "/" },
      { label: "Connexion", url: "/", preset: "account" },
    ],
    hasNavigation: false,
  }}
>
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
        <!-- Brand Operator -->
        <div class="mss-brand-operator">
          <a class="logo-anssi" href="https://cyber.gouv.fr" title="ANSSI"></a>
          <a class="logo-mss" href="/" title="MonServiceSécurisé"></a>
        </div>

        <!-- A côté des tools links -->
        <lab-anssi-bouton-suite-cyber-navigation
          source-utm="mon-service-lab-anssi"
          slot="beforetoolslinks"
        ></lab-anssi-bouton-suite-cyber-navigation>

        <!-- A côté du burger menu -->
        <lab-anssi-bouton-suite-cyber-navigation
          source-utm="mon-service-lab-anssi"
          slot="beforenavbarbuttons"
        ></lab-anssi-bouton-suite-cyber-navigation>
      </dsfr-header>

      <!-- Bandeau MSS -->
      <lab-anssi-mes-services-cyber-bandeau affichage="visible"
      ></lab-anssi-mes-services-cyber-bandeau>

      <!-- Navigation DSFR -->
      <dsfr-container>
        <dsfr-navigation
          id="navigation-mss"
          aria-label="Navigation principale"
          items={args.navItems}
        ></dsfr-navigation>
      </dsfr-container>
    </div>

    <style>
      html,
      body {
        margin: 0;
        padding: 0;
      }

      .mss-header-container {
        background-color: var(--background-raised-grey);
      }

      :is(header nav a:not(.bouton), .logo-anssi, .logo-mss):hover {
        background-color: var(--systeme-design-etat-gris-survol);
      }

      :is(header nav a, .logo-anssi, .logo-mss):active {
        background-color: var(--systeme-design-etat-gris-actif);
      }

      .mss-brand-operator {
        display: flex;
        align-items: center;
      }

      .logo-anssi {
        width: 4.05em;
        height: 4.05em;
        margin: 0 0.4em;
        padding: 0.3em 0.85em;
        background-image: url("https://s3.eu-west-par.io.cloud.ovh.net/sf-cyber/sf-cyber/images/20230704_np_anssi_logotype_500x500.original.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=f56b12dc7d9741d6bb98766a26a6adca%2F20260413%2Feu-west-par%2Fs3%2Faws4_request&X-Amz-Date=20260413T064022Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e53259c5cfc7cda504db53b175cbc7efd7f540b936c92cd98fa3e9f1df90aac5");
        background-origin: content-box;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .logo-mss {
        width: 10.49em;
        height: 3.7em;
        margin-right: auto;
        padding: 0.3em 0.85em;
        background-image: url("https://raw.githubusercontent.com/betagouv/mon-service-securise/refs/heads/master/public/assets/images/logo_mss.svg");
        background-origin: content-box;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
    </style>
  {/snippet}
</Story>
