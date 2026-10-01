<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";

  import BriqueContenuADeuxColonnes from "$lib/composants/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Brique Contenu A Deux Colonnes",
    component: BriqueContenuADeuxColonnes,
    args: {
      titre: "MonServiceSécurisé",
      paragraphe:
        "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement",
      illustration: {
        lien: genereImageDePlaceholder(600, 400, "Placeholder"),
        alt: "Logo placeholder",
      },
      ordre: "texte-gauche",
    },
    argTypes: {
      titre: {
        control: "text",
        description: "Titre affiché dans la brique",
      },
      paragraphe: {
        control: "text",
        description: "Texte descriptif affiché sous le titre",
      },
      action: {
        control: "object",
        description: "Action avec un titre et un lien pour le bouton",
        table: {
          type: { summary: "{ titre: string, lien: string, target?: string }" },
        },
      },
      ordre: {
        control: "select",
        options: ["texte-gauche", "texte-droite"],
        description: "Ordre d'affichage du texte et de l'illustration",
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

  type Args = ComponentProps<BriqueContenuADeuxColonnes>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-brique-contenu-a-deux-colonnes {...args}></lab-anssi-brique-contenu-a-deux-colonnes>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-contenu-a-deux-colonnes");
    const typedArgs = args as Record<string, unknown>;
    const illustrationArgs = typedArgs.illustration as { lien: string; alt: string };
    const actionArgs = typedArgs.action as { titre: string; lien: string } | undefined;

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre est affiché", async () => {
      const h2 = el?.shadowRoot?.querySelector("h2");

      await expect(h2?.textContent).toBe(typedArgs.titre);
    });

    await step("Le paragraphe est affiché", async () => {
      const p = el?.shadowRoot?.querySelector("p");

      await expect(p?.textContent).toContain(typedArgs.paragraphe as string);
    });

    await step("L'illustration est affichée", async () => {
      const img = el?.shadowRoot?.querySelector("img") as HTMLImageElement | null;

      await expect(img).toBeTruthy();
      await expect(img?.alt).toBe(illustrationArgs.alt);
      await expect(img?.src).toBeTruthy();
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
    const el = canvasElement.querySelector("lab-anssi-brique-contenu-a-deux-colonnes");
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

<Story name="Avec usage des slots">
  {#snippet template(args: Args)}
    <lab-anssi-brique-contenu-a-deux-colonnes
      illustration={args.illustration}
      ordre={args.ordre}
      action={args.action}
    >
      <h2 slot="titre">MonServiceSécurisé</h2>
      <p slot="paragraphe">
        L'outil pour piloter en équipe la sécurité de tous vos services numériques et les <strong>
          homologuer rapidement
        </strong>
      </p>
    </lab-anssi-brique-contenu-a-deux-colonnes>
  {/snippet}
</Story>
