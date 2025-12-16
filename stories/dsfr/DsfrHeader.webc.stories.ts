import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrHeaderWebComponent from "./DsfrHeaderWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrHeader",
  component: DsfrHeaderWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrHeaderWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
