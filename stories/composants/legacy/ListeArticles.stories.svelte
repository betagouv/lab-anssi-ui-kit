<script module lang="ts">
  import { expect, userEvent } from "storybook/test";
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-liste-articles");
    const typedArgs = args as Record<string, unknown>;
    const articlesArgs = (typedArgs.articles ?? []) as { titre: string; idCategorie: string }[];
    const categoriesArgs = (typedArgs.categories ?? {}) as Record<string, { label: string }>;

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre affiche 'Tous les articles' par défaut", async () => {
      const h2 = el?.shadowRoot?.querySelector("h2");

      await expect(h2?.textContent).toBe("Tous les articles");
    });

    await step("Le filtre contient toutes les catégories", async () => {
      const options = el?.shadowRoot?.querySelectorAll("option");
      const expectedCount = Object.keys(categoriesArgs).length + 1;

      await expect(options?.length).toBe(expectedCount);
    });

    await step("Tous les articles sont affichés", async () => {
      const cartes = el?.shadowRoot?.querySelectorAll(".carte-article");

      await expect(cartes?.length).toBe(articlesArgs.length);
    });

    await step(
      "Le filtre par catégorie affiche uniquement les articles correspondants",
      async () => {
        const select = el?.shadowRoot?.querySelector("select") as HTMLSelectElement;
        const premiereCategorieId = Object.keys(categoriesArgs)[0];
        const categorieLabel = categoriesArgs[premiereCategorieId].label;
        const articlesAttendus = articlesArgs.filter((a) => a.idCategorie === premiereCategorieId);

        await userEvent.selectOptions(select, premiereCategorieId);

        const h2 = el?.shadowRoot?.querySelector("h2");
        await expect(h2?.textContent).toBe(categorieLabel);

        const cartes = el?.shadowRoot?.querySelectorAll(".carte-article");
        await expect(cartes?.length).toBe(articlesAttendus.length);
      },
    );

    await step("Le filtre 'Tous les articles' réaffiche tous les articles", async () => {
      const select = el?.shadowRoot?.querySelector("select") as HTMLSelectElement;

      await userEvent.selectOptions(select, "tous");

      const h2 = el?.shadowRoot?.querySelector("h2");
      await expect(h2?.textContent).toBe("Tous les articles");

      const cartes = el?.shadowRoot?.querySelectorAll(".carte-article");
      await expect(cartes?.length).toBe(articlesArgs.length);
    });
  }}
/>
