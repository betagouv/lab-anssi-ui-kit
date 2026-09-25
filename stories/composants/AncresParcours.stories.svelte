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
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-ancres");

    await step("Le composant est rendu", async () => {
      const nav = el?.shadowRoot?.querySelector("nav");
      await expect(nav).toBeTruthy();
    });

    await step("Les ancres sont affichées avec leur texte", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");

      await expect(links?.length).toBe(args.ancres.length);

      for (let i = 0; i < args.ancres.length; i++) {
        await expect(links?.[i]?.textContent?.trim()).toBe(args.ancres[i].label);
      }
    });
  }}
/>
