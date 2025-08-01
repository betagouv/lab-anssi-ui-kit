import type { Meta, StoryObj } from "@storybook/svelte";

import PresentationANSSI from "$lib/lab/vitrines-produits/briques/PresentationANSSI.svelte";

const meta = {
  title: "Composants/Presentation ANSSI",
  component: PresentationANSSI,
} satisfies Meta<PresentationANSSI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
