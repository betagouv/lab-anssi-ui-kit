import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrContainerWebComponent from "./DsfrContainerWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrContainer",
  component: DsfrContainerWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrContainerWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
