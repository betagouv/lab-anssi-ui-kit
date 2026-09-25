<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BriqueHero from "$lib/composants/vitrines-produits/briques/BriqueHero.svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Brique Hero",
    component: BriqueHero,
    args: {
      badge: true,
      titre: "MonServiceSécurisé",
      soustitre:
        "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement",
      illustration: { lien: genereImageDePlaceholder(600, 400), alt: "Logo placeholder" },
      actiongauche: { titre: "Commencer à sécuriser", lien: "" },
      actiondroite: { titre: "Être accompagné", lien: "" },
      partenaires: [{ lien: "src/lib/assets/illustrations/cnil.svg", alt: "Logo de la CNIL" }],
    },
    argTypes: {
      badge: {
        control: "boolean",
        description: "Affiche ou non le badge dans la brique",
      },
      titre: {
        control: "text",
        description: "Titre principal affiché dans la brique",
      },
      soustitre: {
        control: "text",
        description: "Sous-titre affiché sous le titre principal",
      },
      illustration: {
        control: "object",
        description: "Image avec un lien et un texte alternatif",
        table: {
          type: { summary: "{ lien: string, alt: string }" },
        },
      },
      actiongauche: {
        control: "object",
        description: "Action gauche avec un titre et un lien pour le bouton",
        table: {
          type: { summary: "{ titre: string, lien: string, target?: string }" },
        },
      },
      actiondroite: {
        control: "object",
        description: "Action droite avec un titre et un lien pour le bouton",
        table: {
          type: { summary: "{ titre: string, lien: string, target?: string }" },
        },
      },
      partenaires: {
        control: "object",
        description: "Liste des partenaires avec leurs logos",
        table: {
          type: { summary: "{ lien: string, alt: string }[]" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<BriqueHero>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-brique-hero
    titre={args.titre}
    soustitre={args.soustitre}
    illustration={args.illustration}
    badge={args.badge || undefined}
    actiongauche={args.actiongauche}
    actiondroite={args.actiondroite}
    partenaires={args.partenaires}
  ></lab-anssi-brique-hero>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-hero");
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Le titre est affiché", async () => {
      const h1 = el?.shadowRoot?.querySelector("h1");
      await expect(h1?.textContent).toBe("MonServiceSécurisé");
    });
    await step("Le sous-titre est affiché", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("piloter en équipe la sécurité");
    });
    await step("Le badge est affiché", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("Service à impact national");
    });
    await step("L'action gauche est affichée avec le bon texte", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a[role='button']");
      const actionGauche = links?.[0];
      await expect(actionGauche?.textContent?.trim()).toContain("Commencer à sécuriser");
    });
    await step("L'action droite est affichée avec le bon texte", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a[role='button']");
      const actionDroite = links?.[1];
      await expect(actionDroite?.textContent?.trim()).toContain("Être accompagné");
    });
    await step("L'illustration est affichée avec son texte alternatif", async () => {
      const imgs = el?.shadowRoot?.querySelectorAll("img");
      const illustration = Array.from(imgs ?? []).find((img) => img.alt === "Logo placeholder");
      await expect(illustration).toBeTruthy();
    });
  }}
/>
