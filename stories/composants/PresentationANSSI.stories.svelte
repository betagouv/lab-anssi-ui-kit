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
  name="Par défaut"
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
      const description = el?.shadowRoot?.querySelector(".presentation-anssi__description");

      await expect(description?.textContent).toContain("ANSSI");
    });

    await step("Le logo ANSSI est affiché avec une source valide", async () => {
      const logo = el?.shadowRoot?.querySelector(
        'img[alt="Logo de l\'ANSSI"]',
      ) as HTMLImageElement | null;

      await expect(logo).toBeTruthy();
      await expect(logo?.src).toBeTruthy();
    });
  }}
/>

<Story name="Avec usage du slot titre">
  {#snippet template(_args: Args)}
    <lab-anssi-presentation-anssi>
      <h2 slot="titre">Qu'est-ce que l'ANSSI ? (slot)</h2>
      <p>
        Créée en 2009, l'Agence nationale de la sécurité des systèmes d'information (<abbr>
          ANSSI
        </abbr>) est l'autorité nationale en matière de cybersécurité et de cyberdéfense (slot).
      </p>
      <p>
        <strong>
          Son action pour la protection de la Nation face aux cyberattaques se traduit en cinq
          grandes missions : défendre, connaître, partager, accompagner, réguler (slot).
        </strong>
      </p>
    </lab-anssi-presentation-anssi>
  {/snippet}
</Story>
