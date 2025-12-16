import type { Meta, StoryObj } from "@storybook/svelte-vite";
import RejoindreLaCommunauteWebComponent from "./RejoindreLaCommunauteWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/RejoindreLaCommunaute",
  component: RejoindreLaCommunauteWebComponent,
  tags: ["autodocs"],
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
} satisfies Meta<typeof RejoindreLaCommunauteWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
