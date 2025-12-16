import type { Meta, StoryObj } from "@storybook/svelte-vite";
import HeroWebComponent from "./HeroWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Hero",
  component: HeroWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof HeroWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
