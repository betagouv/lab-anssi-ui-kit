<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
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

<Story name="Navigation" />

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
