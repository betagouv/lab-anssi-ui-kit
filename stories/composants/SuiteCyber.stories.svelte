<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta, type StoryContext } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ConteneurStory from "./legacy/ConteneurStory.svelte";
  import SuiteCyber from "$lib/composants/suite-cyber/SuiteCyber.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Suite Cyber",
    component: SuiteCyber,
    render: template,
  });

  type Args = ComponentProps<SuiteCyber>;
</script>

{#snippet template(args: Args, context: StoryContext<Args>)}
  {console.log(JSON.stringify(context.globals))}

  <ConteneurStory alignement="droite">
    <lab-anssi-bouton-suite-cyber-navigation
      source-utm={context.globals.theme || "MonServiceSécurisé"}
    ></lab-anssi-bouton-suite-cyber-navigation>
  </ConteneurStory>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-bouton-suite-cyber-navigation");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".suite-cyber");
      await expect(inner).toBeTruthy();
    });
    await step("La navigation est présente", async () => {
      const nav = el?.shadowRoot?.querySelector(".navigation");
      await expect(nav).toBeTruthy();
    });
    await step("Le bouton mobile contient le texte 'La Suite cyber'", async () => {
      const boutonMobile = el?.shadowRoot?.querySelector(".bouton-suite-cyber-mobile");
      await expect(boutonMobile?.textContent).toContain("La Suite cyber");
    });
    await step("Le bouton est fermé par défaut", async () => {
      const bouton = el?.shadowRoot?.querySelector(".bouton-suite-cyber-mobile");
      await expect(bouton?.getAttribute("aria-expanded")).toBe("false");
    });
    await step("Le contenu est masqué par défaut", async () => {
      const contenu = el?.shadowRoot?.querySelector(".contenu");
      await expect(contenu).toBeNull();
    });
  }}
/>
