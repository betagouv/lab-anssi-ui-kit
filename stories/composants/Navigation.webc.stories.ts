import type { Meta, StoryObj } from "@storybook/svelte-vite";
import NavigationWebComponent from "./NavigationWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Navigation",
  component: NavigationWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof NavigationWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
