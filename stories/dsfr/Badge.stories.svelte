<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    badgeArgs,
    badgeArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badge-arg-types.js";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Badge",
    component: DsfrBadge,
    argTypes: badgeArgTypes,
    args: badgeArgs,
  });
</script>

<Story name="Défaut" />

<Story
  name="SizeSM"
  args={{
    size: "sm",
  }}
/>

<Story
  name="Accent"
  args={{
    type: "accent",
    accent: "green-menthe",
  }}
/>

<Story
  name="Ellipsis"
  args={{
    ellipsis: true,
    label:
      "Label très long qui sera tronqué lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus sit amet luctus",
  }}
/>
