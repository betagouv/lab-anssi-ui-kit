<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tagArgs,
    tagArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tag-arg-types.js";

  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tag",
    component: DsfrTag,
    argTypes: tagArgTypes,
    args: tagArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrTag>;
</script>

{#snippet template(args: Args)}
  <dsfr-tag
    label={args.label}
    type={args.type}
    size={args.size}
    href={args.href}
    blank={args.blank || undefined}
    title={args.title}
    pressed={args.pressed || undefined}
    disabled={args.disabled || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    accent={args.accent}
  ></dsfr-tag>
{/snippet}

<Story name="Défaut" />
