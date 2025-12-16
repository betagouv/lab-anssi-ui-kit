import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrTextareaWebComponent from "./DsfrTextareaWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrTextarea",
  component: DsfrTextareaWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrTextareaWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
