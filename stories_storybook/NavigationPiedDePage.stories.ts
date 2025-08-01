import type { Meta, StoryObj } from "@storybook/svelte";

import NavigationPiedDePage from "$lib/pied-de-page/NavigationPiedDePage.svelte";

const meta = {
  title: "Composants/NavigationPiedDePage",
  component: NavigationPiedDePage,
  args: {
    conforme: false,
  },
  argTypes: {
    conforme: {
      description: "Indique si la navigation est conforme ou non conforme.",
      control: "boolean",
    },
  },
} satisfies Meta<NavigationPiedDePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};

export const Conforme: Story = {
  args: {
    conforme: true,
  },
};
