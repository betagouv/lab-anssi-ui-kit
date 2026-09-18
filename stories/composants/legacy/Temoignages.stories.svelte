<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Temoignages from "$lib/composants/vitrines-produits/briques/temoignages/Temoignages.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Temoignages",
    component: Temoignages,
    args: {
      titre: "Titre",
      temoignages: [
        {
          citation:
            "A Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi.",
          source: "IMT",
          auteur: "Mme. A",
        },
        {
          citation:
            "B Consectetur adipiscing elit. Nam mollis, risus id egestas semper, dui mauris semper nulla, sed egestas elit lectus sit amet mi. Morbi id leo aliquet, consectetur sem et, molestie libero.",
          source: "IMT",
          auteur: "M. B",
        },
      ],
    },
    argTypes: {
      titre: {
        description: "Titre affiché en haut de la brique Témoignages.",
        control: "text",
      },
      temoignages: {
        description: "Liste des témoignages à afficher dans le carrousel.",
        control: {
          type: "object",
        },
        table: {
          type: {
            summary: "Array",
            detail: "{ citation: string; auteur: string; source: string }[]",
          },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<Temoignages>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-temoignages {...args}></lab-anssi-temoignages>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-temoignages");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".brique-temoignages");
      await expect(inner).toBeTruthy();
    });
    await step("Le titre est affiché", async () => {
      const h3 = el?.shadowRoot?.querySelector("h3");
      await expect(h3?.textContent).toBe("Titre");
    });
    await step("Les 2 témoignages sont affichés", async () => {
      const temoignages = el?.shadowRoot?.querySelectorAll(".temoignage");
      await expect(temoignages?.length).toBe(2);
    });
    await step("Les boutons de navigation du carrousel sont présents", async () => {
      const buttons = el?.shadowRoot?.querySelectorAll(".conteneur-actions dsfr-button");
      await expect(buttons?.length).toBe(2);
    });
  }}
/>
