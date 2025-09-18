<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-tag
      label={args.label}
      type={args.type}
      size={args.size}
      href={args.href}
      blank={args.blank}
      title={args.title}
      pressed={args.pressed}
      disabled={args.disabled}
      has-icon={args.hasIcon}
      icon={args.icon}
      accent={args.accent}
    ></dsfr-tag>
  {/snippet}
</Story>
