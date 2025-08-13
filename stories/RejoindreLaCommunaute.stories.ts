import type { Meta, StoryObj } from "@storybook/svelte";

import RejoindreLaCommunaute from "$lib/lab/vitrines-produits/briques/RejoindreLaCommunaute.svelte";
import { genereImageDePlaceholder } from "./utilitaires/generateurImagesPlaceholders";

const meta = {
  title: "Composants/ANSSI/Brique Rejoindre La Communauté",
  component: RejoindreLaCommunaute,
  args: {
    titre: "Rejoindre la communauté",
    raisons: ["Échanger directement avec les membres."],
    illustration: {
      lien: genereImageDePlaceholder(600, 400, "Placeholder"),
      alt: "Logo placeholder",
    },
  },
  argTypes: {
    titre: {
      control: "text",
      description: "Titre principal affiché dans la brique",
    },
    raisons: {
      control: "object",
      description: "Liste des raisons pour rejoindre la communauté",
      table: {
        type: { summary: "string[]" },
      },
    },
    action: {
      control: "object",
      description: "Action avec un titre et un lien pour le bouton",
      table: {
        type: { summary: "{ titre: string, lien: string, target?: string }" },
      },
    },
    illustration: {
      control: "object",
      description: "Image avec un lien et un texte alternatif",
      table: {
        type: { summary: "{ lien: string, alt: string }" },
      },
    },
  },
} satisfies Meta<RejoindreLaCommunaute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};

export const ComporteUneAction: Story = {
  args: {
    ...Defaut.args,
    action: {
      titre: "Commencer à sécuriser",
      lien: "#",
    },
  },
};
