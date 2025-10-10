<script module lang="ts">
  import DsfrSideMenu from "$lib/dsfr/DsfrSideMenu.svelte";
  import {
    sidemenuArgTypes,
    sidemenuArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/sidemenu/template/stories/sidemenu-arg-types.js";
  import { defineMeta } from "@storybook/addon-svelte-csf";

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
    title: "Composants/dsfr/Side Menu",
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
  });
</script>

<Story name="Défaut">
  {#snippet template(args)}
    <div style="width: 300px">
      <DsfrSideMenu {...args} />
    </div>
  {/snippet}
</Story>
