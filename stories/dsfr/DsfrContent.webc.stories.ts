import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrContentWebComponent from "./DsfrContentWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrContent",
  component: DsfrContentWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrContentWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
