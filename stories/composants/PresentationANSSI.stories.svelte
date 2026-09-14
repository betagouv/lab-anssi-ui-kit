<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import PresentationANSSI from "$lib/composants/vitrines-produits/briques/PresentationANSSI.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Presentation ANSSI",
    component: PresentationANSSI,
    render: template,
  });

  type Args = ComponentProps<PresentationANSSI>;
</script>

{#snippet template(_args: Args)}
  <lab-anssi-presentation-anssi></lab-anssi-presentation-anssi>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-presentation-anssi");
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Le titre par défaut est affiché", async () => {
      const titre = el?.shadowRoot?.querySelector("h2");
      await expect(titre?.textContent?.trim()).toContain("Qu'est-ce que l'ANSSI");
    });
    await step("La description de l'ANSSI est affichée", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("cybersécurité");
    });
    await step("Le logo ANSSI est affiché", async () => {
      const logo = el?.shadowRoot?.querySelector('img[alt="Logo de l\'ANSSI"]');
      await expect(logo).toBeTruthy();
    });
    await step("Le lien 'En savoir plus' est présent", async () => {
      const lien = el?.shadowRoot?.querySelector('a[href="https://cyber.gouv.fr/"]');
      await expect(lien).toBeTruthy();
    });
  }}
/>
