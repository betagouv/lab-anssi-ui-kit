import type { Meta, StoryObj } from "@storybook/svelte-vite";
import AlerteWebComponent from "./AlerteWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Alerte",
  component: AlerteWebComponent,
  tags: ["autodocs"],
  argTypes: {
    description: { control: "text", type: "string" },
    type: {
      control: { type: "select" },
      options: ["information", "erreur"],
    },
    fermable: { control: "boolean", type: "boolean" },
  },
} satisfies Meta<typeof AlerteWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {
  args: {
    description: "Une alerte d'information",
    type: "information",
    fermable: true,
  },
};

export const Erreur: Story = {
  args: {
    description: "Une alerte d'erreur",
    type: "erreur",
    fermable: true,
  },
};
