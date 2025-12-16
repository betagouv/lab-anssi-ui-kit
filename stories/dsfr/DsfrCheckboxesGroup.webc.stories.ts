import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrCheckboxesGroupWebComponent from "./DsfrCheckboxesGroupWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrCheckboxesGroup",
  component: DsfrCheckboxesGroupWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrCheckboxesGroupWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
