<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";

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
  <DsfrHeader {...args} />
{/snippet}

<Story name="Défaut" />

<Story name="Avec Tool Links" args={{ hasSearch: undefined, hasToolLinks: true }} />
