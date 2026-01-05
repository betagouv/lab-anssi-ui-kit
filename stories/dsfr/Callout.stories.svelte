<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    calloutArgs,
    calloutArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/callout/template/stories/callout-arg-types.js";

  import DsfrCallout from "$lib/dsfr/DsfrCallout.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Callout",
    component: DsfrCallout,
    argTypes: calloutArgTypes,
    args: calloutArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrCallout>;
</script>

{#snippet template(args: Args)}
  <dsfr-callout
    has-title={args.hasTitle || undefined}
    title={args.title}
    text={args.text}
    id={args.id}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    title-markup={args.titleMarkup}
    has-button={args.hasButton || undefined}
    button-label={args.buttonLabel}
    accent={args.accent}
  ></dsfr-callout>
{/snippet}

<Story name="Défaut" />
