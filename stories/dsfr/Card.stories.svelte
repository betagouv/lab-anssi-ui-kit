<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    cardArgs,
    cardArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/card/template/stories/card-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";
  import Placeholder1x1 from "@gouvfr/dsfr/example/img/placeholder.1x1.png";
  import Placeholder3x4 from "@gouvfr/dsfr/example/img/placeholder.3x4.png";

  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Card",
    component: DsfrCard,
    argTypes: {
      ...cardArgTypes,
      badgesgroup: {
        description: "Groupe de badges affiché dans le contenu de la carte",
        control: false,
        table: { category: "Slots" },
      },
      tagsgroup: {
        description: "Groupe de tags affiché en pied de carte",
        control: false,
        table: { category: "Slots" },
      },
      contentend: {
        description: "Contenu supplémentaire après la description",
        control: false,
        table: { category: "Slots" },
      },
      buttonsgroup: {
        description: "Groupe de boutons d'action en pied de carte",
        control: false,
        table: { category: "Slots" },
      },
      linksgroup: {
        description: "Groupe de liens en pied de carte",
        control: false,
        table: { category: "Slots" },
      },
      headerbadges: {
        description: "Badges superposés à l'image d'en-tête",
        control: false,
        table: { category: "Slots" },
      },
      image: {
        description:
          "Permet d'utiliser une image personnalisée (ex. <picture>, <svg>, ou <img>) en remplacement de l'image par défaut et des styles associées",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      ...cardArgs,
      src: Placeholder,
      buttons: [
        {
          label: "libellé du bouton 1",
          kind: "primary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 2",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 3",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
      ],
    },
    parameters: {
      docs: {
        description: {
          component:
            "La carte donne des aperçus cliquables d'une page de contenu à l'utilisateur. Elle fait généralement partie d'une collection ou liste d'aperçus de contenu similaires. La carte n'est jamais présentée de manière isolée.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/carte)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-card"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCard>;
</script>

{#snippet template(args: Args)}
  <dsfr-card
    src={args.src}
    alt={args.alt}
    id={args.id}
    title={args.title}
    has-description={args.hasDescription || undefined}
    description={args.description}
    has-detail-start={args.hasDetailStart || undefined}
    detail-start={args.detailStart}
    has-detail-start-icon={args.hasDetailStartIcon || undefined}
    detail-start-icon={args.detailStartIcon}
    has-detail-end={args.hasDetailEnd || undefined}
    detail-end={args.detailEnd}
    has-detail-end-icon={args.hasDetailEndIcon || undefined}
    detail-end-icon={args.detailEndIcon}
    has-badge={args.hasBadge || undefined}
    has-tag={args.hasTag || undefined}
    markup={args.markup}
    enlarge={args.enlarge || undefined}
    action-markup={args.actionMarkup}
    action-title={args.actionTitle}
    href={args.href}
    blank={args.blank || undefined}
    no-link={args.noLink || undefined}
    disabled={args.disabled || undefined}
    size={args.size}
    horizontal={args.horizontal || undefined}
    horizontal-proportion={args.horizontalProportion}
    has-header-badge={args.hasHeaderBadge || undefined}
    image-ratio={args.imageRatio}
    has-buttons={args.hasButtons || undefined}
    has-links={args.hasLinks || undefined}
    variations={args.variations}
    download={args.download || undefined}
    has-download-icon={args.hasDownloadIcon || undefined}
    no-icon={args.noIcon || undefined}
    lang={args.lang}
  >
    <!-- Badges Group (slot: badgesgroup) -->
    <dsfr-badges-group
      slot="badgesgroup"
      badges={[
        { label: "Libellé badge", accent: "purple-glycine" },
        { label: "Libellé badge", accent: "purple-glycine" },
      ]}
      size={args.size}
    ></dsfr-badges-group>

    <!-- Badges Group (slot: headerbadges) -->
    <dsfr-badges-group
      slot="headerbadges"
      badges={[
        { label: "Libellé badge", accent: "purple-glycine" },
        { label: "Libellé badge", accent: "purple-glycine" },
      ]}
      size={args.size}
    ></dsfr-badges-group>

    <!-- Tags Group (slot: tagsgroup) -->
    <dsfr-tags-group
      slot="tagsgroup"
      tags={[
        { id: "tag-1", label: "Libellé du tag" },
        { id: "tag-2", label: "Libellé du tag" },
      ]}
      size={args.size}
      group-markup="div"
    ></dsfr-tags-group>

    <!-- Tags Group (slot: contentend) -->
    {#if args.hasContentEnd}
      <dsfr-tags-group
        slot="contentend"
        tags={[{ id: "tag-1", label: "Libellé du tag" }]}
        size={args.size}
        group-markup="div"
      ></dsfr-tags-group>
    {/if}

    <!-- Buttons Group (slot: buttonsgroup) -->
    <dsfr-buttons-group slot="buttonsgroup" buttons={args.buttons}></dsfr-buttons-group>
  </dsfr-card>
{/snippet}

<Story name="Défaut" args={{ hasHeaderBadge: undefined, hasDetailEnd: undefined }} />

<Story
  name="Taille SM"
  args={{
    enlarge: true,
    size: "sm",
    hasDescription: false,
  }}
/>

<Story
  name="Taille MD"
  args={{
    enlarge: true,
    size: "md",
    hasDescription: false,
  }}
/>

<Story
  name="Taille LG"
  args={{
    enlarge: true,
    size: "lg",
    hasDescription: false,
  }}
/>

<Story
  name="Verticale"
  args={{ enlarge: true, hasDescription: true, description: "Description (optionnelle)" }}
/>

<Story name="Horizontale" args={{ enlarge: true, horizontal: true, hasTag: true }} />

<Story name="Horizontale SM" args={{ enlarge: true, size: "sm", horizontal: true, hasTag: true }} />

<Story name="Horizontale MD" args={{ enlarge: true, size: "md", horizontal: true, hasTag: true }} />

<Story name="Horizontale LG" args={{ enlarge: true, size: "lg", horizontal: true, hasTag: true }} />

<Story
  name="Horizontale tiers"
  args={{ enlarge: true, horizontal: true, horizontalProportion: "tier", hasBadge: true }}
/>

<Story
  name="Horizontale moitié"
  args={{ enlarge: true, horizontal: true, horizontalProportion: "half", hasBadge: true }}
/>

<Story
  name="Téléchargement"
  args={{
    enlarge: true,
    title: "Télécharger le document XX",
    download: true,
  }}
/>

<Story
  name="Téléchargement bouton"
  args={{
    enlarge: true,
    title: "Télécharger le document XX",
    actionMarkup: "button",
    download: true,
  }}
/>

<Story
  name="Téléchargement avec détail fichier"
  args={{
    enlarge: true,
    title: "Télécharger le document XX",
    hasDescription: true,
    description: "Les détails du document (format, poids) sont injectés en js automatiquement",
    download: true,
    href: "img/placeholder.16x9.pdf",
    hasDetailEnd: true,
    detailEnd: "PDF",
  }}
/>

<Story name="Actions boutons" args={{ hasButtons: true, enlarge: false }} />

<Story name="Actions liens" args={{ hasLinks: true, enlarge: false }}>
  {#snippet template(args: Args)}
    <dsfr-card
      src={args.src}
      alt={args.alt}
      id={args.id}
      title={args.title}
      has-description={args.hasDescription || undefined}
      description={args.description}
      has-detail-start={args.hasDetailStart || undefined}
      detail-start={args.detailStart}
      has-detail-start-icon={args.hasDetailStartIcon || undefined}
      detail-start-icon={args.detailStartIcon}
      has-detail-end={args.hasDetailEnd || undefined}
      detail-end={args.detailEnd}
      has-detail-end-icon={args.hasDetailEndIcon || undefined}
      detail-end-icon={args.detailEndIcon}
      has-badge={args.hasBadge || undefined}
      has-tag={args.hasTag || undefined}
      markup={args.markup}
      enlarge={args.enlarge || undefined}
      action-markup={args.actionMarkup}
      action-title={args.actionTitle}
      href={args.href}
      blank={args.blank || undefined}
      no-link={args.noLink || undefined}
      disabled={args.disabled || undefined}
      size={args.size}
      horizontal={args.horizontal || undefined}
      horizontal-proportion={args.horizontalProportion}
      has-header-badge={args.hasHeaderBadge || undefined}
      image-ratio={args.imageRatio}
      has-buttons={args.hasButtons || undefined}
      has-links={args.hasLinks || undefined}
      variations={args.variations}
      download={args.download || undefined}
      has-download-icon={args.hasDownloadIcon || undefined}
      no-icon={args.noIcon || undefined}
      lang={args.lang}
    >
      <!-- Badges Group (slot: badgesgroup) -->
      <dsfr-badges-group
        slot="badgesgroup"
        badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
        size="sm"
      ></dsfr-badges-group>

      <!-- Badges Group (slot: headerbadges) -->
      <dsfr-badges-group
        slot="headerbadges"
        badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
        size="sm"
      ></dsfr-badges-group>

      <!-- Tags Group (slot: tagsgroup) -->
      <dsfr-tags-group
        slot="tagsgroup"
        tags={[{ id: "tag-1", label: "Libellé du tag" }]}
        size="sm"
        group-markup="div"
      ></dsfr-tags-group>

      <!-- Tags Group (slot: contentend) -->
      <dsfr-tags-group
        slot="contentend"
        tags={[{ id: "tag-1", label: "Libellé du tag" }]}
        size="sm"
        group-markup="div"
      ></dsfr-tags-group>

      <!-- Links (slot: linksgroup) -->
      <div slot="linksgroup">
        <dsfr-link label="Libellé" href="#" has-icon icon="arrow-right-line" icon-place="right"
        ></dsfr-link>
        <dsfr-link label="Libellé" href="#" has-icon icon="arrow-right-line" icon-place="right"
        ></dsfr-link>
      </div>
    </dsfr-card>
  {/snippet}
</Story>

<Story name="Variation Grise" args={{ variations: "grey" }} />

<Story name="Variation Sans bordure" args={{ variations: "no-border" }} />

<Story
  name="Variation Sans fond"
  args={{ variations: "no-background" }}
  parameters={{
    docs: {
      description: {
        story:
          "Fonctionne avec une classe utilitaire de background sur un parent pour propager la couleur sur le hover et le clic.<br> Exemple : `fr-background--alt-orange-terre-battue`",
      },
    },
  }}
/>

<Story name="Variation Ombrée" args={{ variations: "shadow" }} />

<Story
  name="Désactivée"
  args={{ disabled: true, hasDescription: true, description: "Description (optionnelle)" }}
/>
