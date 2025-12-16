import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrRadiosGroupWebComponent from "./DsfrRadiosGroupWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrRadiosGroup",
  component: DsfrRadiosGroupWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrRadiosGroupWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
