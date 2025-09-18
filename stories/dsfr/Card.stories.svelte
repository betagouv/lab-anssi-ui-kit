<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    cardArgs,
    cardArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/card/template/stories/card-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Card",
    component: DsfrCard,
    argTypes: cardArgTypes,
    args: { ...cardArgs, src: Placeholder },
  });
</script>

<Story name="Defaut" />

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
>
  {#snippet template(args)}
    <DsfrCard {...args}>
      <!-- Header Badge -->
      <DsfrBadgesGroup
        slot="headerbadges"
        badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
        size="sm"
      />

      <!-- Content End -->
      <DsfrTagsGroup
        slot="contentend"
        tags={[{ id: "tag-1", label: "Libellé du tag" }]}
        size="sm"
        groupMarkup="div"
      />
    </DsfrCard>
  {/snippet}
</Story>

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-card>
      id={args.id}
      action-title={args.actionTitle}
      title={args.title}
      has-description={args.hasDescription}
      description={args.description}
      has-detail-start={args.hasDetailStart}
      detail-start={args.detailStart}
      has-detail-start-icon={args.hasDetailStartIcon}
      detail-start-icon={args.detailStartIcon}
      has-detail-end={args.hasDetailEnd}
      detail-end={args.detailEnd}
      has-detail-end-Icon={args.hasDetailEndIcon}
      detail-end-icon={args.detailEndIcon}
      markup={args.markup}
      has-badge={args.hasBadge}
      enlarge={args.enlarge}
      action-markup={args.actionMarkup}
      href={args.href}
      blank={args.blank}
      no-link={args.noLink}
      disabled={args.disabled}
      size={args.size}
      horizontal={args.horizontal}
      horizontal-proportion={args.horizontalProportion}
      src={args.src}
      alt={args.alt}
      has-header-badge={args.hasHeaderBadge}
      image-ratio={args.imageRatio}
      has-buttons={args.hasButtons}
      has-links={args.hasLinks}
      variations={args.variations}
      download={args.download}
      lang={args.lang}
      >
      <dsfr-badges-group
        slot="headerbadges"
        badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
        size="sm"
      ></dsfr-badges-group>
    </dsfr-card>
  {/snippet}
</Story>
