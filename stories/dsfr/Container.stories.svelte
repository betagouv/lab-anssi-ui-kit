<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Container",
    component: DsfrContainer,
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

<Story name="Défaut" />

<Story
  name="Fluid"
  args={{
    fluid: true,
  }}
/>
