import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrSkipLinkWebComponent from "./DsfrSkipLinkWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrSkipLink",
  component: DsfrSkipLinkWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrSkipLinkWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
