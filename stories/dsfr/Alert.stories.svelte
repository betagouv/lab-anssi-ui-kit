<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    alertArgs,
    alertArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/alert/template/stories/alert-arg-types.js";

  import DsfrAlert from "$lib/dsfr/DsfrAlert.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Alert",
    component: DsfrAlert,
    args: alertArgs,
    argTypes: {
      ...alertArgTypes,
      titleTag: {
        control: { type: "select" },
        description: "Balise HTML du titre",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "p"],
      },
      description: {
        description: "Contenu de la description (remplace la prop `text` avec du HTML riche)",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            "L'alerte permet d'attirer l'attention de l'utilisateur sur une information sans interrompre sa tâche.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/alerte)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-alert"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrAlert>;
</script>

{#snippet template(args: Args)}
  <dsfr-alert
    button-close-label={args.buttonCloseLabel}
    has-title={args.hasTitle}
    title={args.title}
    has-description={args.hasDescription}
    text={args.text}
    type={args.type}
    size={args.size}
    id={args.id}
    dismissible={args.dismissible || undefined}
    icon={args.icon}
    title-tag={args.titleTag}
  ></dsfr-alert>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement }) => {
    const dsfrAlert = canvasElement.querySelector("dsfr-alert");
    const alert = dsfrAlert?.shadowRoot?.querySelector(".fr-alert");
    await expect(alert).toBeTruthy();
    await expect(alert?.classList.contains("fr-alert--default")).toBe(true);
  }}
/>

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
  name="Succès"
  args={{
    type: "success",
    hasTitle: true,
    title: "Titre du message de succès",
    text: "Texte du message",
  }}
  play={async ({ canvasElement }) => {
    const dsfrAlert = canvasElement.querySelector("dsfr-alert");
    const alert = dsfrAlert?.shadowRoot?.querySelector(".fr-alert");
    await expect(alert?.classList.contains("fr-alert--success")).toBe(true);

    const title = dsfrAlert?.shadowRoot?.querySelector(".fr-alert__title");
    await expect(title?.textContent).toBe("Titre du message de succès");

    const text = dsfrAlert?.shadowRoot?.querySelector("p");
    await expect(text?.textContent).toBe("Texte du message");
  }}
/>

<Story
  name="Erreur"
  args={{
    type: "error",
    hasTitle: true,
    title: "Titre du message d'erreur",
    text: "Texte du message",
  }}
  play={async ({ canvasElement }) => {
    const dsfrAlert = canvasElement.querySelector("dsfr-alert");
    const alert = dsfrAlert?.shadowRoot?.querySelector(".fr-alert");
    await expect(alert?.classList.contains("fr-alert--error")).toBe(true);
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
  name="Avertissement"
  args={{
    type: "warning",
    hasTitle: true,
    title: "Titre du message d'avertissement",
    text: "Texte du message",
  }}
/>

<Story name="Taille SM">
  {#snippet template(_args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <dsfr-alert type="success" size="sm" text="Succès : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert type="error" size="sm" text="Erreur : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert type="info" size="sm" text="Information : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert type="warning" size="sm" text="Attention : Description détaillée du message..."
      ></dsfr-alert>
    </div>
  {/snippet}
</Story>

<Story name="Taille MD">
  {#snippet template(_args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <dsfr-alert
        type="success"
        has-title={true}
        title="Succès : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert type="error" has-title={true} title="Erreur : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert
        type="info"
        has-title={true}
        title="Information : Description détaillée du message..."
      ></dsfr-alert>
      <dsfr-alert
        type="warning"
        has-title={true}
        title="Attention : Description détaillée du message..."
      ></dsfr-alert>
    </div>
  {/snippet}
</Story>

<Story
  name="Dismissible"
  args={{
    title: "Titre du message",
    hasTitle: true,
    hasDescription: true,
    text: "Cliquer sur la croix pour fermer l'alerte",
    dismissible: true,
  }}
  play={async ({ canvasElement, step }) => {
    const dsfrAlert = canvasElement.querySelector("dsfr-alert");

    await step("L'alerte et le bouton de fermeture sont rendus", async () => {
      const alert = dsfrAlert?.shadowRoot?.querySelector(".fr-alert");
      await expect(alert).toBeTruthy();
      const button = dsfrAlert?.shadowRoot?.querySelector("button.fr-btn--close");
      await expect(button).toBeTruthy();
    });

    await step("L'alerte disparaît après clic sur le bouton de fermeture", async () => {
      const button = dsfrAlert?.shadowRoot?.querySelector("button.fr-btn--close") as HTMLElement;
      await userEvent.click(button);
      const alert = dsfrAlert?.shadowRoot?.querySelector(".fr-alert");
      await expect(alert).toBeNull();
    });
  }}
/>

<Story
  name="Icône personnalisée"
  args={{
    type: "default",
    hasTitle: true,
    icon: "lock-fill",
  }}
/>

<Story
  name="Avec slot Description"
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
