import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrBreadcrumbWebComponent from "./DsfrBreadcrumbWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrBreadcrumb",
  component: DsfrBreadcrumbWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrBreadcrumbWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
