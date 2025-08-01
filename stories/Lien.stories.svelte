<script context="module">
  import Lien from "$lib/lab/Lien.svelte";

  export const meta = {
    title: "Composants/Lien",
    component: Lien,
    args: {
      titre: "Libellé",
      cible: "#",
      apparence: "lien",
      variante: "primaire",
      taille: "sm",
      icone: "leaf-line",
      positionIcone: "droite",
      actif: true,
    },
    argTypes: {
      titre: { control: "text", description: "Le texte du lien" },
      href: { control: "text", description: "L'URL du lien" },
      cible: { control: "text", description: "Cible du lien" },
      apparence: {
        control: "select",
        options: ["lien", "bouton", "lien-texte"],
        description: "L'apparence du lien",
      },
      variante: {
        control: "select",
        options: ["primaire", "secondaire", "tertiaire", "tertiaire-sans-bordure"],
        description: "La variante du lien",
      },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille du lien",
      },
      icone: { control: "text", description: "Le nom de l'icône à afficher" },
      positionIcone: {
        control: "select",
        options: ["sans", "seule", "droite", "gauche"],
        description: "La position de l'icône par rapport au texte",
      },
      actif: { control: "boolean", description: "Indique si le lien est actif" },
    },
  };
</script>

<script>
  import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
  <Lien {...args} />
</Template>

<Story name="Defaut" />

<Story name="Taille de police 1rem">
  <p style="font-size: 1rem; line-height: 1.5rem; color: #584cfc">
    Lorem ipsum <Lien titre="dolor sit plop" cible="#" apparence="lien-texte" /> amet.
  </p>
</Story>

<Story name="Taille de police 2rem">
  <p style="font-size: 2rem; line-height: 3rem; color: #18753c">
    Lorem ipsum <Lien titre="dolor sit plop" cible="#" apparence="lien-texte" /> amet.
  </p>
</Story>
