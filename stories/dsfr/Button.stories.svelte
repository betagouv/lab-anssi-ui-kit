<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    buttonArgs,
    buttonArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/button-arg-types.js";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Button",
    component: DsfrButton,
    argTypes: {
      ...buttonArgTypes,
      kind: {
        control: {
          type: "select",
        },
        description:
          "Type du bouton<br>Valeurs :<br>- Primaire : bouton d'action principal, unique dans la page<br>- Secondaire : bouton d'action moins prioritaire<br>- Tertiaire : bouton d'action contextuelle ou alternative<br>Tertiaire sans bordure : version alternative",
        options: [
          "primary",
          "secondary",
          "tertiary",
          "tertiary-no-outline",
          "inverted-primary",
          "inverted-secondary",
          "inverted-tertiary",
          "inverted-tertiary-no-outline",
        ],
      },
      default: {
        description: "Contenu personnalisé du bouton (remplace la prop `label`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: { ...buttonArgs, kind: "primary" },
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
      docs: {
        codePanel: true,
        source: {
          transform: webComponentSourceCode("dsfr-button"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrButton>;
</script>

{#snippet template(args: Args)}
  <dsfr-button
    label={args.label}
    kind={args.kind}
    size={args.size}
    id={args.id}
    title={args.title}
    disabled={args.disabled || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    icon-place={args.iconPlace}
    markup={args.markup}
    type={args.type}
    href={args.href}
    target={args.target}
    centered={args.centered || undefined}
    expandable={args.expandable || undefined}
    preset={args.preset}
  ></dsfr-button>
{/snippet}

<Story name="Défaut" />

<Story name="Primaire" args={{ kind: "primary", label: "Primaire" }} />

<Story name="Secondaire" args={{ kind: "secondary", label: "Secondaire" }} />

<Story name="Tertiaire">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-button label="Tertiaire" kind="tertiary"></dsfr-button>
      <dsfr-button label="Tertiaire sans bordure" kind="tertiary-no-outline"></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Désactivé">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-button label="Primaire" kind="primary" disabled={true}></dsfr-button>
      <dsfr-button label="Secondaire" kind="secondary" disabled={true}></dsfr-button>
      <dsfr-button label="Tertiaire" kind="tertiary" disabled={true}></dsfr-button>
      <dsfr-button label="Tertiaire sans bordure" kind="tertiary-no-outline" disabled={true}
      ></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Icône à gauche">
  {#snippet template(args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-button
        label={args.label}
        kind="primary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="left"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="secondary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="left"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="left"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary-no-outline"
        has-icon={true}
        icon="checkbox-line"
        icon-place="left"
      ></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Icône à droite">
  {#snippet template(args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-button
        label={args.label}
        kind="primary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="right"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="secondary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="right"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="right"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary-no-outline"
        has-icon={true}
        icon="checkbox-line"
        icon-place="right"
      ></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Icône seule">
  {#snippet template(args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-button
        label={args.label}
        kind="primary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="only"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="secondary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="only"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary"
        has-icon={true}
        icon="checkbox-line"
        icon-place="only"
      ></dsfr-button>
      <dsfr-button
        label={args.label}
        kind="tertiary-no-outline"
        has-icon={true}
        icon="checkbox-line"
        icon-place="only"
      ></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Tailles">
  {#snippet template(args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <dsfr-button label={args.label} size="sm"></dsfr-button>
      <dsfr-button label={args.label} size="md"></dsfr-button>
      <dsfr-button label={args.label} size="lg"></dsfr-button>
    </div>
  {/snippet}
</Story>

<Story name="Fermer" args={{ label: "Fermer", preset: "close" }} />

<Story name="Affichage" args={{ label: "Paramètres d'affichage", preset: "display" }} />

<Story
  name="Contact"
  args={{
    label: "Contact",
    markup: "a",
    href: "[URL - à modifier]",
    preset: "team",
  }}
/>

<Story
  name="Espace recruteur"
  args={{
    label: "Espace recruteur",
    markup: "a",
    href: "[URL - à modifier]",
    preset: "briefcase",
  }}
/>

<Story
  name="Espace particulier"
  args={{
    label: "Espace particulier",
    markup: "a",
    href: "[URL - à modifier]",
    preset: "account",
  }}
/>

<Story name="Centered" args={{ centered: true }} />

<Story
  name="Inversé (Primaire)"
  args={{ ...buttonArgs, kind: "inverted-primary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>

<Story
  name="Inversé (Secondaire)"
  args={{ ...buttonArgs, kind: "inverted-secondary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>

<Story
  name="Inversé (Tertiaire)"
  args={{ ...buttonArgs, kind: "inverted-tertiary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>

<Story
  name="Inversé (Tertiaire sans bordure)"
  args={{ ...buttonArgs, kind: "inverted-tertiary-no-outline" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
