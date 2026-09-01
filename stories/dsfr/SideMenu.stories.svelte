<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    sidemenuArgTypes,
    sidemenuArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/sidemenu/template/stories/sidemenu-arg-types.js";

  import DsfrSideMenu from "$lib/dsfr/DsfrSideMenu.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const getItemArgs = (id: string | number, type = "link", isActive = false) => ({
    id: type === "link" ? `sidemenu-item-${id}` : `sidemenu-${id}`,
    label: `Titre du ${type === "link" ? "lien" : "menu"} ${id}`,
    href: type === "link" && "#",
    type: type,
    active: isActive,
    isCollapsible: type === "menu",
    collapseId: type === "menu" ? `sidemenu-${id}` : undefined,
  });

  const { Story } = defineMeta({
    title: "Composants/DSFR/Sidemenu",
    component: DsfrSideMenu,
    argTypes: sidemenuArgTypes,
    args: {
      ...sidemenuArgs,
      items: [
        {
          ...getItemArgs(1, "menu", true),
          items: [getItemArgs("1-1"), getItemArgs("1-2", "link", true), getItemArgs("1-3")],
        },
        getItemArgs(2),
        {
          ...getItemArgs(3, "menu"),
          items: [
            getItemArgs("3-1"),
            {
              ...getItemArgs("3-2", "menu"),
              items: [getItemArgs("3-2-1"), getItemArgs("3-2-2"), getItemArgs("3-2-3")],
            },
            getItemArgs("3-3"),
          ],
        },
      ],
      buttonId: "sidemenu-collapse-1",
    },
    parameters: {
      docs: {
        description: {
          component:
            "Le menu latéral permet aux utilisateurs de naviguer entre les différentes pages d’une rubrique ou d’un même thème.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/menu-lateral)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-side-menu"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSideMenu>;
</script>

{#snippet template(args: Args)}
  <dsfr-side-menu
    title={args.title}
    items={args.items}
    button-label={args.buttonLabel}
    button-id={args.buttonId}
    title-id={args.titleId}
    has-title={args.hasTitle || undefined}
    modifier={args.modifier}
    active-item={args.activeItem}
  ></dsfr-side-menu>
{/snippet}

<Story name="Défaut" />

<Story
  name="Lien"
  args={{
    items: [getItemArgs("01"), getItemArgs("02", "link", true), getItemArgs("03")],
  }}
/>

<Story
  name="Sous-menu"
  args={{
    items: [
      {
        ...getItemArgs("sous-niveau 01", "menu", true),
        items: [getItemArgs("1-1"), getItemArgs("1-2", "link", true), getItemArgs("1-3")],
      },
      getItemArgs("sous-niveau 02"),
      getItemArgs("sous-niveau 03"),
    ],
  }}
/>
