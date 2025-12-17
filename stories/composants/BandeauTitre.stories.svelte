<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BandeauTitre from "$lib/composants/blog/BandeauTitre.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/BandeauTitre",
    component: BandeauTitre,
    args: {
      titre: "Titre de la page",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      filAriane: [
        { label: "Accueil", href: "#" },
        { label: "Page N2", href: "#" },
        { label: "Page N3" },
      ],
    },
    argTypes: {
      titre: { control: "text", description: "Le titre du bandeau" },
      description: { control: "text", description: "La description du bandeau" },
      filAriane: {
        control: "object",
        description: "Le fil d'Ariane à afficher",
        table: {
          type: { summary: "Array<{ label: string, href?: string }>" },
        },
      },
      infosTag: {
        control: "object",
        description: "Les informations du tag à afficher",
        table: {
          type: { summary: "{ label: string, couleurTexte: string, couleurFond: string }" },
          defaultValue: { summary: "{}" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<BandeauTitre>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-bandeau-titre
    titre={args.titre}
    description={args.description}
    fil-ariane={JSON.stringify(args.filAriane)}
    infos-tag={args.infosTag}
  ></lab-anssi-bandeau-titre>
{/snippet}

<Story name="Defaut" />
