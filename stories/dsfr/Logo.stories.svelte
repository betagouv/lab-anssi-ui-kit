<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    logoArgTypes,
    logoArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/logo/template/stories/logo-arg-types.js";

  import DsfrLogo from "$lib/dsfr/DsfrLogo.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Logo",
    component: DsfrLogo,
    argTypes: logoArgTypes,
    args: logoArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-logo"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrLogo>;
</script>

{#snippet template(args: Args)}
  <dsfr-logo {...args}></dsfr-logo>
{/snippet}

<Story name="Défaut" />
