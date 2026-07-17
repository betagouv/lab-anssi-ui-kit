<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    badgeArgs,
    badgeArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badge-arg-types.js";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Badge",
    component: DsfrBadge,
    argTypes: badgeArgTypes,
    args: badgeArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-badge"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBadge>;
</script>

{#snippet template(args: Args)}
  <dsfr-badge
    label={args.label}
    accent={args.accent}
    ellipsis={args.ellipsis || undefined}
    has-icon={args.hasIcon || undefined}
    has-no-icon={args.hasNoIcon || undefined}
    icon={args.icon}
    size={args.size}
    status={args.status}
    type={args.type}
  ></dsfr-badge>
{/snippet}

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
