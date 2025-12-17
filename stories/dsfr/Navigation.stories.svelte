<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    navigationArgTypes,
    navigationArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/navigation/template/stories/navigation-arg-types.js";

  import DsfrNavigation from "$lib/dsfr/DsfrNavigation.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Navigation",
    component: DsfrNavigation,
    argTypes: navigationArgTypes,
    args: navigationArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrNavigation>;
</script>

{#snippet template(args: Args)}
  <dsfr-navigation id={args.id} aria-label={args.ariaLabel} items={args.items}></dsfr-navigation>
{/snippet}

<Story name="Défaut" />
