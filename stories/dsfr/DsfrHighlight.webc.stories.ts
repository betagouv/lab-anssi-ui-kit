import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrHighlightWebComponent from "./DsfrHighlightWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrHighlight",
  component: DsfrHighlightWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrHighlightWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
