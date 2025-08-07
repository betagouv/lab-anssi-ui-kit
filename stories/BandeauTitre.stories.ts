import type { Meta, StoryObj } from "@storybook/svelte";

import BandeauTitre from "$lib/lab/blog/BandeauTitre.svelte";

const meta = {
  title: "Composants/ANSSI/BandeauTitre",
  component: BandeauTitre,
  args: {
    titre: "Titre de la page",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    filAriane: [
      { label: "Accueil", href: "#" },
      { label: "Page N2", href: "#" },
      { label: "Page N3" },
    ],
  },
  argTypes: {
    titre: { control: "text", description: "Le titre du bandeau" },
    description: { control: "text", description: "La description du bandeau" },
    filAriane: {
      control: "object",
      description: "Le fil d'Ariane à afficher",
      table: {
        type: { summary: "Array<{ label: string, href?: string }>" },
      },
    },
    infosTag: {
      control: "object",
      description: "Les informations du tag à afficher",
      table: {
        type: { summary: "{ label: string, couleurTexte: string, couleurFond: string }" },
        defaultValue: { summary: "{}" },
      },
    },
  },
} satisfies Meta<BandeauTitre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
