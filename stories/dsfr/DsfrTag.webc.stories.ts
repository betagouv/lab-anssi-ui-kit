import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrTagWebComponent from "./DsfrTagWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrTag",
  component: DsfrTagWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrTagWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
