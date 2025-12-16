import type { Meta, StoryObj } from "@storybook/svelte-vite";
import MultiSelectWebComponent from "./MultiSelectWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/MultiSelect",
  component: MultiSelectWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof MultiSelectWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
