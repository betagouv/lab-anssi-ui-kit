<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import Alerte from "$lib/composants/Alerte.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Alerte",
    component: Alerte,
    args: {
      description: "Une alerte d'information",
      type: "information",
      fermable: true,
    },
    argTypes: {
      description: { control: "text", type: "string" },
      type: {
        control: { type: "select" },
        options: ["information", "erreur"],
      },
      fermable: { control: "boolean", type: "boolean" },
    },
    play: async ({ _canvas, canvasElement }) => {
      const button = canvasElement
        .querySelector("lab-anssi-alerte")
        ?.shadowRoot?.querySelector("button");
      if (!button) return;

      await userEvent.click(button);
      await expect(canvasElement.querySelector("div")).not.toBeInTheDocument();
    },
    render: template,
  });

  type Args = ComponentProps<Alerte>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-alerte {...args}></lab-anssi-alerte>
{/snippet}

<Story
  name="Information"
  args={{ description: "Une alerte d'information", type: "information", fermable: true }}
/>

<Story
  name="Erreur"
  args={{ description: "Une alerte d'erreur", type: "erreur", fermable: true }}
/>

<Story name="Avec usage du slot par défaut">
  {#snippet template(args: Args)}
    <lab-anssi-alerte type={args.type} fermable={args.fermable || undefined}>
      Une alerte avec du contenu dans le <strong>slot par défaut</strong>
    </lab-anssi-alerte>
  {/snippet}
</Story>
