import type { Meta, StoryObj } from "@storybook/svelte-vite";
import FiltresCatalogueWebComponent from "./FiltresCatalogueWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/FiltresCatalogue",
  component: FiltresCatalogueWebComponent,
  tags: ["autodocs"],
  args: {},
  argTypes: {},
} satisfies Meta<typeof FiltresCatalogueWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
