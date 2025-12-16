import type { Meta, StoryObj } from "@storybook/svelte-vite";
import MarelleWebComponent from "./MarelleWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/Marelle",
  component: MarelleWebComponent,
  tags: ["autodocs"],
  args: {
    titre: "Titre",
    etapesmarelle: [
      {
        description: "Description",
        illustration: {
          lien: genereImageDePlaceholder(600, 400, "Exemple illustration"),
          alt: "",
        },
        lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
        titre: "Première étape",
      },
      {
        description: "Description",
        illustration: {
          lien: genereImageDePlaceholder(600, 400, "Exemple illustration"),
          alt: "",
        },
        lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
        titre: "Deuxième étape",
      },
    ],
    action: {
      titre: "Action",
      lien: "#",
    },
  },
  argTypes: {
    titre: {
      description: "Titre affiché en haut de la brique Marelle.",
      control: "text",
    },
    etapesmarelle: {
      description: "Liste des étapes de la marelle.",
      control: {
        type: "object",
      },
      table: {
        type: {
          summary: "Array",
          detail:
            "{ titre: string; description: string; lien?: { href: string; texte: string; target: '_self' | '_blank' | '_parent' | '_top' }; illustration: { lien: string; alt: string } }[]",
        },
      },
    },
    action: {
      description: "Action associée à la brique Marelle.",
      control: {
        type: "object",
      },
      table: {
        type: {
          summary: "Object",
          detail:
            "{ titre: string; lien: string; target?: '_self' | '_blank' | '_parent' | '_top' }",
        },
      },
    },
  },
} satisfies Meta<typeof MarelleWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
