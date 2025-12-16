import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrConnectWebComponent from "./DsfrConnectWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrConnect",
  component: DsfrConnectWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrConnectWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
