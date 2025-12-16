import type { Meta, StoryObj } from "@storybook/svelte-vite";
import ButtonWebComponent from "./ButtonWebComponent.svelte";

const meta = {
  title: "WebComponents/dsfr/Button",
  component: ButtonWebComponent,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", type: "string" },
    kind: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "tertiary-no-outline",
        "inverted-primary",
        "inverted-secondary",
      ],
      description: "Type du bouton",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean", type: "boolean" },
    centered: { control: "boolean", type: "boolean" },
    hasIcon: { control: "boolean", type: "boolean" },
    icon: { control: "text", type: "string" },
    iconPlace: {
      control: { type: "select" },
      options: ["left", "right", "only"],
    },
  },
  args: {
    label: "Label bouton",
    kind: "primary",
    size: "md",
    disabled: false,
    centered: false,
    hasIcon: false,
  },
  parameters: {
    backgrounds: {
      options: {
        blueFranceLab: { name: "Blue France Lab", value: "#000091" },
      },
    },
  },
} satisfies Meta<typeof ButtonWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {
  args: {
    label: "Label bouton",
  },
};

export const Centered: Story = {
  args: {
    label: "Label bouton",
    centered: true,
  },
};

export const InvertedPrimary: Story = {
  args: {
    label: "Label bouton",
    kind: "inverted-primary",
  },
  parameters: {
    backgrounds: { default: "blueFranceLab" },
  },
};

export const InvertedSecondary: Story = {
  args: {
    label: "Label bouton",
    kind: "inverted-secondary",
  },
  parameters: {
    backgrounds: { default: "blueFranceLab" },
  },
};
