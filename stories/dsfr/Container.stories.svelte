<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Container",
    component: DsfrContainer,
  });
</script>

<Story name="Défaut">
  {#snippet template(args)}
    <DsfrContainer {...args}>
      <p>Contenu du conteneur</p>
      <small>
        <i>
          La bordure présente dans cette story sert uniquement à titre d'illustration et n'est pas
          présente lors de l'usage classique du composant
        </i>
      </small>
    </DsfrContainer>
    <style>
      .fr-container {
        border: 1px dashed black;
        min-height: 24px;
      }
    </style>
  {/snippet}
</Story>

<Story
  name="Fluid"
  args={{
    fluid: true,
  }}
>
  {#snippet template(args)}
    <DsfrContainer {...args}>
      <p>Contenu du conteneur fluide</p>
      <small>
        <i>
          La bordure présente dans cette story sert uniquement à titre d'illustration et n'est pas
          présente lors de l'usage classique du composant
        </i>
      </small>
    </DsfrContainer>
    <style>
      .fr-container--fluid {
        border: 1px dashed black;
        min-height: 24px;
      }
    </style>
  {/snippet}
</Story>

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-container fluid={args.fluid}></dsfr-container>
  {/snippet}
</Story>
