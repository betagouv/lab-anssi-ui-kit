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

{#snippet template(args: Args)}
  <lab-anssi-presentation-anssi></lab-anssi-presentation-anssi>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-presentation-anssi");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".presentation-anssi");
      await expect(inner).toBeTruthy();
    });
    await step("Le titre par défaut est affiché", async () => {
      const titre = el?.shadowRoot?.querySelector(".presentation-anssi__titre");
      await expect(titre?.textContent?.trim()).toContain("Qu'est-ce que l'ANSSI");
    });
    await step("La description de l'ANSSI est affichée", async () => {
      const description = el?.shadowRoot?.querySelector(".presentation-anssi__description");
      await expect(description?.textContent).toContain("cybersécurité");
    });
    await step("Le logo ANSSI est affiché", async () => {
      const logo = el?.shadowRoot?.querySelector(".presentation-anssi__logo");
      await expect(logo).toBeTruthy();
    });
    await step("Le bouton 'En savoir plus' est présent", async () => {
      const bouton = el?.shadowRoot?.querySelector(".presentation-anssi__contenu a");
      await expect(bouton?.textContent).toContain("En savoir plus");
    });
  }}
/>
