<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrConnect from "$lib/dsfr/DsfrConnect.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Connect Button",
    component: DsfrConnect,
    argTypes: {
      id: {
        control: "text",
        description: "Attribut id du bouton franceConnect",
        type: {
          value: "string",
        },
        table: { category: "attributes" },
      },
      variant: {
        control: {
          type: "select",
          labels: {
            default: "FranceConnect",
            // agent: 'AgentConnect',
            plus: "FranceConnect+",
            pro: "ProConnect",
          },
        },
        description: "Variation de bouton franceConnect",
        options: ["default", "plus", "pro"],
      },
      markup: {
        control: { type: "select" },
        description: "Type de balise HTML",
        options: ["button", "a"],
      },
      disabled: {
        control: "boolean",
        description: "Désactive le bouton",
        type: {
          value: "boolean",
        },
      },
    },
    args: {
      variant: "pro",
      markup: "button",
      disabled: false,
      id: "france-connect",
      href: "#",
    },
    render: template,
  });

  type Args = ComponentProps<DsfrConnect>;
</script>

{#snippet template(args: Args)}
  <dsfr-connect
    id={args.id}
    href={args.href}
    variant={args.variant}
    markup={args.markup}
    disabled={args.disabled || undefined}
  ></dsfr-connect>
{/snippet}

<Story name="Défaut" />
