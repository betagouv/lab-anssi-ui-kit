<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    calloutArgs,
    calloutArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/callout/template/stories/callout-arg-types.js";

  import "$lib/composants/Bouton.svelte";
  import DsfrCallout from "$lib/dsfr/DsfrCallout.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Callout",
    component: DsfrCallout,
    argTypes: {
      ...calloutArgTypes,
      slotButton: {
        name: "button",
        description: "Bouton d'action personnalisé (remplace le DsfrButton généré par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      slotDescription: {
        name: "description",
        description: "Contenu de la description (remplace la prop `text`)",
        control: false,
        table: { category: "Slots" },
      },
      slotTitle: {
        name: "title",
        description: "Contenu du titre (remplace la prop `title`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: calloutArgs,
    parameters: {
      docs: {
        description: {
          component:
            "La mise en avant permet à l’utilisateur de distinguer rapidement une information qui vient compléter le contenu consulté.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/mise-en-avant)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-callout"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCallout>;
</script>

{#snippet template(args: Args)}
  <dsfr-callout
    has-title={args.hasTitle || undefined}
    title={args.title}
    text={args.text}
    id={args.id}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    title-markup={args.titleMarkup}
    has-button={args.hasButton || undefined}
    button-label={args.buttonLabel}
    accent={args.accent}
  ></dsfr-callout>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-callout");
    const shadow = el?.shadowRoot;

    await step("Le titre est affiché selon la prop hasTitle", async () => {
      const title = shadow?.querySelector(".fr-callout__title");

      if (args.hasTitle !== false) {
        await expect(title).toBeTruthy();
        if (args.title) {
          await expect(title?.textContent?.trim()).toBe(args.title);
        }
      } else {
        await expect(title).toBeNull();
      }
    });

    await step("Le texte est affiché", async () => {
      const text = shadow?.querySelector(".fr-callout__text");

      await expect(text).toBeTruthy();
      await expect(text?.textContent?.trim()).toBe(args.text);
    });
  }}
/>

<Story
  name="Icône"
  args={{
    hasIcon: true,
    icon: "info-line",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-callout");
    const shadow = el?.shadowRoot;

    await step("L'icône est présente ou absente selon la prop hasIcon", async () => {
      const callout = shadow?.querySelector("div.fr-callout");
      if (args.hasIcon && args.icon) {
        await expect(callout?.classList.contains(`fr-icon-${args.icon}`)).toBe(true);
      } else {
        await expect(callout?.className).not.toContain("fr-icon-");
      }
    });
  }}
/>

<Story
  name="Bouton"
  args={{
    hasButton: true,
    buttonLabel: "En savoir plus",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-callout");
    const shadow = el?.shadowRoot;

    await step("Le bouton est rendu avec le bon label", async () => {
      const button = shadow?.querySelector(".fr-btn");

      await expect(button).toBeTruthy();
      await expect(button?.textContent?.trim()).toBe(args.buttonLabel);
    });
  }}
/>

<Story
  name="Icône et bouton"
  args={{
    hasIcon: true,
    icon: "info-line",
    hasButton: true,
    buttonLabel: "En savoir plus",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-callout");
    const shadow = el?.shadowRoot;

    await step("La mise en avant a la bonne icône", async () => {
      const callout = shadow?.querySelector("div.fr-callout");

      await expect(callout?.classList.contains(`fr-icon-${args.icon}`)).toBe(true);
    });

    await step("Le bouton est rendu dans la mise en avant", async () => {
      const button = shadow?.querySelector(".fr-btn");

      await expect(button).toBeTruthy();
      await expect(button?.textContent?.trim()).toBe(args.buttonLabel);
    });
  }}
/>

<Story
  name="Accent"
  args={{
    accent: "pink-macaron",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-callout");
    const shadow = el?.shadowRoot;

    await step("La mise en avant a la bonne couleur d'accent", async () => {
      const callout = shadow?.querySelector("div.fr-callout");

      await expect(callout?.classList.contains(`fr-callout--${args.accent}`)).toBe(true);
    });
  }}
/>

<Story name="Avec usage des slots">
  {#snippet template(args: Args)}
    <dsfr-callout
      has-title={args.hasTitle || undefined}
      id={args.id}
      has-icon={args.hasIcon || undefined}
      icon={args.icon}
      title-markup={args.titleMarkup}
      has-button={args.hasButton || undefined}
      button-label={args.buttonLabel}
      accent={args.accent}
    >
      <h2 slot="title">{args.title}</h2>
      <p slot="description">{args.text}</p>
    </dsfr-callout>
  {/snippet}
</Story>
