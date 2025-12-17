<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tileArgTypes,
    tileArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/tile/template/stories/tile-arg-types.js";
  import CityHall from "@gouvfr/dsfr/dist/artwork/pictograms/buildings/city-hall.svg?raw";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import DsfrTile from "$lib/dsfr/DsfrTile.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tile",
    component: DsfrTile,
    argTypes: tileArgTypes,
    args: { ...tileArgs, href: "#" },
    render: template,
  });

  type Args = ComponentProps<DsfrTile>;
</script>

{#snippet template(args: Args)}
  <dsfr-tile
    title={args.title}
    has-description={args.hasDescription || undefined}
    description={args.description}
    has-details={args.hasDetails || undefined}
    details={args.details}
    markup-level={args.markupLevel}
    pictogram-name={args.pictogramName}
    has-badge={args.hasBadge || undefined}
    has-tag={args.hasTag || undefined}
    enlarge={args.enlarge || undefined}
    action-markup={args.actionMarkup}
    href={args.href}
    action-title={args.actionTitle}
    no-link={args.noLink || undefined}
    disabled={args.disabled || undefined}
    blank={args.blank || undefined}
    download={args.download || undefined}
    lang={args.lang}
    assess={args.assess || undefined}
    assess-bytes={args.assessBytes || undefined}
    size={args.size}
    horizontal={args.horizontal || undefined}
    vertical-breakpoint={args.verticalBreakpoint}
    variations={args.variations}
  >
    <dsfr-badge
      slot="badge"
      label="Libellé Badge"
      type="accent"
      accent="purple-glycine"
      size={args.size}
    ></dsfr-badge>

    <dsfr-tag slot="tag" label="Libellé Tag" size={args.size}></dsfr-tag>

    <span slot="pictogram">
      {@html CityHall}
    </span>
  </dsfr-tile>
{/snippet}

<Story name="Défaut" />

<Story name="Size Small" args={{ size: "sm" }} />

<Story
  name="Exemple Tuile DSC"
  args={{
    title: "Pour tous les enseignements",
    hasDescription: true,
    description:
      "CyberEnJeux est un outil pédagogique développé pour le monde éducatif, pouvant être organisé dans tout type de disciplines.",
    hasDetails: false,
    hasTag: undefined,
  }}
/>
