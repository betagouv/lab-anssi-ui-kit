<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    alertArgs,
    alertArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/alert/template/stories/alert-arg-types.js";
  import DsfrAlert from "$lib/dsfr/DsfrAlert.svelte";

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

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-alert
      disabled={args.disabled}
      button-close-label={args.buttonCloseLabel}
      hasTitle={args.hasTitle}
      title={args.title}
      has-description={args.hasDescription}
      text={args.text}
      type={args.type}
      size={args.size}
      id={args.id}
      dismissible={args.dismissible}
      icon={args.icon}
    ></dsfr-alert>
  {/snippet}
</Story>
