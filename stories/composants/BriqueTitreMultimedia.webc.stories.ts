import type { Meta, StoryObj } from "@storybook/svelte-vite";
import BriqueTitreMultimediaWebComponent from "./BriqueTitreMultimediaWebComponent.svelte";

const meta = {
  title: "WebComponents/ANSSI/BriqueTitreMultimedia",
  component: BriqueTitreMultimediaWebComponent,
  tags: ["autodocs"],
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
} satisfies Meta<typeof BriqueTitreMultimediaWebComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
