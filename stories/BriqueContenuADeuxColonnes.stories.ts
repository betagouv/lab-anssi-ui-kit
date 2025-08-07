import type { Meta, StoryObj } from "@storybook/svelte";

import BriqueContenuADeuxColonnes from "$lib/lab/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";
import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

const meta = {
  title: "Composants/ANSSI/Brique Contenu A Deux Colonnes",
  component: BriqueContenuADeuxColonnes,
  args: {
    titre: "Mon​Service​Sécurisé",
    paragraphe:
      "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement",
    illustration: {
      lien: genereImageDePlaceholder(600, 400, "Placeholder"),
      alt: "Logo placeholder",
    },
    ordre: "texte-gauche",
  },
  argTypes: {
    titre: {
      control: "text",
      description: "Titre affiché dans la brique",
    },
    paragraphe: {
      control: "text",
      description: "Texte descriptif affiché sous le titre",
    },
    action: {
      control: "object",
      description: "Action avec un titre et un lien pour le bouton",
      table: {
        type: { summary: "{ titre: string, lien: string, target?: string }" },
      },
    },
    ordre: {
      control: "select",
      options: ["texte-gauche", "texte-droite"],
      description: "Ordre d'affichage du texte et de l'illustration",
    },
    illustration: {
      control: "object",
      description: "Image avec un lien et un texte alternatif",
      table: {
        type: { summary: "{ lien: string, alt: string }" },
      },
    },
  },
} satisfies Meta<BriqueContenuADeuxColonnes>;

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
