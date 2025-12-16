import type { Meta, StoryObj } from "@storybook/svelte-vite";
import LienDiagnosticCyberWebComponent from "./LienDiagnosticCyberWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/LienDiagnosticCyber",
  component: LienDiagnosticCyberWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof LienDiagnosticCyberWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
