import type { Meta, StoryObj } from "@storybook/svelte";
import { expect, userEvent } from "storybook/test";

import Bandeau from "$lib/mes-services-cyber/bandeau/Bandeau.svelte";

// Styles
import "@gouvfr/dsfr/dist/core/core.min.css";
import "@gouvfr/dsfr/dist/component/form/form.min.css";
import "@gouvfr/dsfr/dist/component/select/select.min.css";

const meta = {
  title: "Composants/ANSSI/Bandeau",
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
