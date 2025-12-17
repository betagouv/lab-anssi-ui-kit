<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Tag from "$lib/composants/Tag.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Tag",
    component: Tag,
    args: {
      couleurFond: undefined,
      couleurTexte: undefined,
      label: "libellé",
      taille: "md",
      type: "selectionnable",
      presse: false,
    },
    argTypes: {
      label: { control: "text", description: "Le libellé du tag" },
      couleurTexte: { control: "color", description: "La couleur du texte du tag" },
      couleurFond: { control: "color", description: "La couleur de fond du tag" },
      taille: { control: "select", options: ["sm", "md", "lg"], description: "La taille du tag" },
      type: {
        control: "select",
        options: ["defaut", "selectionnable"],
        description: "Le type de tag",
      },
      presse: { control: "boolean", description: "Indique si le tag est pressé" },
    },
    render: template,
  });

  type Args = ComponentProps<Tag>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-tag
    label={args.label}
    couleur-texte={args.couleurTexte}
    couleur-fond={args.couleurFond}
    taille={args.taille}
    type={args.type}
    presse={args.presse || undefined}
  ></lab-anssi-tag>
{/snippet}

<Story name="Defaut" />
