import type { Meta, StoryObj } from "@storybook/svelte";
import { expect, userEvent } from "@storybook/test";

import Bandeau from "$lib/mes-services-cyber/bandeau/Bandeau.svelte";

const meta = {
  title: "Composants/Bandeau",
  component: Bandeau,
  play: async ({ canvas, canvasElement }) => {
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(canvasElement.querySelector("div.largeur-totale")).not.toBeInTheDocument();
  },
} satisfies Meta<Bandeau>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
