import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrCheckboxWebComponent from "./DsfrCheckboxWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrCheckbox",
  component: DsfrCheckboxWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrCheckboxWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
