import type { Meta, StoryObj } from "@storybook/svelte-vite";
import PageCrispWebComponent from "./PageCrispWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/PageCrisp",
  component: PageCrispWebComponent,
  tags: ["autodocs"],
  args: {
    contenu,
    tableDesMatieres: [
      { profondeur: 2, texte: "Premier titre", id: "id-titre1" },
      { profondeur: 2, texte: "Deuxième titre", id: "id-titre2" },
      { profondeur: 2, texte: "Troisième titre", id: "id-titre3" },
    ],
  },
  argTypes: {
    contenu: {
      control: "text",
      description: "Contenu HTML à afficher dans la page",
    },
    tableDesMatieres: {
      control: "object",
      description: "Table des matières contenant les titres et leurs identifiants",
      table: {
        type: { summary: "{ profondeur: number, texte: string, id: string }[]" },
      },
    },
  },
} satisfies Meta<typeof PageCrispWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
