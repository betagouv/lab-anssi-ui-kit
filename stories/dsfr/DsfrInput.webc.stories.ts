import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrInputWebComponent from "./DsfrInputWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrInput",
  component: DsfrInputWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrInputWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
