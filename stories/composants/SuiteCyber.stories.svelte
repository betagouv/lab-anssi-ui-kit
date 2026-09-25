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

{#snippet template(_args: Args, context: StoryContext<Args>)}
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
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Le texte 'La Suite cyber' est visible", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("La Suite cyber");
    });
    await step("Le bouton est fermé par défaut", async () => {
      const bouton = el?.shadowRoot?.querySelector("button[aria-expanded]");
      await expect(bouton?.getAttribute("aria-expanded")).toBe("false");
    });
    await step("Le panneau est masqué par défaut", async () => {
      await expect(el?.hasAttribute("data-open")).toBe(false);
    });
  }}
/>
