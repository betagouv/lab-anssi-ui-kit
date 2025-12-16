import type { Meta, StoryObj } from "@storybook/svelte-vite";
import NavigationPiedDePageWebComponent from "./NavigationPiedDePageWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/NavigationPiedDePage",
  component: NavigationPiedDePageWebComponent,
  tags: ["autodocs"],
  args: {
    conforme: false,
  },
  argTypes: {
    conforme: {
      description: "Indique si la navigation est conforme ou non conforme.",
      control: "boolean",
    },
  },
} satisfies Meta<typeof NavigationPiedDePageWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
