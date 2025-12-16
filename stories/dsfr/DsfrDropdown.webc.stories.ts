import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrDropdownWebComponent from "./DsfrDropdownWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrDropdown",
  component: DsfrDropdownWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrDropdownWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
