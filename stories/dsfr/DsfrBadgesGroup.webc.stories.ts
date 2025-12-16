import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrBadgesGroupWebComponent from "./DsfrBadgesGroupWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrBadgesGroup",
  component: DsfrBadgesGroupWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrBadgesGroupWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
