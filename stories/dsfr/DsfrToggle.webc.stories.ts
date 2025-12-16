import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrToggleWebComponent from "./DsfrToggleWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrToggle",
  component: DsfrToggleWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrToggleWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
