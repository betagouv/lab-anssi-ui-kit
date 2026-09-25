<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";
  import exempleContenu from "../../exemples/lab/exemple-page-crisp.html?raw";

  import PageCrisp from "$lib/composants/blog/PageCrisp.svelte";

  const contenu = (exempleContenu as string).replaceAll(
    "%%IMAGE_1000_800%%",
    genereImageDePlaceholder(1000, 800),
  );

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/PageCrisp",
    component: PageCrisp,
    args: {
      contenu,
      tableDesMatieres: [
        { profondeur: 2, texte: "Premier titre", id: "id-titre1" },
        { profondeur: 2, texte: "Deuxième titre", id: "id-titre2" },
        { profondeur: 2, texte: "Troisième titre", id: "id-titre3" },
      ],
    },
    argTypes: {
      contenu: {
        control: "text",
        description: "Contenu HTML à afficher dans la page",
      },
      tableDesMatieres: {
        control: "object",
        description: "Table des matières contenant les titres et leurs identifiants",
        table: {
          type: { summary: "{ profondeur: number, texte: string, id: string }[]" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<PageCrisp>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-page-crisp
    contenu={args.contenu}
    table-des-matieres={JSON.stringify(args.tableDesMatieres)}
  ></lab-anssi-page-crisp>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-page-crisp");
    await step("Le composant est rendu", async () => {
      const article = el?.shadowRoot?.querySelector("article");
      await expect(article).toBeTruthy();
    });
    await step("Le contenu HTML est injecté", async () => {
      const article = el?.shadowRoot?.querySelector("article");
      await expect(article?.textContent?.length).toBeGreaterThan(0);
    });
    await step("Les liens de la table des matières sont présents", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      const linkTexts = Array.from(links ?? []).map((l) => l.textContent?.trim());
      await expect(linkTexts).toContain("Premier titre");
      await expect(linkTexts).toContain("Deuxième titre");
      await expect(linkTexts).toContain("Troisième titre");
    });
  }}
/>
