<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Marelle from "$lib/composants/vitrines-produits/briques/marelle/Marelle.svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Marelle",
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
    render: template,
  });

  type Args = ComponentProps<Marelle>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-marelle titre={args.titre} etapesmarelle={args.etapesmarelle} action={args.action}
  ></lab-anssi-marelle>
{/snippet}

<Story name="Defaut" />
