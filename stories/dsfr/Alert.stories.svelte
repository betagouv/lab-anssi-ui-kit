<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    alertArgs,
    alertArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/alert/template/stories/alert-arg-types.js";

  import DsfrAlert from "$lib/dsfr/DsfrAlert.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Alert",
    component: DsfrAlert,
    args: alertArgs,
    argTypes: alertArgTypes,
    render: template,
  });

  type Args = ComponentProps<DsfrAlert>;
</script>

{#snippet template(args: Args)}
  <dsfr-alert
    button-close-label={args.buttonCloseLabel}
    has-title={args.hasTitle || undefined}
    title={args.title}
    has-description={args.hasDescription || undefined}
    text={args.text}
    type={args.type}
    size={args.size}
    id={args.id}
    dismissible={args.dismissible || undefined}
    icon={args.icon}
  ></dsfr-alert>
{/snippet}

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
  {#snippet template(args: Args)}
    <dsfr-alert
      has-title={args.hasTitle}
      title={args.title}
      has-description={args.hasDescription}
      dismissible={args.dismissible}
    >
      <p slot="description">
        Ceci est une <strong>description personnalisée</strong> de l'alerte utilisant un slot avec
        un&nbsp;<dsfr-link href="https://cyber.gouv.fr/" blank label="lien"></dsfr-link>.
      </p>
    </dsfr-alert>
  {/snippet}
</Story>
