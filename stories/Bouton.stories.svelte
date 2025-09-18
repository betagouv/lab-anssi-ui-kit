<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Bouton from "$lib/lab/Bouton.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Bouton",
    component: Bouton,
    args: {
      titre: "Libellé",
      variante: "primaire",
      taille: "sm",
      icone: "leaf-line",
      positionIcone: "droite",
      actif: true,
    },
    argTypes: {
      titre: { control: "text", description: "Le libellé du bouton" },
      variante: {
        control: "select",
        options: ["primaire", "secondaire", "tertiaire", "tertiaire-sans-bordure"],
        description: "La variante du bouton",
      },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille du bouton",
      },
      icone: { control: "text", description: "L'icône du bouton" },
      positionIcone: {
        control: "select",
        options: ["sans", "seule", "droite", "gauche"],
        description: "La position de l'icône dans le bouton",
      },
      actif: { control: "boolean", description: "Indique si le bouton est actif ou non" },
      largeurMaximale: {
        control: "boolean",
        description: "Indique si le bouton prend toute la largeur ou non",
      },
    },
  });
</script>

<Story name="Defaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <lab-anssi-bouton
      titre={args.titre}
      variante={args.variante}
      taille={args.taille}
      icone={args.icone}
      position-icone={args.positionIcone}
      actif={args.actif}
      largeur-maximale={args.largeurMaximale}
    ></lab-anssi-bouton>
  {/snippet}
</Story>
