<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Marelle from "$lib/composants/marelle/Marelle.svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Marelle",
    component: Marelle,
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
      "marelle-titre": {
        description: "Titre personnalisé de la marelle (remplace la prop `titre`)",
        control: false,
        table: { category: "Slots" },
      },
      default: {
        description:
          "Étapes personnalisées (remplace les étapes générées par la prop `etapesmarelle`)",
        control: false,
        table: { category: "Slots" },
      },
      "etape-titre": {
        description: "Titre personnalisé de chaque étape (remplace la prop `titre` de l'étape)",
        control: false,
        table: { category: "Slots (Etape)" },
      },
      "etape-description": {
        description:
          "Description personnalisée de chaque étape (remplace la prop `description` de l'étape)",
        control: false,
        table: { category: "Slots (Etape)" },
      },
      "etape-lien": {
        description:
          "Lien personnalisé de chaque étape (remplace le lien généré par la prop `lien` de l'étape)",
        control: false,
        table: { category: "Slots (Etape)" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<Marelle>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-marelle titre={args.titre} etapesmarelle={args.etapesmarelle} action={args.action}
  ></lab-anssi-marelle>
{/snippet}

<Story name="Par défaut" />

<Story
  name="Avec bouton d'action"
  args={{
    action: {
      titre: "Action",
      lien: "#",
    },
  }}
/>
