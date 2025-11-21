import type { Meta, StoryObj } from "@storybook/svelte";

import BriqueTitreMultimedia from "$lib/composants/vitrines-produits/briques/BriqueTitreMultimedia.svelte";
import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

const source =
  "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4";
const sousTitres =
  "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt";
const couverture = genereImageDePlaceholder(792, 446, "Vidéo d'exemple");

const meta = {
  title: "Composants/ANSSI/Brique Titre Multimedia",
  component: BriqueTitreMultimedia,
  args: {
    titre: "Titre pour MSS",
    multimedia: { source, sourcesoustitres: sousTitres, imagedecouverture: couverture },
  },
  argTypes: {
    titre: {
      control: "text",
      description: "Titre affiché au-dessus du contenu multimédia",
    },
    multimedia: {
      control: "object",
      description: "Vidéo avec source, sous-titres et image de couverture",
      table: {
        type: {
          summary: "{ source: string, sourcesoustitres?: string, imagedecouverture?: string }",
        },
      },
    },
  },
} satisfies Meta<BriqueTitreMultimedia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
