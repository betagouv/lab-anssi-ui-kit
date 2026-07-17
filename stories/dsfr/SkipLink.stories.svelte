<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    skiplinkArgTypes,
    skiplinkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/skiplink/template/stories/skiplink-arg-types.js";

  import DsfrSkipLink from "$lib/dsfr/DsfrSkipLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/SkipLink",
    component: DsfrSkipLink,
    argTypes: skiplinkArgTypes,
    args: skiplinkArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-skiplink"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSkipLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-skiplink items={args.items} aria-label={args.ariaLabel}></dsfr-skiplink>
{/snippet}

<Story name="Défaut" />
