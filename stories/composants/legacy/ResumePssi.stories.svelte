<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ResumePssi from "$lib/composants/ResumePssi.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/ResumePssi",
    component: ResumePssi,
    args: {
      nomService: "MonService",
    },
    argTypes: {
      nomService: { control: "text", description: "Le nom du service" },
    },
    render: template,
  });

  type Args = ComponentProps<ResumePssi>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-resume-pssi nom-service={args.nomService}></lab-anssi-resume-pssi>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-resume-pssi");
    await step("Le composant est rendu", async () => {
      const paragraph = el?.shadowRoot?.querySelector("p");
      await expect(paragraph).toBeTruthy();
    });
    await step("Le composant contient des liens", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      await expect(links?.length).toBeGreaterThan(0);
    });
    await step("Les titres de section sont visibles", async () => {
      const headings = el?.shadowRoot?.querySelectorAll("h2");
      await expect(headings?.length).toBe(4);
      const headingTexts = Array.from(headings ?? []).map((h) => h.textContent?.trim());
      await expect(headingTexts).toContain("Gouvernance");
      await expect(headingTexts).toContain("Protection");
      await expect(headingTexts).toContain("Défense");
      await expect(headingTexts).toContain("Résilience");
    });
    await step("Le lien vers Clever Cloud est présent avec le bon href", async () => {
      const link = el?.shadowRoot?.querySelector("a[href='https://www.clever-cloud.com/']") as HTMLAnchorElement | null;
      await expect(link).toBeTruthy();
      await expect(link?.textContent?.trim()).toBe("Clever Cloud");
      await expect(link?.target).toBe("_blank");
    });
  }}
/>
