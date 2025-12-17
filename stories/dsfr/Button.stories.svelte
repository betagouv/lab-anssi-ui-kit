<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    buttonArgs,
    buttonArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/button-arg-types.js";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Button",
    component: DsfrButton,
    argTypes: {
      ...buttonArgTypes,
      kind: {
        control: {
          type: "select",
        },
        description:
          "Type du bouton<br>Valeurs :<br>- Primaire : bouton d'action principal, unique dans la page<br>- Secondaire : bouton d'action moins prioritaire<br>- Tertiaire : bouton d'action contextuelle ou alternative<br>Tertiaire sans bordure : version alternative",
        options: ["primary", "secondary", "tertiary", "tertiary-no-outline", "inverted"],
      },
    },
    args: buttonArgs,
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
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
    disabled={args.disabled}
    has-icon={args.hasIcon}
    icon={args.icon}
    icon-place={args.iconPlace}
    markup={args.markup}
    type={args.type}
    href={args.href}
    target={args.target}
    centered={args.centered}
    expandable={args.expandable}
    preset={args.preset}
  ></dsfr-button>
{/snippet}

<Story name="Défaut" />

<Story name="Centered" args={{ centered: true }} />

<Story
  name="Inverted Primary"
  args={{ ...buttonArgs, kind: "inverted-primary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>

<Story
  name="Inverted Secondary"
  args={{ ...buttonArgs, kind: "inverted-secondary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
