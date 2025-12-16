import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrSegmentedWebComponent from "./DsfrSegmentedWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrSegmented",
  component: DsfrSegmentedWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrSegmentedWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
