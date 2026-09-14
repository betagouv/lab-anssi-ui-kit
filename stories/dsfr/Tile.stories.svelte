<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    tileArgTypes,
    tileArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/tile/template/stories/tile-arg-types.js";
  import CityHall from "@gouvfr/dsfr/dist/artwork/pictograms/buildings/city-hall.svg?raw";

  import "$lib/dsfr/DsfrBadge.svelte";
  import "$lib/dsfr/DsfrTag.svelte";
  import DsfrTile from "$lib/dsfr/DsfrTile.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Tile",
    component: DsfrTile,
    argTypes: {
      ...tileArgTypes,
      description: {
        description: "Description personnalisée de la tuile (remplace la prop `description`)",
        control: false,
        table: { category: "Slots" },
      },
      badge: {
        description: "Badge personnalisé dans la tuile",
        control: false,
        table: { category: "Slots" },
      },
      tag: {
        description: "Tag personnalisé dans la tuile",
        control: false,
        table: { category: "Slots" },
      },
      pictogram: {
        description: "Pictogramme SVG personnalisé (remplace la prop `pictogramName`)",
        control: false,
        table: { category: "Slots" },
      },
      noIcon: {
        control: "boolean",
        description:
          "Si true, ajoute la classe fr-tile--no-icon pour désactiver l'icône associée au lien",
      },
    },
    args: { ...tileArgs, href: "#" },
    parameters: {
      docs: {
        description: {
          component:
            "[Voir la documentation du composant](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tuile)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-tile"),
        },
      },
    },
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
    no-icon={args.noIcon || undefined}
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
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html CityHall}
    </span>
  </dsfr-tile>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const dsfrTile = canvasElement.querySelector("dsfr-tile");

    await step("La tuile est rendue", async () => {
      const tile = dsfrTile?.shadowRoot?.querySelector(".fr-tile");
      await expect(tile).toBeTruthy();
    });

    await step("Le titre est affiché avec un lien", async () => {
      const title = dsfrTile?.shadowRoot?.querySelector(".fr-tile__title");
      await expect(title).toBeTruthy();
      await expect(title?.textContent?.trim()).toBe("Intitulé de la tuile");

      const link = title?.querySelector("a");
      await expect(link).toBeTruthy();
      await expect(link?.getAttribute("href")).toBe("#");
    });
  }}
/>

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="Avec Tag" args={{ enlarge: true, hasTag: true }} />

<Story name="Avec Badge" args={{ enlarge: true, hasBadge: true }} />

<Story
  name="Horizontale"
  args={{ enlarge: true, hasDescription: true, horizontal: true, hasDetails: true }}
  play={async ({ canvasElement, step }) => {
    const dsfrTile = canvasElement.querySelector("dsfr-tile");

    await step("La tuile a la classe horizontale", async () => {
      const tile = dsfrTile?.shadowRoot?.querySelector(".fr-tile");
      await expect(tile?.classList.contains("fr-tile--horizontal")).toBe(true);
    });

    await step("La description est affichée", async () => {
      const desc = dsfrTile?.shadowRoot?.querySelector(".fr-tile__desc");
      await expect(desc).toBeTruthy();
    });
  }}
/>

<Story
  name="Horizontale taille SM"
  args={{ enlarge: true, size: "sm", horizontal: true, hasDetails: true }}
/>

<Story
  name="Téléchargement"
  args={{
    enlarge: true,
    title: "Télécharger le document XX",
    download: true,
    hasDetails: true,
    details: "Détail obligatoire (Extension - Poids - Langue)",
  }}
  play={async ({ canvasElement, step }) => {
    const dsfrTile = canvasElement.querySelector("dsfr-tile");

    await step("La tuile a la classe download", async () => {
      const tile = dsfrTile?.shadowRoot?.querySelector(".fr-tile");
      await expect(tile?.classList.contains("fr-tile--download")).toBe(true);
    });

    await step("Le détail obligatoire est affiché", async () => {
      const detail = dsfrTile?.shadowRoot?.querySelector(".fr-tile__detail");
      await expect(detail?.textContent?.trim()).toBe(
        "Détail obligatoire (Extension - Poids - Langue)",
      );
    });
  }}
/>

<Story
  name="Téléchargement bouton"
  args={{
    enlarge: true,
    title: "Télécharger le document XX",
    actionMarkup: "button",
    download: true,
    hasDescription: true,
    description: "Description (optionnelle)",
    hasDetails: true,
    details: "Détail obligatoire (Extension - Poids - Langue)",
  }}
/>

<Story
  name="Horizontale verticale à partir de MD"
  args={{ enlarge: true, horizontal: true, verticalBreakpoint: "md", hasDescription: true }}
/>

<Story name="Sans lien" args={{ actionMarkup: false, noLink: true }} />

<Story
  name="Horizontale sans lien"
  args={{ actionMarkup: false, noLink: true, horizontal: true }}
/>
