import type { Meta, StoryObj } from "@storybook/svelte-vite";
import IconeWebComponent from "./IconeWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Icone",
  component: IconeWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof IconeWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
