import type { Meta, StoryObj } from "@storybook/svelte-vite";
import EtapeWebComponent from "./EtapeWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Etape",
  component: EtapeWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof EtapeWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
