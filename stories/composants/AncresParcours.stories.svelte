<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import AncresParcours from "$lib/composants/AncresParcours.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Ancres parcours",
    component: AncresParcours,
    args: {
      ancres: [
        { label: "Section 1", cible: "#section1" },
        { label: "Section 2", cible: "#section2" },
        { label: "Section 3", cible: "#section3" },
      ],
      indexActif: 0,
    },
    render: template,
  });

  type Args = ComponentProps<AncresParcours>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-ancres ancres={args.ancres} index-actif={args.indexActif}></lab-anssi-ancres>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-ancres");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".lab-anssi-ancres");
      await expect(inner).toBeTruthy();
    });
    await step("Les trois ancres sont affichées avec leur texte", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".lab-anssi-ancres__item");
      await expect(items?.length).toBe(3);
      await expect(items?.[0]?.textContent?.trim()).toBe("Section 1");
      await expect(items?.[1]?.textContent?.trim()).toBe("Section 2");
      await expect(items?.[2]?.textContent?.trim()).toBe("Section 3");
    });
    await step("La première ancre a la classe 'active'", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".lab-anssi-ancres__item");
      await expect(items?.[0]?.classList.contains("active")).toBe(true);
      await expect(items?.[1]?.classList.contains("active")).toBe(false);
    });
    await step("Les ancres ont les bons attributs href", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".lab-anssi-ancres__item");
      await expect(items?.[0]?.getAttribute("href")).toBe("#section1");
      await expect(items?.[1]?.getAttribute("href")).toBe("#section2");
      await expect(items?.[2]?.getAttribute("href")).toBe("#section3");
    });
  }}
/>
