import type { Meta, StoryObj } from "@storybook/svelte";

import ResumePssi from "$lib/lab/ResumePssi.svelte";

const meta = {
  title: "Composants/ANSSI/ResumePssi",
  component: ResumePssi,
  args: {
    nomService: "MonService",
  },
  argTypes: {
    nomService: { control: "text", description: "Le nom du service" },
  },
} satisfies Meta<ResumePssi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
