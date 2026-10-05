<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";
  import PlaceholderPaysage from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";

  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { toolLinks } = headerArgs;

  const navLink = (id: string) => ({
    id,
    type: "link" as const,
    active: false,
    collapsable: false,
    label: "Intitulé lien",
    href: "#",
  });

  const toolLinksAccueil: ComponentProps<DsfrHeader>["toolLinks"] = [
    { classes: ["fr-btn--team"], url: "#", label: "Contact", markup: "a" },
    { classes: ["fr-btn--briefcase"], url: "#", label: "Espace recruteur", markup: "a" },
    { classes: ["fr-btn--account"], url: "#", label: "Espace particulier", markup: "a" },
  ];

  const navigationItemsMinimaux = [
    navLink("navigation-item-01"),
    navLink("navigation-item-02"),
    navLink("navigation-item-03"),
  ];

  const { Story } = defineMeta({
    title: "Composants/DSFR/Header",
    component: DsfrHeader,
    argTypes: {
      ...headerArgTypes,
      fluid: {
        control: "boolean",
        description: "Permet de définir le conteneur comme 'fluide' ou non",
        type: {
          value: "boolean",
        },
      },
      ontoolLinkClick: {
        description: "Déclenché au clic sur un lien d'accès rapide.<br>" + "`detail: ToolLink`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<ToolLink>" },
        },
        control: false,
      },
      slotBeforenavbarbuttons: {
        name: "beforenavbarbuttons",
        description:
          "Contenu inséré avant les boutons de la barre de navigation mobile (recherche, menu)",
        control: false,
        table: { category: "Slots" },
      },
      slotBeforetoolslinks: {
        name: "beforetoolslinks",
        description: "Contenu inséré avant les liens d'accès rapide dans la barre d'outils",
        control: false,
        table: { category: "Slots" },
      },
      slotHeaderbadge: {
        name: "headerbadge",
        description: "Badge affiché dans l'en-tête (ex : bêta, nouveau)",
        control: false,
        table: { category: "Slots" },
      },
      slotSearchbar: {
        name: "searchbar",
        description: "Barre de recherche personnalisée (remplace le DsfrSearch par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      slotModalToolLinks: {
        name: "modalToolLinks",
        description: "Liens d'accès rapide dans la modale mobile",
        control: false,
        table: { category: "Slots" },
      },
      slotNavigation: {
        name: "navigation",
        description: "Navigation principale personnalisée (remplace le DsfrNavigation par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      slotToolLinks: {
        name: "toolLinks",
        description: "Liens d'accès rapide personnalisés (remplace la prop `toolLinks`)",
        control: false,
        table: { category: "Slots" },
      },
      slotTranslate: {
        name: "translate",
        description: "Bouton de traduction personnalisé",
        control: false,
        table: { category: "Slots" },
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
      navigationItems: [
        {
          id: "navigation-01",
          type: "menu",
          active: true,
          collapsable: true,
          collapseId: "navigation-01",
          label: "Intitulé menu",
          items: [
            navLink("navigation-item-01-1"),
            { ...navLink("navigation-item-01-2"), active: true },
            navLink("navigation-item-01-3"),
          ],
        },
        navLink("navigation-item-02"),
        {
          id: "navigation-03",
          type: "menu",
          active: false,
          collapsable: true,
          collapseId: "navigation-03",
          label: "Intitulé menu",
          items: [
            navLink("navigation-item-03-1"),
            {
              id: "navigation-03-2",
              type: "menu",
              active: false,
              collapsable: true,
              collapseId: "navigation-03-2",
              label: "Intitulé menu",
              items: [
                navLink("navigation-item-03-2-1"),
                navLink("navigation-item-03-2-2"),
                navLink("navigation-item-03-2-3"),
              ],
            },
            navLink("navigation-item-03-3"),
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
          categories: [1, 2, 3, 4].map((cat) => ({
            label: `Catégorie ${cat}`,
            href: "#",
            items: [1, 2, 3].map((item) => navLink(`navigation-item-04-${cat}-${item}`)),
          })),
        },
      ],
    },
    parameters: {
      actions: { handles: ["toolLinkClick"] },
      docs: {
        description: {
          component:
            "L’en-tête permet aux utilisateurs d’identifier sur quel site ils se trouvent. Il peut donner accès à la recherche et à certaines pages ou fonctionnalités clés.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/en-tete)",
        },
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
    translate-languages={args.translateLanguages}
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
  ></dsfr-header>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-header");
    const shadow = el?.shadowRoot;

    await step("Le header a le rôle banner", async () => {
      const header = shadow?.querySelector("header.fr-header");

      await expect(header?.getAttribute("role")).toBe("banner");
    });

    await step("Le logo est présent", async () => {
      const logo = shadow?.querySelector(".fr-logo");

      await expect(logo).toBeTruthy();
    });

    await step("Le titre du service est affiché", async () => {
      const serviceTitle = shadow?.querySelector(".fr-header__service-title");

      await expect(serviceTitle?.textContent?.trim()).toContain(args.brandService);
    });

    await step("La navigation est présente", async () => {
      const nav = shadow?.querySelector("nav");

      await expect(nav).toBeTruthy();
    });
  }}
/>

<Story name="Avec navigation" />

<Story
  name="Minimal"
  args={{
    brandService: "",
    brandTagline: "",
    navigationItems: navigationItemsMinimaux,
  }}
/>

<Story
  name="Service"
  args={{ hasNavigation: false }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-header");
    const shadow = el?.shadowRoot;

    await step("Le header est rendu sans navigation", async () => {
      const nav = shadow?.querySelector("nav");

      await expect(nav).toBeNull();
    });
  }}
/>

<Story
  name="Avec liens d'accès rapide"
  args={{
    hasNavigation: false,
    hasToolLinks: true,
    toolLinks: [
      ...toolLinksAccueil,
      { classes: ["fr-btn--display"], url: "#", label: "Paramètres d'affichage", markup: "button" },
    ],
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-header");
    const shadow = el?.shadowRoot;
    const toolLinksData = (args as unknown as { toolLinks: { label: string }[] }).toolLinks ?? [];

    await step("Les liens d'accès rapide sont affichés avec les bons labels", async () => {
      const links = shadow?.querySelectorAll(".fr-header__tools-links .fr-btn");

      await expect(links?.length).toBe(toolLinksData.length);

      for (let i = 0; i < toolLinksData.length; i++) {
        await expect(links?.[i]?.textContent?.trim()).toBe(toolLinksData[i].label);
      }
    });

    await step("Le clic sur un lien bouton émet toolLinkClick", async () => {
      const handler = fn();
      el?.addEventListener("toolLinkClick", handler);

      const toolButton = shadow?.querySelector(
        ".fr-header__tools-links button.fr-btn--display",
      ) as HTMLElement;

      toolButton.click();

      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls[0][0].detail.label).toBe("Paramètres d'affichage");

      el?.removeEventListener("toolLinkClick", handler);
    });
  }}
/>

<Story
  name="Avec recherche"
  args={{ hasNavigation: false, hasSearch: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-header");
    const shadow = el?.shadowRoot;

    await step("Le bouton de recherche est présent", async () => {
      const searchBtn = shadow?.querySelector("button.fr-btn--search");

      await expect(searchBtn).toBeTruthy();
    });
  }}
/>

<Story
  name="Avec liens d'accès rapide et recherche"
  args={{
    hasNavigation: false,
    hasToolLinks: true,
    hasSearch: true,
    toolLinks: toolLinksAccueil,
  }}
/>

<Story
  name="Avec opérateur (vertical)"
  args={{ hasNavigation: false, hasBrandOperator: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-header");
    const shadow = el?.shadowRoot;

    await step("Le logo opérateur est présent", async () => {
      const operatorImg = shadow?.querySelector(".fr-header__operator img") as HTMLImageElement;

      await expect(operatorImg).toBeTruthy();
      await expect(operatorImg?.src).toBeTruthy();
    });
  }}
/>

<Story
  name="Avec opérateur (horizontal)"
  args={{
    hasNavigation: false,
    hasBrandOperator: true,
    brandOperatorSrc: PlaceholderPaysage,
    brandOperatorStyle: "max-width: 9.0625rem;",
  }}
/>
