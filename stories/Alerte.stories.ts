import type { Meta, StoryObj } from "@storybook/svelte";
import { expect, userEvent } from "storybook/test";

import Alerte from "$lib/Alerte.svelte";

const meta = {
  title: "Composants/ANSSI/Alerte",
  component: Alerte,
  argTypes: {
    description: { control: "text", type: "string" },
    type: {
      control: { type: "select" },
      options: ["information", "erreur"],
    },
    fermable: { control: "boolean", type: "boolean" },
  },
  play: async ({ canvas, canvasElement }) => {
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(canvasElement.querySelector("div")).not.toBeInTheDocument();
  },
} satisfies Meta<Alerte>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {
  args: {
    description: "Une alerte d'information",
    type: "information",
    fermable: true,
  },
};

export const Erreur: Story = {
  args: {
    description: "Une alerte d'erreur",
    type: "erreur",
    fermable: true,
  },
};
