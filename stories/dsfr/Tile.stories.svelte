<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    tileArgTypes,
    tileArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/tile/template/stories/tile-arg-types.js";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import DsfrTile from "$lib/dsfr/DsfrTile.svelte";

  import CityHall from "@gouvfr/dsfr/dist/artwork/pictograms/buildings/city-hall.svg?raw";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tile",
    component: DsfrTile,
    argTypes: tileArgTypes,
    args: { ...tileArgs, href: "#" },
  });
</script>

<Story name="Défaut">
  {#snippet template(args)}
    <DsfrTile {...args}>
      <DsfrBadge slot="badge" label="Libellé Badge" type="accent" accent="purple-glycine" />

      <DsfrTag slot="tag" label="Libellé Tag" />

      <svelte:fragment slot="pictogram">
        {@html CityHall}
      </svelte:fragment>
    </DsfrTile>
  {/snippet}
</Story>

<Story name="Size Small" args={{ ...args, size: "sm" }}>
  {#snippet template(args)}
    <DsfrTile {...args}>
      <DsfrBadge
        slot="badge"
        label="Libellé Badge"
        size="sm"
        type="accent"
        accent="purple-glycine"
      />

      <DsfrTag slot="tag" label="Libellé Tag" size="sm" />

      <svelte:fragment slot="pictogram">
        {@html CityHall}
      </svelte:fragment>
    </DsfrTile>
  {/snippet}
</Story>

<Story
  name="Exemple Tuile DSC"
  args={{
    title: "Pour tous les enseignements",
    hasDescription: true,
    description:
      "CyberEnJeux est un outil pédagogique développé pour le monde éducatif, pouvant être organisé dans tout type de disciplines.",
    hasDetails: false,
    actionMarkup: "false",
    noLink: true,
  }}
>
  {#snippet template(args)}
    <DsfrTile {...args}>
      <svelte:fragment slot="pictogram">
        {@html CityHall}
      </svelte:fragment>
    </DsfrTile>
  {/snippet}
</Story>
