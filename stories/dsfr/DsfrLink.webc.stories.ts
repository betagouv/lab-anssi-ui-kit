import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrLinkWebComponent from "./DsfrLinkWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrLink",
  component: DsfrLinkWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrLinkWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
