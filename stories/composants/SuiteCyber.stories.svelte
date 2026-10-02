<script module lang="ts">
  import { expect, userEvent } from "storybook/test";
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
  name="Par défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-bouton-suite-cyber-navigation");

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le texte 'La Suite cyber' est visible", async () => {
      const texte = el?.shadowRoot?.querySelector(".texte-bouton");

      await expect(texte?.textContent?.trim()).toBe("La Suite cyber");
    });

    await step("Le bouton est fermé par défaut", async () => {
      const bouton = el?.shadowRoot?.querySelector("button[aria-expanded]");

      await expect(bouton?.getAttribute("aria-expanded")).toBe("false");
    });

    await step("Le panneau est masqué par défaut", async () => {
      await expect(el?.hasAttribute("data-open")).toBe(false);
    });

    await step("Le panneau s'ouvre au clic sur le bouton", async () => {
      const bouton = el?.shadowRoot?.querySelector("button[aria-expanded]");

      await userEvent.click(bouton!);

      await expect(bouton?.getAttribute("aria-expanded")).toBe("true");

      await expect(el?.hasAttribute("data-open")).toBe(true);
    });

    await step("Le contenu du panneau est affiché", async () => {
      const texte = el?.shadowRoot?.textContent;

      await expect(texte).toContain("S'informer");
      await expect(texte).toContain("Piloter");
      await expect(texte).toContain("Accompagner");
    });

    await step("Le panneau se ferme au re-clic sur le bouton", async () => {
      const bouton = el?.shadowRoot?.querySelector("button[aria-expanded]");

      await userEvent.click(bouton!);

      await expect(bouton?.getAttribute("aria-expanded")).toBe("false");

      await expect(el?.hasAttribute("data-open")).toBe(false);
    });
  }}
/>
