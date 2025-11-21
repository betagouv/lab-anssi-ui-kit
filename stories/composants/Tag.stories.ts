import type { Meta, StoryObj } from "@storybook/svelte";

import Tag from "$lib/composants/Tag.svelte";

const meta = {
  title: "Composants/ANSSI/Tag",
  component: Tag,
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
} satisfies Meta<Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
