import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrNavigationWebComponent from "./DsfrNavigationWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrNavigation",
  component: DsfrNavigationWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrNavigationWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
