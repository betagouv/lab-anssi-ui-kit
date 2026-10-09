<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BriqueHero from "$lib/composants/vitrines-produits/briques/BriqueHero.svelte";

  import { genereImageDePlaceholder } from "../../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Brique Hero",
    component: BriqueHero,
    tags: ["Avec slots"],
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-brique-hero");
    const typedArgs = args as Record<string, unknown>;
    const actionGaucheArgs = typedArgs.actiongauche as { titre: string };
    const actionDroiteArgs = typedArgs.actiondroite as { titre: string };
    const illustrationArgs = typedArgs.illustration as { alt: string };
    const actions = el?.shadowRoot?.querySelectorAll("a[role='button']");

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre est affiché", async () => {
      const h1 = el?.shadowRoot?.querySelector("h1");

      await expect(h1?.textContent).toBe(typedArgs.titre);
    });

    await step("Le sous-titre est affiché", async () => {
      const paragraphs = el?.shadowRoot?.querySelectorAll("p");
      const soustitre = Array.from(paragraphs ?? []).find((p) =>
        p.textContent?.includes(typedArgs.soustitre as string),
      );

      await expect(soustitre).toBeTruthy();
    });

    await step("Le badge est affiché ou masqué selon la prop", async () => {
      const badge = el?.shadowRoot?.querySelector(".badge");

      if (typedArgs.badge) {
        await expect(badge?.textContent?.trim()).toBe("Service à impact national");
      } else {
        await expect(badge).toBeNull();
      }
    });

    await step("L'action gauche est affichée avec le bon texte", async () => {
      await expect(actions?.[0]?.textContent?.trim()).toContain(actionGaucheArgs.titre);
    });

    await step("L'action droite est affichée avec le bon texte", async () => {
      await expect(actions?.[1]?.textContent?.trim()).toContain(actionDroiteArgs.titre);
    });

    await step("L'illustration est affichée avec son texte alternatif", async () => {
      const illustration = el?.shadowRoot?.querySelector(`img[alt="${illustrationArgs.alt}"]`);

      await expect(illustration).toBeTruthy();
    });
  }}
/>

<Story name="Avec usage des slots">
  {#snippet template(args: Args)}
    <lab-anssi-brique-hero
      illustration={args.illustration}
      badge={args.badge || undefined}
      actiongauche={args.actiongauche}
      actiondroite={args.actiondroite}
      partenaires={args.partenaires}
    >
      <h2 slot="titre">MonServiceSécurisé</h2>
      <p slot="soustitre">
        L'outil pour piloter en équipe la sécurité de tous vos <strong>services numériques</strong> et
        les homologuer rapidement
      </p>
    </lab-anssi-brique-hero>
  {/snippet}
</Story>
