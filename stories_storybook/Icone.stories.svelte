<script context="module">
  import Icone from "$lib/lab/Icone.svelte";

  /** Les icônes disponibles et leur code sont sur la page du [DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/icone). Les icônes du DSFR sont elles-mêmes issues de [Remix Icons](https://remixicon.com/). */
  export const meta = {
    title: "Composants/Icone",
    component: Icone,
    argTypes: {
      nom: { control: "text", description: "Le nom de l'icône" },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille de l'icône",
      },
    },
  };
</script>

<script>
  import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
  <span style={args.couleur ? `color: ${args.couleur}` : undefined}>
    <Icone {...args} />
  </span>
</Template>

<Story
  name="Defaut"
  args={{
    nom: "leaf-line",
    taille: "md",
  }}
/>

<!-- Les icônes sont au format SVG avec la couleur « currentColor ». Ces fichiers SVG sont utilisés
comme image de masque et peuvent donc hériter de la couleur de leur élément parent : -->
<Story
  name="Avec Une Couleur"
  args={{
    nom: "leaf-line",
    taille: "md",
    couleur: "red",
  }}
/>
