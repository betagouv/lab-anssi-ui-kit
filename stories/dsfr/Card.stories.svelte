<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    cardArgs,
    cardArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/card/template/stories/card-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Card",
    component: DsfrCard,
    argTypes: cardArgTypes,
    args: { ...cardArgs, src: Placeholder },
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
    has-description={args.hasDescription}
    description={args.description}
    has-detail-start={args.hasDetailStart}
    detail-start={args.detailStart}
    has-detail-start-icon={args.hasDetailStartIcon}
    detail-start-icon={args.detailStartIcon}
    has-detail-end={args.hasDetailEnd}
    detail-end={args.detailEnd}
    has-detail-end-icon={args.hasDetailEndIcon}
    detail-end-icon={args.detailEndIcon}
    has-badge={args.hasBadge}
    has-tag={args.hasTag}
    markup={args.markup}
    enlarge={args.enlarge}
    action-markup={args.actionMarkup}
    action-title={args.actionTitle}
    href={args.href}
    blank={args.blank}
    no-link={args.noLink}
    disabled={args.disabled}
    size={args.size}
    horizontal={args.horizontal}
    horizontal-proportion={args.horizontalProportion}
    has-header-badge={args.hasHeaderBadge}
    image-ratio={args.imageRatio}
    has-buttons={args.hasButtons}
    has-links={args.hasLinks}
    variations={args.variations}
    download={args.download}
    has-download-icon={args.hasDownloadIcon}
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
