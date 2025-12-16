import type { Meta, StoryObj } from "@storybook/svelte-vite";
import CentreAideWebComponent from "./CentreAideWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/CentreAide",
  component: CentreAideWebComponent,
  tags: ["autodocs"],
  args: {
    nomService: "MonServiceSécurisé",
    liens: JSON.stringify([
      {
        texte: "💬 Nous contacter par chat",
        href: "https://aide.messervices.cyber.gouv.fr/fr/?chat=ouvert",
      },
      {
        texte: "🙌 Consulter la F.A.Q.",
        href: "https://aide.messervices.cyber.gouv.fr/fr",
      },
      {
        texte: "🎬 Faire une action 'custom'",
        preventDefault: true,
        id: "action-custom",
      },
    ]),
  },
  argTypes: {},
} satisfies Meta<typeof CentreAideWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
