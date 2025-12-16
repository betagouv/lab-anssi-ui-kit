import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrLogoWebComponent from "./DsfrLogoWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrLogo",
  component: DsfrLogoWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrLogoWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
