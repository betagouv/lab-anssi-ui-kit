<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import NavigationPiedDePage from "$lib/composants/pied-de-page/NavigationPiedDePage.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/NavigationPiedDePage",
    component: NavigationPiedDePage,
    args: {
      conforme: false,
    },
    argTypes: {
      conforme: {
        description: "Indique si la navigation est conforme ou non conforme.",
        control: "boolean",
      },
    },
    render: template,
  });

  type Args = ComponentProps<NavigationPiedDePage>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-navigation-pied-de-page conforme={args.conforme || undefined}
  ></lab-anssi-navigation-pied-de-page>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-navigation-pied-de-page");
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Les 7 liens de navigation sont présents", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      await expect(links?.length).toBe(7);
    });
    await step("Les textes des liens sont visibles", async () => {
      const text = el?.shadowRoot?.textContent;
      await expect(text).toContain("À propos");
      await expect(text).toContain("Mentions légales");
      await expect(text).toContain("Conditions générales");
    });
    await step("Les liens pointent vers les bonnes pages", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      const hrefs = Array.from(links ?? []).map((l) => l.getAttribute("href"));
      await expect(hrefs).toContain("/aPropos");
      await expect(hrefs).toContain("/mentionsLegales");
      await expect(hrefs).toContain("/accessibilite");
    });
    await step("Le lien d'accessibilité indique 'non conforme' par défaut", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      const accessibilityLink = links?.[links.length - 1];
      await expect(accessibilityLink?.textContent).toContain("non conforme");
    });
  }}
/>

<Story name="Conforme" args={{ conforme: true }} />
