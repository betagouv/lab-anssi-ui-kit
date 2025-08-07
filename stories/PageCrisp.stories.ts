import type { Meta, StoryObj } from "@storybook/svelte";

import PageCrisp from "$lib/lab/blog/PageCrisp.svelte";
import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
import exempleContenu from "../stories/lab/blog/exemple-page-crisp.html?raw";

const contenu = (exempleContenu as string).replaceAll(
  "%%IMAGE_1000_800%%",
  genereImageDePlaceholder(1000, 800),
);

const meta = {
  title: "Composants/ANSSI/PageCrisp",
  component: PageCrisp,
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
} satisfies Meta<PageCrisp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
