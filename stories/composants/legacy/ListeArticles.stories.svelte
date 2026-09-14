<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ListeArticles from "$lib/composants/blog/ListeArticles.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/ListeArticles",
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

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-liste-articles");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".liste-articles");
      await expect(inner).toBeTruthy();
    });
    await step("Le titre affiche 'Tous les articles' par défaut", async () => {
      const h2 = el?.shadowRoot?.querySelector("h2");
      await expect(h2?.textContent).toBe("Tous les articles");
    });
    await step("Les 4 articles sont affichés", async () => {
      const articles = el?.shadowRoot?.querySelectorAll(".conteneur-articles > *");
      await expect(articles?.length).toBe(4);
    });
    await step("Le filtre par catégorie est présent", async () => {
      const select = el?.shadowRoot?.querySelector("select");
      await expect(select).toBeTruthy();
    });
  }}
/>
