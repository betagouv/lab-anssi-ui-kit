<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ConteneurStory from "./ConteneurStory.svelte";
  import LienDiagnosticCyber from "$lib/composants/mes-services-cyber/lien/LienDiagnosticCyber.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Lien Diagnostic Cyber",
    component: LienDiagnosticCyber,
    args: {
      lien: "#",
      versExterne: false,
    },
    render: template,
  });

  type Args = ComponentProps<LienDiagnosticCyber>;
</script>

{#snippet template(args: Args)}
  <ConteneurStory alignement="droite">
    <lab-anssi-mes-services-cyber-lien-diagnostic-cyber
      lien={args.lien}
      vers-externe={args.versExterne || undefined}
    ></lab-anssi-mes-services-cyber-lien-diagnostic-cyber>
  </ConteneurStory>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-mes-services-cyber-lien-diagnostic-cyber");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".racine");
      await expect(inner).toBeTruthy();
    });
    await step("Le texte du lien est affiché", async () => {
      const lien = el?.shadowRoot?.querySelector(".lien-diagnostic-cyber");
      await expect(lien?.textContent?.trim()).toContain("Diagnostic cyber gratuit");
    });
    await step("Le lien pointe vers la bonne cible", async () => {
      const lien = el?.shadowRoot?.querySelector(".lien-diagnostic-cyber") as HTMLAnchorElement | null;
      await expect(lien?.target).toBe("_self");
    });
    await step("Le titre du bloc est affiché", async () => {
      const h6 = el?.shadowRoot?.querySelector("h6");
      await expect(h6?.textContent).toBe("Prenez votre cyberdépart !");
    });
    await step("Le texte descriptif est affiché", async () => {
      const p = el?.shadowRoot?.querySelector(".texte p");
      await expect(p?.textContent).toContain("premier diagnostic gratuit");
    });
  }}
/>
