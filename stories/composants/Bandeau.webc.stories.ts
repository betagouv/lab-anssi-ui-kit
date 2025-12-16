import type { Meta, StoryObj } from "@storybook/svelte-vite";
import BandeauWebComponent from "./BandeauWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Bandeau",
  component: BandeauWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof BandeauWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
