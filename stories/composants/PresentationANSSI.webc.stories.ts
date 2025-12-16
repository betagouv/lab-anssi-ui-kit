import type { Meta, StoryObj } from "@storybook/svelte-vite";
import PresentationANSSIWebComponent from "./PresentationANSSIWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/PresentationANSSI",
  component: PresentationANSSIWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof PresentationANSSIWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
