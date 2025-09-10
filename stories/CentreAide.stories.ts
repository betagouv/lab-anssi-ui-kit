import type { Meta, StoryObj } from "@storybook/svelte";

import ConteneurStory from "./ConteneurStory.svelte";
import CentreAide from "$lib/CentreAide.svelte";

// Styles
import "@gouvfr/dsfr/dist/core/core.min.css";
import "@gouvfr/dsfr/dist/component/form/form.min.css";
import "@gouvfr/dsfr/dist/component/select/select.min.css";

const meta = {
  title: "Composants/ANSSI/CentreAide",
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
  decorators: [() => ConteneurStory],
} satisfies Meta<CentreAide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
