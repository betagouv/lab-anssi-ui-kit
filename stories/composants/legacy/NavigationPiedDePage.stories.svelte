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
  }}
/>

<Story name="Conforme" args={{ conforme: true }} />
