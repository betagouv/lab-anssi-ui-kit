import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrSelectWebComponent from "./DsfrSelectWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrSelect",
  component: DsfrSelectWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrSelectWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
