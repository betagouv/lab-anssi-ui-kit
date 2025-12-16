import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrTileWebComponent from "./DsfrTileWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrTile",
  component: DsfrTileWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrTileWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
