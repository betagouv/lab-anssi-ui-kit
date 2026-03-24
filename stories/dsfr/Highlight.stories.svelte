<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    highlightArgTypes,
    highlightArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/highlight/template/stories/highlight-arg-types.js";

  import DsfrHighlight from "$lib/dsfr/DsfrHighlight.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Highlight",
    component: DsfrHighlight,
    argTypes: {
      ...highlightArgTypes,
      title: {
        description: "Titre personnalisé de la mise en avant",
        control: false,
        table: { category: "Slots" },
      },
      text: {
        description: "Texte personnalisé de la mise en avant (remplace la prop `text`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: highlightArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-highlight"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrHighlight>;
</script>

{#snippet template(args: Args)}
  <dsfr-highlight {...args}></dsfr-highlight>
{/snippet}

<Story name="Défaut" />
