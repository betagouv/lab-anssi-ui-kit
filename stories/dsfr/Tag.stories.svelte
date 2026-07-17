<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tagArgs,
    tagArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tag-arg-types.js";

  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Tag",
    component: DsfrTag,
    argTypes: {
      ...tagArgTypes,
      onselected: {
        description: "Déclenché lorsque le tag est sélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onunselected: {
        description: "Déclenché lorsque le tag est désélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: tagArgs,
    parameters: {
      actions: { handles: ["selected", "unselected"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-tag"),
        },
      },
    },
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
