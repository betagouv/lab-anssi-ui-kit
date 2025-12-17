<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import Bandeau from "$lib/composants/mes-services-cyber/bandeau/Bandeau.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Bandeau",
    component: Bandeau,
    play: async ({ canvas, canvasElement }) => {
      const button = canvasElement
        .querySelector("lab-anssi-mes-services-cyber-bandeau")
        ?.shadowRoot?.querySelector("button");
      if (!button) return;

      await userEvent.click(button);
      await expect(canvasElement.querySelector("div.largeur-totale")).not.toBeInTheDocument();
    },
    render: template,
  });

  type Args = ComponentProps<Bandeau>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-mes-services-cyber-bandeau></lab-anssi-mes-services-cyber-bandeau>
{/snippet}

<Story name="Defaut" />
