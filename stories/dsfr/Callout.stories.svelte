<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    calloutArgs,
    calloutArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/callout/template/stories/callout-arg-types.js";

  import LabAnssiBouton from "$lib/composants/Bouton.svelte";
  import DsfrCallout from "$lib/dsfr/DsfrCallout.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Callout",
    component: DsfrCallout,
    argTypes: calloutArgTypes,
    args: calloutArgs,
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
  name="Example MSS"
  args={{
    title: "Evolution des modes de connexion",
    text: "A partir de Mars 2026, la connexion à MonServiceSécurisé se fera uniquement via ProConnect.",
    hasButton: true,
  }}
>
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
    >
      <lab-anssi-bouton slot="button" titre={args.buttonLabel} variante="secondaire" taille="md"
      ></lab-anssi-bouton>
    </dsfr-callout>
  {/snippet}
</Story>
