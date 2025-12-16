import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrButtonsGroupWebComponent from "./DsfrButtonsGroupWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrButtonsGroup",
  component: DsfrButtonsGroupWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrButtonsGroupWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
