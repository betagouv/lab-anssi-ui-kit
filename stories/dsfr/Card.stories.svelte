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
