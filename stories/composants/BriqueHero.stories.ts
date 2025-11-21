import type { Meta, StoryObj } from "@storybook/svelte";

import BriqueHero from "$lib/composants/vitrines-produits/briques/BriqueHero.svelte";
import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

const meta = {
  title: "Composants/ANSSI/Brique Hero",
  component: BriqueHero,
  args: {
    badge: true,
    titre: "MonServiceSécurisé",
    soustitre:
      "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement",
    illustration: { lien: genereImageDePlaceholder(600, 400), alt: "Logo placeholder" },
    actiongauche: { titre: "Commencer à sécuriser", lien: "" },
    actiondroite: { titre: "Être accompagné", lien: "" },
    partenaires: [{ lien: "src/lib/assets/illustrations/cnil.svg", alt: "Logo de la CNIL" }],
  },
  argTypes: {
    badge: {
      control: "boolean",
      description: "Affiche ou non le badge dans la brique",
    },
    titre: {
      control: "text",
      description: "Titre principal affiché dans la brique",
    },
    soustitre: {
      control: "text",
      description: "Sous-titre affiché sous le titre principal",
    },
    illustration: {
      control: "object",
      description: "Image avec un lien et un texte alternatif",
      table: {
        type: { summary: "{ lien: string, alt: string }" },
      },
    },
    actiongauche: {
      control: "object",
      description: "Action gauche avec un titre et un lien pour le bouton",
      table: {
        type: { summary: "{ titre: string, lien: string, target?: string }" },
      },
    },
    actiondroite: {
      control: "object",
      description: "Action droite avec un titre et un lien pour le bouton",
      table: {
        type: { summary: "{ titre: string, lien: string, target?: string }" },
      },
    },
    partenaires: {
      control: "object",
      description: "Liste des partenaires avec leurs logos",
      table: {
        type: { summary: "{ lien: string, alt: string }[]" },
      },
    },
  },
} satisfies Meta<BriqueHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
