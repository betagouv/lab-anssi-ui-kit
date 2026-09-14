<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    logoArgTypes,
    logoArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/logo/template/stories/logo-arg-types.js";

  import DsfrLogo from "$lib/dsfr/DsfrLogo.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Logo",
    component: DsfrLogo,
    argTypes: logoArgTypes,
    args: logoArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Bloc marque de l’État.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bloc-marque)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-logo"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrLogo>;
</script>

{#snippet template(args: Args)}
  <dsfr-logo {...args}></dsfr-logo>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-logo");

    await step("Le logo est rendu", async () => {
      const logo = el?.shadowRoot?.querySelector("p.fr-logo");
      await expect(logo).toBeTruthy();
      await expect(logo?.classList.contains("fr-logo--md")).toBe(true);
    });

    await step("Le titre du logo est affiché", async () => {
      const logo = el?.shadowRoot?.querySelector("p.fr-logo");
      await expect(logo?.innerHTML).toContain("INTITULÉ");
    });
  }}
/>

<Story
  name="Taille SM"
  args={{ ...logoArgs, size: "sm" }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-logo");
    const logo = el?.shadowRoot?.querySelector("p.fr-logo");
    await expect(logo?.classList.contains("fr-logo--sm")).toBe(true);
  }}
/>

<Story name="Taille MD" args={{ ...logoArgs, size: "md" }} />

<Story
  name="Taille LG"
  args={{ ...logoArgs, size: "lg" }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-logo");
    const logo = el?.shadowRoot?.querySelector("p.fr-logo");
    await expect(logo?.classList.contains("fr-logo--lg")).toBe(true);
  }}
/>

<Story name="République Française" args={{ ...logoArgs, title: "République <br>Française" }} />

<Story
  name="Long"
  args={{
    ...logoArgs,
    title:
      "Secrétaire d’État <br>chargé(e) de <br>l’égalité entre les <br>femmes et les <br>hommes et de la <br>lutte contre les <br>discriminations",
  }}
/>
