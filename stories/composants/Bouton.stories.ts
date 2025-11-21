import type { Meta, StoryObj } from "@storybook/svelte";

import Bouton from "$lib/composants/Bouton.svelte";

const meta = {
  title: "Composants/ANSSI/Bouton",
  component: Bouton,
  args: {
    titre: "Libellé",
    variante: "primaire",
    taille: "sm",
    icone: "leaf-line",
    positionIcone: "droite",
    actif: true,
  },
  argTypes: {
    titre: { control: "text", description: "Le libellé du bouton" },
    variante: {
      control: "select",
      options: ["primaire", "secondaire", "tertiaire", "tertiaire-sans-bordure"],
      description: "La variante du bouton",
    },
    taille: { control: "select", options: ["sm", "md", "lg"], description: "La taille du bouton" },
    icone: { control: "text", description: "L'icône du bouton" },
    positionIcone: {
      control: "select",
      options: ["sans", "seule", "droite", "gauche"],
      description: "La position de l'icône dans le bouton",
    },
    actif: { control: "boolean", description: "Indique si le bouton est actif ou non" },
    largeurMaximale: {
      control: "boolean",
      description: "Indique si le bouton prend toute la largeur ou non",
    },
  },
} satisfies Meta<Bouton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
