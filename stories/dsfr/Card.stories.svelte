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
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Card",
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
      groupMarkup="div"
    ></dsfr-tags-group>

    <!-- Tags Group (slot: contentend) -->
    <dsfr-tags-group
      slot="contentend"
      tags={[{ id: "tag-1", label: "Libellé du tag" }]}
      size="sm"
      groupMarkup="div"
    ></dsfr-tags-group>

    <!-- Buttons Group (slot: buttonsgroup) -->
    <dsfr-buttons-group slot="buttonsgroup" buttons={args.buttons}></dsfr-buttons-group>
  </dsfr-card>
{/snippet}

<Story name="Defaut" args={{ hasHeaderBadge: undefined, hasDetailEnd: undefined }} />

<Story
  name="Lab ANSSI - Carte Catalogue"
  args={{
    hasHeaderBadge: true,
    hasDescription: false,
    hasDetailStart: true,
    hasDetailEnd: true,
    detailEnd: "",
    detailStart: "Détail",
    size: "sm",
  }}
/>

<Story name="Avec slot image personnalisé">
  {#snippet template(args: Args)}
    <dsfr-card
      title={args.title}
      has-description={args.hasDescription || undefined}
      description={args.description}
      action-title={args.actionTitle}
      href={args.href}
      size={args.size}
    >
      <picture slot="image">
        <source media="(min-width: 48em)" srcset={Placeholder} />
        <source media="(min-width: 36em)" srcset={Placeholder3x4} />
        <img class="custom-image" src={Placeholder1x1} alt="Illustration personnalisée" />
      </picture>
    </dsfr-card>

    <style>
      .custom-image {
        max-width: 100%;
        object-fit: cover;
        height: auto;
      }
    </style>
  {/snippet}
</Story>
