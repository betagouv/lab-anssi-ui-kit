import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrPaginationWebComponent from "./DsfrPaginationWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrPagination",
  component: DsfrPaginationWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrPaginationWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
