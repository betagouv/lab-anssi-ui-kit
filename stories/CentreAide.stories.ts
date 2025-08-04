import type { Meta, StoryObj } from "@storybook/svelte";
import { withActions } from "@storybook/addon-actions/decorator";

import ConteneurStory from "./ConteneurStory.svelte";
import CentreAide from "$lib/CentreAide.svelte";

const meta = {
  title: "Composants/CentreAide",
  component: CentreAide,
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
  decorators: [withActions, () => ConteneurStory],
} satisfies Meta<CentreAide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
