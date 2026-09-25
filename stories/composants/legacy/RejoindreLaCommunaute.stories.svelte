<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import RejoindreLaCommunaute from "$lib/composants/vitrines-produits/briques/RejoindreLaCommunaute.svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Brique Rejoindre La Communauté",
    component: RejoindreLaCommunaute,
    args: {
      titre: "Rejoindre la communauté",
      raisons: ["Échanger directement avec les membres."],
      illustration: {
        lien: genereImageDePlaceholder(600, 400, "Placeholder"),
        alt: "Logo placeholder",
      },
    },
    argTypes: {
      titre: {
        control: "text",
        description: "Titre principal affiché dans la brique",
      },
      raisons: {
        control: "object",
        description: "Liste des raisons pour rejoindre la communauté",
        table: {
          type: { summary: "string[]" },
        },
      },
      action: {
        control: "object",
        description: "Action avec un titre et un lien pour le bouton",
        table: {
          type: { summary: "{ titre: string, lien: string, target?: string }" },
        },
      },
      illustration: {
        control: "object",
        description: "Image avec un lien et un texte alternatif",
        table: {
          type: { summary: "{ lien: string, alt: string }" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<RejoindreLaCommunaute>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-brique-rejoindre-la-communaute {...args}></lab-anssi-brique-rejoindre-la-communaute>
{/snippet}

<Story
  name="Defaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-rejoindre-la-communaute");
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Le titre est affiché", async () => {
      const h2 = el?.shadowRoot?.querySelector("h2");
      await expect(h2?.textContent).toBe("Rejoindre la communauté");
    });
    await step("L'illustration est affichée avec le bon alt", async () => {
      const img = el?.shadowRoot?.querySelector("img") as HTMLImageElement | null;
      await expect(img).toBeTruthy();
      await expect(img?.alt).toBe("Logo placeholder");
    });
    await step("Le texte d'introduction est visible", async () => {
      const text = el?.shadowRoot?.textContent;
      await expect(text).toContain("membre de la communauté");
    });
    await step("Les raisons sont listées", async () => {
      const items = el?.shadowRoot?.querySelectorAll("ul li");
      await expect(items?.length).toBe(args.raisons.length);
      for (let i = 0; i < args.raisons.length; i++) {
        await expect(items?.[i]?.textContent).toContain(args.raisons[i]);
      }
    });
  }}
/>

<Story
  name="ComporteUneAction"
  args={{
    action: {
      titre: "Commencer à sécuriser",
      lien: "#",
    },
  }}
/>
