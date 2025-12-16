import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrRadioWebComponent from "./DsfrRadioWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrRadio",
  component: DsfrRadioWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrRadioWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
