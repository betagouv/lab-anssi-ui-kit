<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Container",
    component: DsfrContainer,
    argTypes: {
      default: {
        description: "Contenu principal du conteneur",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-container"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrContainer>;
</script>

{#snippet template(args: Args)}
  <dsfr-container {...args}>
    <p>Contenu du conteneur</p>
    <small>
      <i>
        La bordure présente dans cette story sert uniquement à titre d'illustration et n'est pas
        présente lors de l'usage classique du composant
      </i>
    </small>
  </dsfr-container>
  <style>
    .fr-container {
      border: 1px dashed black;
      min-height: 24px;
    }

    .fr-container--fluid {
      border: 1px dashed black;
      min-height: 24px;
    }
  </style>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-container");

    await step("Le conteneur est rendu avec la classe fr-container", async () => {
      const container = el?.shadowRoot?.querySelector(".fr-container");
      await expect(container).toBeTruthy();
    });

    await step("Le contenu du slot est affiché", async () => {
      const slot = el?.shadowRoot?.querySelector("slot");
      await expect(slot).toBeTruthy();
    });
  }}
/>

<Story
  name="Fluid"
  args={{
    fluid: true,
  }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-container");
    const container = el?.shadowRoot?.querySelector(".fr-container--fluid");
    await expect(container).toBeTruthy();
  }}
/>
