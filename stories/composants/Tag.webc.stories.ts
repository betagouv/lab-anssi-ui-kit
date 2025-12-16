import type { Meta, StoryObj } from "@storybook/svelte-vite";
import TagWebComponent from "./TagWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Tag",
  component: TagWebComponent,
  tags: ["autodocs"],
  args: {
    couleurFond: undefined,
    couleurTexte: undefined,
    label: "libellé",
    taille: "md",
    type: "selectionnable",
    presse: false,
  },
  argTypes: {
    label: { control: "text", description: "Le libellé du tag" },
    couleurTexte: { control: "color", description: "La couleur du texte du tag" },
    couleurFond: { control: "color", description: "La couleur de fond du tag" },
    taille: { control: "select", options: ["sm", "md", "lg"], description: "La taille du tag" },
    type: {
      control: "select",
      options: ["defaut", "selectionnable"],
      description: "Le type de tag",
    },
    presse: { control: "boolean", description: "Indique si le tag est pressé" },
  },
} satisfies Meta<typeof TagWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
