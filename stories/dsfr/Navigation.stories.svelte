<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    navigationArgTypes,
    navigationArgs,
    getItemArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/navigation/template/stories/navigation-arg-types.js";

  import DsfrNavigation from "$lib/dsfr/DsfrNavigation.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Navigation",
    component: DsfrNavigation,
    argTypes: navigationArgTypes,
    args: navigationArgs,
    parameters: {
      docs: {
        description: {
          component:
            "La navigation principale est l'élément central de la navigation au sein du site, il oriente l’utilisateur à travers les grandes sections du site et sur éventuellement plusieurs niveaux de profondeur.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/navigation-principale)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-navigation"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrNavigation>;

  const megaMenuCategories = (prefix: string) => [
    {
      label: "Catégorie 1",
      href: "#",
      items: [
        getItemArgs(`${prefix}-1-1`, "link"),
        getItemArgs(`${prefix}-1-2`, "link"),
        getItemArgs(`${prefix}-1-3`, "link"),
      ],
    },
    {
      label: "Catégorie 2",
      href: "#",
      items: [
        getItemArgs(`${prefix}-2-1`, "link"),
        getItemArgs(`${prefix}-2-2`, "link"),
        getItemArgs(`${prefix}-2-3`, "link"),
      ],
    },
    {
      label: "Catégorie 3",
      href: "#",
      items: [
        getItemArgs(`${prefix}-3-1`, "link"),
        getItemArgs(`${prefix}-3-2`, "link"),
        getItemArgs(`${prefix}-3-3`, "link"),
      ],
    },
    {
      label: "Catégorie 4",
      href: "#",
      items: [
        getItemArgs(`${prefix}-4-1`, "link"),
        getItemArgs(`${prefix}-4-2`, "link"),
        getItemArgs(`${prefix}-4-3`, "link"),
      ],
    },
  ];

  const megaMenuCategoriesWithActive = (prefix: string) => [
    {
      label: "Catégorie 1",
      href: "#",
      items: [
        getItemArgs(`${prefix}-1-1`, "link"),
        getItemArgs(`${prefix}-1-2`, "link"),
        getItemArgs(`${prefix}-1-3`, "link"),
      ],
    },
    {
      label: "Catégorie 2",
      href: "#",
      items: [
        getItemArgs(`${prefix}-2-1`, "link"),
        getItemArgs(`${prefix}-2-2`, "link", true),
        getItemArgs(`${prefix}-2-3`, "link"),
      ],
    },
    {
      label: "Catégorie 3",
      href: "#",
      items: [
        getItemArgs(`${prefix}-3-1`, "link"),
        getItemArgs(`${prefix}-3-2`, "link"),
        getItemArgs(`${prefix}-3-3`, "link"),
      ],
    },
    {
      label: "Catégorie 4",
      href: "#",
      items: [
        getItemArgs(`${prefix}-4-1`, "link"),
        getItemArgs(`${prefix}-4-2`, "link"),
        getItemArgs(`${prefix}-4-3`, "link"),
      ],
    },
  ];
</script>

{#snippet template(args: Args)}
  <dsfr-navigation id={args.id} aria-label={args.ariaLabel} items={args.items}></dsfr-navigation>
{/snippet}

<Story
  name="Navigation"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-navigation");

    await step("La navigation est rendue", async () => {
      const nav = el?.shadowRoot?.querySelector("nav.fr-nav");
      await expect(nav).toBeTruthy();
      const list = el?.shadowRoot?.querySelector(".fr-nav__list");
      await expect(list).toBeTruthy();
    });

    await step("Les items de navigation sont présents", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".fr-nav__item");
      await expect(items?.length).toBeGreaterThan(0);
    });
  }}
/>

<Story
  name="Liens"
  args={{
    id: "navigation-links",
    items: [
      getItemArgs("nav-links-01"),
      getItemArgs("nav-links-02"),
      getItemArgs("nav-links-03", "link", true),
      getItemArgs("nav-links-04"),
    ],
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-navigation");

    await step("Les liens de navigation sont rendus", async () => {
      const links = el?.shadowRoot?.querySelectorAll(".fr-nav__link");
      await expect(links?.length).toBe(4);
    });

    await step("Le lien actif est marqué aria-current=page", async () => {
      const activeLink = el?.shadowRoot?.querySelector('.fr-nav__link[aria-current="page"]');
      await expect(activeLink).toBeTruthy();
    });
  }}
/>

<Story
  name="Menus"
  args={{
    id: "navigation-menus",
    items: [
      {
        ...getItemArgs("nav-menus-01", "menu", true),
        items: [
          getItemArgs("nav-menus-01-1"),
          getItemArgs("nav-menus-01-2", "link", true),
          getItemArgs("nav-menus-01-3"),
        ],
      },
      {
        ...getItemArgs("nav-menus-02", "menu"),
        items: [
          getItemArgs("nav-menus-02-1"),
          getItemArgs("nav-menus-02-2"),
          getItemArgs("nav-menus-02-3"),
        ],
      },
      {
        ...getItemArgs("nav-menus-03", "menu"),
        items: [
          getItemArgs("nav-menus-03-1"),
          {
            ...getItemArgs("nav-menus-03-2", "menu"),
            items: [
              getItemArgs("nav-menus-03-2-1"),
              getItemArgs("nav-menus-03-2-2"),
              getItemArgs("nav-menus-03-2-3"),
            ],
          },
          getItemArgs("nav-menus-03-3"),
        ],
      },
    ],
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-navigation");

    await step("Les boutons de menu sont rendus", async () => {
      const buttons = el?.shadowRoot?.querySelectorAll(".fr-nav__btn");
      await expect(buttons?.length).toBe(3);
    });

    await step("Le clic sur un bouton ouvre le sous-menu", async () => {
      const button = el?.shadowRoot?.querySelector(".fr-nav__btn") as HTMLElement;
      await userEvent.click(button);
      const expanded = el?.shadowRoot?.querySelector(".fr-collapse--expanded");
      await expect(expanded).toBeTruthy();
    });

    await step("Le sous-menu contient des liens", async () => {
      const submenuLinks = el?.shadowRoot?.querySelectorAll(".fr-menu__list .fr-nav__link");
      await expect(submenuLinks?.length).toBeGreaterThan(0);
    });

    await step("Un second clic ferme le sous-menu", async () => {
      const button = el?.shadowRoot?.querySelector(".fr-nav__btn") as HTMLElement;
      await userEvent.click(button);
      const expanded = el?.shadowRoot?.querySelector(".fr-collapse--expanded");
      await expect(expanded).toBeNull();
    });
  }}
/>

<Story
  name="Mega Menus"
  args={{
    id: "navigation-mega-menus",
    items: [
      {
        ...getItemArgs("nav-mega-01", "mega-menu"),
        categories: megaMenuCategories("nav-mega-01"),
      },
      {
        ...getItemArgs("nav-mega-02", "mega-menu", true),
        categories: megaMenuCategoriesWithActive("nav-mega-02"),
      },
      {
        ...getItemArgs("nav-mega-03", "mega-menu"),
        categories: megaMenuCategories("nav-mega-03"),
      },
    ],
  }}
/>
