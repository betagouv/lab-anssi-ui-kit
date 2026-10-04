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
      slotDefault: {
        name: "default",
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
  name="Par défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-container");
    const shadow = el?.shadowRoot;

    await step("Le conteneur a la classe fr-container", async () => {
      const container = shadow?.querySelector(".fr-container");

      await expect(container).toBeTruthy();
    });

    await step("Le conteneur n'a pas la classe fluid", async () => {
      const fluid = shadow?.querySelector(".fr-container--fluid");

      await expect(fluid).toBeNull();
    });
  }}
/>

<Story
  name="Fluid"
  args={{
    fluid: true,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-container");
    const shadow = el?.shadowRoot;

    await step("Le conteneur a la classe fr-container--fluid", async () => {
      const fluid = shadow?.querySelector(".fr-container--fluid");

      await expect(fluid).toBeTruthy();
    });

    await step("Le conteneur n'a pas la classe fr-container standard", async () => {
      const container = shadow?.querySelector(".fr-container:not(.fr-container--fluid)");

      await expect(container).toBeNull();
    });
  }}
/>
