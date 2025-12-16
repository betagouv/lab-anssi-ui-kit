import type { Meta, StoryObj } from "@storybook/svelte-vite";
import DsfrAlertWebComponent from "./DsfrAlertWebComponent.svelte";
import {
  alertArgs,
  alertArgTypes,
} from "@gouvfr/dsfr/src/dsfr/component/alert/template/stories/alert-arg-types.js";

const meta = {
  title: "WebComponents/DSFR/DsfrAlert",
  component: DsfrAlertWebComponent,
  tags: ["autodocs"],
  args: alertArgs,
  argTypes: alertArgTypes,
} satisfies Meta<typeof DsfrAlertWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
