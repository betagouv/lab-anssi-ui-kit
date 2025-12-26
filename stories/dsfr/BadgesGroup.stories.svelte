<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    badgesGroupArgTypes,
    badgesGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badges-group-arg-types.js";

  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Badges Group",
    component: DsfrBadgesGroup,
    argTypes: badgesGroupArgTypes,
    args: badgesGroupArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrBadgesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-badges-group badges={args.badges} size={args.size} group-markup={args.groupMarkup}
  ></dsfr-badges-group>
{/snippet}

<Story name="Défaut" />
