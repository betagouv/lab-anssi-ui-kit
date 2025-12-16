import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrCardWebComponent from "./DsfrCardWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrCard",
  component: DsfrCardWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrCardWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
