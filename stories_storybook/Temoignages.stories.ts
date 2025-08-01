import type { Meta, StoryObj } from "@storybook/svelte";

import Temoignages from "$lib/lab/vitrines-produits/briques/temoignages/Temoignages.svelte";

const meta = {
  title: "Composants/Temoignages",
  component: Temoignages,
  args: {
    titre: "Titre",
    temoignages: [
      {
        citation:
          "A Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi.",
        source: "IMT",
        auteur: "Mme. A",
      },
      {
        citation:
          "B Consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi. Morbi id leo aliquet, consectetur sem et, molestie libero.",
        source: "IMT",
        auteur: "M. B",
      },
    ],
  },
  argTypes: {
    titre: {
      description: "Titre affiché en haut de la brique Témoignages.",
      control: "text",
    },
    temoignages: {
      description: "Liste des témoignages à afficher dans le carrousel.",
      control: {
        type: "object",
      },
      table: {
        type: {
          summary: "Array",
          detail: "{ citation: string; auteur: string; source: string }[]",
        },
      },
    },
  },
} satisfies Meta<Temoignages>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
