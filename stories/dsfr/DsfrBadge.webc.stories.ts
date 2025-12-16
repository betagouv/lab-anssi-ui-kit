import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrBadgeWebComponent from "./DsfrBadgeWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrBadge",
  component: DsfrBadgeWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrBadgeWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
