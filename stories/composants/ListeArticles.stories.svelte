<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ListeArticles from "$lib/composants/blog/ListeArticles.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/ListeArticles",
    component: ListeArticles,
    args: {
      articles: [
        {
          titre: "⏱️ L'homologation simplifiée - Quand homologuer et pour quelle durée ?",
          idCategorie: "id-1",
          href: "#",
        },
        {
          titre: "🪪 L'homologation simplifiée - Qu'est-ce qu'une homologation de sécurité ?",
          idCategorie: "id-1",
          href: "#",
        },
        {
          titre: "📝 Réaliser un audit de la sécurité du service",
          idCategorie: "id-2",
          href: "#",
        },
        {
          titre: "📝 Réaliser une analyse de risques de la sécurité du service",
          idCategorie: "id-2",
          href: "#",
        },
      ],
      categories: {
        "id-1": {
          label: "Sécurisation et homologation",
          couleurTexte: "#09416A",
          couleurFond: "#DCEEFF",
        },
        "id-2": {
          label: "Mise en oeuvre des mesures de sécurité",
          couleurTexte: "#7025DA",
          couleurFond: "#E9DDFF",
        },
      },
    },
    argTypes: {
      articles: {
        description: "Liste des articles à afficher",
        control: { type: "object" },
        table: {
          type: { summary: "Array<{ titre: string, idCategorie: string, href?: string }>" },
        },
      },
      categories: {
        description: "Catégories des articles avec leurs métadonnées",
        control: { type: "object" },
        table: {
          type: {
            summary: "Record<string, { label: string, couleurTexte: string, couleurFond: string }>",
          },
        },
      },
      idCategorieChoisie: {
        description: "Identifiant de la catégorie actuellement sélectionnée",
        control: { type: "text" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<ListeArticles>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-liste-articles
    articles={args.articles}
    categories={args.categories}
    id-categorie-choisie={args.idCategorieChoisie}
  ></lab-anssi-liste-articles>
{/snippet}

<Story name="Defaut" />
