import type { Meta, StoryObj } from "@storybook/svelte-vite";
import ReactionsWebComponent from "./ReactionsWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Reactions",
  component: ReactionsWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof ReactionsWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
