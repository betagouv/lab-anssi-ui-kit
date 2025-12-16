import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrFooterWebComponent from "./DsfrFooterWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrFooter",
  component: DsfrFooterWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrFooterWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
