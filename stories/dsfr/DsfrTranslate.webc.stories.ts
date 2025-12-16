import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrTranslateWebComponent from "./DsfrTranslateWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrTranslate",
  component: DsfrTranslateWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrTranslateWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
