import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrStepperWebComponent from "./DsfrStepperWebComponent.svelte";

const meta = {
  title: "WebComponents/DSFR/DsfrStepper",
  component: DsfrStepperWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof DsfrStepperWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
