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
  }}
/>
