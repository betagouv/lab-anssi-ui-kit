import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrSearchWebComponent from "./DsfrSearchWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrSearch",
  component: DsfrSearchWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrSearchWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
