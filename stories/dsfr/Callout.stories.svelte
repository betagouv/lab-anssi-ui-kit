<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    calloutArgs,
    calloutArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/callout/template/stories/callout-arg-types.js";

  import LabAnssiBouton from "$lib/composants/Bouton.svelte";
  import DsfrCallout from "$lib/dsfr/DsfrCallout.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Callout",
    component: DsfrCallout,
    argTypes: {
      ...calloutArgTypes,
      button: {
        description: "Bouton d'action personnalisé (remplace le DsfrButton généré par défaut)",
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

<Story name="Défaut" />

<Story
  name="Icône"
  args={{
    hasIcon: true,
    icon: "info-line",
  }}
/>

<Story
  name="Bouton"
  args={{
    hasButton: true,
    buttonLabel: "En savoir plus",
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
/>

<Story
  name="Accent"
  args={{
    accent: "pink-macaron",
  }}
/>
