<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    accordionArgs,
    accordionArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/accordion/template/stories/accordion-arg-types.js";

  import DsfrAccordion from "$lib/dsfr/DsfrAccordion.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Accordion",
    component: DsfrAccordion,
    args: { ...accordionArgs, titleMarkupLevel: 4 },
    argTypes: accordionArgTypes,
    render: template,
  });

  type Args = ComponentProps<DsfrAccordion>;
</script>

{#snippet template(args: Args)}
  <dsfr-accordion
    is-expanded={args.isExpanded || undefined}
    id={args.id}
    label={args.label}
    content={args.content}
    title-markup-level={args.titleMarkupLevel}
  >
    {@html args.content}
  </dsfr-accordion>
{/snippet}

<Story name="Défaut" />
