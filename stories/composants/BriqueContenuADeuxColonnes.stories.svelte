<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

  import BriqueContenuADeuxColonnes from "$lib/composants/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Brique Contenu A Deux Colonnes",
    component: BriqueContenuADeuxColonnes,
    args: {
      titre: "MonServiceSécurisé",
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
    render: template,
  });

  type Args = ComponentProps<BriqueContenuADeuxColonnes>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-brique-contenu-a-deux-colonnes {...args}></lab-anssi-brique-contenu-a-deux-colonnes>
{/snippet}

<Story name="Defaut" />

<Story
  name="ComporteUneAction"
  args={{
    action: {
      titre: "Commencer à sécuriser",
      lien: "#",
    },
  }}
/>
