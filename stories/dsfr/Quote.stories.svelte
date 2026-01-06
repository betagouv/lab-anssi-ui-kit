<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    quoteArgs,
    quoteArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/quote/template/stories/quote-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.1x1.png";

  import DsfrQuote from "$lib/dsfr/DsfrQuote.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Quote",
    component: DsfrQuote,
    args: { ...quoteArgs, src: Placeholder, sourceUrl: "www.google.com" },
    argTypes: quoteArgTypes,
    render: template,
  });

  type Args = ComponentProps<DsfrQuote>;
</script>

{#snippet template(args: Args)}
  <dsfr-quote
    text={args.text}
    size={args.size}
    has-author={args.hasAuthor || undefined}
    author={args.author}
    has-details={args.hasDetails || undefined}
    sources={args.sources}
    has-image={args.hasImage || undefined}
    src={args.src}
    alt={args.alt}
    accent={args.accent}
    source-url={args.sourceUrl}
  ></dsfr-quote>
{/snippet}

<Story name="Défaut" />
