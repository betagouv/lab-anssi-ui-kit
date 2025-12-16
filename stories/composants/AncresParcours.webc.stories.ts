import type { Meta, StoryObj } from "@storybook/svelte-vite";
import AncresParcoursWebComponent from "./AncresParcoursWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/AncresParcours",
  component: AncresParcoursWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof AncresParcoursWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
