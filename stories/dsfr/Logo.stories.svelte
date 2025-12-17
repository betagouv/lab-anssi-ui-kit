<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    logoArgTypes,
    logoArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/logo/template/stories/logo-arg-types.js";

  import DsfrLogo from "$lib/dsfr/DsfrLogo.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Logo",
    component: DsfrLogo,
    argTypes: logoArgTypes,
    args: logoArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrLogo>;
</script>

{#snippet template(args: Args)}
  <dsfr-logo {...args}></dsfr-logo>
{/snippet}

<Story name="Défaut" />
