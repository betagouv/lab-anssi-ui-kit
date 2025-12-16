import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrTagsGroupWebComponent from "./DsfrTagsGroupWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrTagsGroup",
  component: DsfrTagsGroupWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrTagsGroupWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
