import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrSideMenuWebComponent from "./DsfrSideMenuWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrSideMenu",
  component: DsfrSideMenuWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrSideMenuWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
