import type { Meta, StoryObj } from "@storybook/svelte-vite";
import ResumePssiWebComponent from "./ResumePssiWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/ResumePssi",
  component: ResumePssiWebComponent,
  tags: ["autodocs"],
  args: {
    nomService: "MonService",
  },
  argTypes: {
    nomService: { control: "text", description: "Le nom du service" },
  },
} satisfies Meta<typeof ResumePssiWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
