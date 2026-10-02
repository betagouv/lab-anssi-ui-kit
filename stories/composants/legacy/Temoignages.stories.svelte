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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-temoignages");
    const typedArgs = args as Record<string, unknown>;
    const temoignagesArgs = (typedArgs.temoignages ?? []) as { citation: string }[];

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre est affiché ou absent selon la prop", async () => {
      const h3 = el?.shadowRoot?.querySelector("h3");

      if (typedArgs.titre) {
        await expect(h3).toBeTruthy();
        await expect(h3?.textContent).toBe(typedArgs.titre);
      } else {
        await expect(h3).toBeNull();
      }
    });

    await step("Les témoignages sont présents", async () => {
      const quotes = el?.shadowRoot?.querySelectorAll("dsfr-quote");

      await expect(quotes?.length).toBe(temoignagesArgs.length);
    });

    await step(
      "Les boutons de navigation sont présents ou absents selon le nombre de témoignages",
      async () => {
        const buttons = el?.shadowRoot?.querySelectorAll(".conteneur-actions dsfr-button");

        if (temoignagesArgs.length > 1) {
          await expect(buttons?.length).toBe(2);
        } else {
          await expect(buttons?.length).toBe(0);
        }
      },
    );
  }}
/>
