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
      const inner = el?.shadowRoot?.querySelector(".conteneur-navigation-pied-de-page");
      await expect(inner).toBeTruthy();
    });
    await step("Les 7 liens de navigation sont présents", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      await expect(links?.length).toBe(7);
    });
    await step("Le lien d'accessibilité indique 'non conforme' par défaut", async () => {
      const links = el?.shadowRoot?.querySelectorAll("a");
      const accessibilityLink = links?.[links.length - 1];
      await expect(accessibilityLink?.textContent).toContain("non conforme");
    });
    await step("Les séparateurs sont présents entre les liens", async () => {
      const separators = el?.shadowRoot?.querySelectorAll(".separateur");
      await expect(separators?.length).toBe(6);
    });
  }}
/>

<Story name="Conforme" args={{ conforme: true }} />
