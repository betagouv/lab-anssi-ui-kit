<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    alertArgs,
    alertArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/alert/template/stories/alert-arg-types.js";
  import DsfrAlert from "$lib/dsfr/DsfrAlert.svelte";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Alert",
    component: DsfrAlert,
    args: alertArgs,
    argTypes: alertArgTypes,
  });
</script>

<Story name="Défaut" />

<Story
  name="Title"
  args={{
    hasTitle: true,
    title: "Titre de l'alerte contenant l'intitulé de son type",
    hasDescription: false,
  }}
/>

<Story
  name="Description"
  args={{
    hasTitle: true,
    title: "Titre de l'alerte contenant l'intitulé de son type",
    hasDescription: true,
    text: "Texte de description de l'alerte",
  }}
/>

<Story
  name="Success"
  args={{
    type: "success",
    hasTitle: true,
    title: "Titre du message de succès",
    text: "Texte du message",
  }}
/>

<Story
  name="Error"
  args={{
    type: "error",
    hasTitle: true,
    title: "Titre du message d'erreur",
    text: "Texte du message",
  }}
/>

<Story
  name="Information"
  args={{
    type: "info",
    hasTitle: true,
    title: "Titre du message d'information",
    text: "Texte du message",
  }}
/>

<Story
  name="Warning"
  args={{
    type: "warning",
    hasTitle: true,
    title: "Titre du message d'avertissement",
    text: "Texte du message",
  }}
/>

<Story
  name="SizeSm"
  args={{
    size: "sm",
    type: "success",
    hasTitle: false,
    hasDescription: true,
    text: "Succès : Description détaillée du message...",
  }}
/>

<Story
  name="Dismissible"
  args={{
    title: "Titre du message",
    hasTitle: true,
    hasDescription: true,
    text: "Cliquer sur la croix pour fermer l'alerte",
    dismissible: true,
  }}
/>

<Story
  name="With Slot Description"
  args={{
    title: "Titre de l'alerte",
    hasTitle: true,
    hasDescription: true,
    dismissible: true,
  }}
>
  {#snippet template(args)}
    <DsfrAlert {...args}>
      <p slot="description">
        Ceci est une <strong>description personnalisée</strong> de l'alerte utilisant un slot avec
        un&nbsp;<DsfrLink href="https://cyber.gouv.fr/" blank label="lien" />.
      </p>
    </DsfrAlert>
  {/snippet}
</Story>
