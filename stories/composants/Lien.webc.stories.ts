import type { Meta, StoryObj } from "@storybook/svelte-vite";
import LienWebComponent from "./LienWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Lien",
  component: LienWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof LienWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
