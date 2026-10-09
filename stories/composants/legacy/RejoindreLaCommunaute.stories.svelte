<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import RejoindreLaCommunaute from "$lib/composants/vitrines-produits/briques/RejoindreLaCommunaute.svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Brique Rejoindre La Communauté",
    component: RejoindreLaCommunaute,
    tags: ["Avec slots"],
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-rejoindre-la-communaute");
    const typedArgs = args as Record<string, unknown>;
    const illustrationArgs = typedArgs.illustration as { lien: string; alt: string };
    const raisonsArgs = (typedArgs.raisons ?? []) as string[];
    const actionArgs = typedArgs.action as { titre: string; lien: string } | undefined;

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre est affiché", async () => {
      const h2 = el?.shadowRoot?.querySelector("h2");

      await expect(h2?.textContent).toBe(typedArgs.titre);
    });

    await step("L'illustration est affichée", async () => {
      const img = el?.shadowRoot?.querySelector("img") as HTMLImageElement | null;

      await expect(img).toBeTruthy();
      await expect(img?.alt).toBe(illustrationArgs.alt);
      await expect(img?.src).toBeTruthy();
    });

    await step("Le texte d'introduction est visible", async () => {
      const p = el?.shadowRoot?.querySelector(".contenu p");

      await expect(p?.textContent).toContain("membre de la communauté");
    });

    await step("Les raisons sont listées", async () => {
      const items = el?.shadowRoot?.querySelectorAll("ul li");

      await expect(items?.length).toBe(raisonsArgs.length);

      for (let i = 0; i < raisonsArgs.length; i++) {
        await expect(items?.[i]?.textContent).toContain(raisonsArgs[i]);
      }
    });

    await step("L'action est affichée ou absente selon la prop", async () => {
      const actionLink = el?.shadowRoot?.querySelector("a[role='button']");

      if (actionArgs) {
        await expect(actionLink).toBeTruthy();
        await expect(actionLink?.textContent?.trim()).toBe(actionArgs.titre);
      } else {
        await expect(actionLink).toBeNull();
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
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-rejoindre-la-communaute");
    const typedArgs = args as Record<string, unknown>;
    const actionArgs = typedArgs.action as { titre: string; lien: string };

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le lien d'action est affiché avec le bon texte", async () => {
      const actionLink = el?.shadowRoot?.querySelector("a[role='button']");

      await expect(actionLink).toBeTruthy();
      await expect(actionLink?.textContent?.trim()).toBe(actionArgs.titre);
    });

    await step("Le lien d'action pointe vers la bonne URL", async () => {
      const actionLink = el?.shadowRoot?.querySelector(
        "a[role='button']",
      ) as HTMLAnchorElement | null;

      await expect(actionLink?.getAttribute("href")).toBe(actionArgs.lien);
    });
  }}
/>

<Story name="Avec usage du slot titre">
  {#snippet template(args: Args)}
    <lab-anssi-brique-rejoindre-la-communaute
      raisons={args.raisons}
      illustration={args.illustration}
      action={args.action}
    >
      <h3 slot="titre">Rejoindre la communauté (slot)</h3>
    </lab-anssi-brique-rejoindre-la-communaute>
  {/snippet}
</Story>
