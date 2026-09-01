<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    buttonsGroupArgTypes,
    buttonsGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/buttons-group-arg-types.js";

  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Buttons Group",
    component: DsfrButtonsGroup,
    argTypes: buttonsGroupArgTypes,
    args: {
      ...buttonsGroupArgs,
      buttons: [
        {
          label: "libellé du bouton 1",
          kind: "primary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 2",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 3",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
      ],
    },
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
      docs: {
        description: {
          component:
            "Le bouton est un élément d’interaction avec l’interface permettant à l’utilisateur d’effectuer une action.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bouton)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-buttons-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrButtonsGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-buttons-group
    size={args.size}
    has-icon={args.hasIcon}
    icon-place={args.iconPlace}
    group-markup={args.groupMarkup}
    inline={`${args.inline}`}
    equisized={args.equisized || undefined}
    align={args.align}
    reverse={args.reverse || undefined}
    buttons={args.buttons}
  ></dsfr-buttons-group>
{/snippet}

<Story name="Défaut" />

<Story
  name="Vertical"
  args={{
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "primary",
        disabled: false,
      },
      {
        label: "libellé du bouton 2",
        kind: "secondary",
        disabled: false,
      },
    ],
  }}
/>

<Story
  name="Horizontal"
  args={{
    inline: true,
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "primary",
        disabled: false,
      },
      {
        label: "libellé du bouton 2",
        kind: "secondary",
        disabled: false,
      },
    ],
  }}
/>

<Story name="Tailles">
  {#snippet template(_args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <dsfr-buttons-group
        size="sm"
        inline="true"
        buttons={[
          { label: "libellé du bouton sm 1", kind: "primary", disabled: false },
          { label: "libellé du bouton sm 2", kind: "secondary", disabled: false },
          { label: "libellé du bouton sm 3", kind: "secondary", disabled: false },
        ]}
      ></dsfr-buttons-group>
      <dsfr-buttons-group
        size="md"
        inline="true"
        buttons={[
          { label: "libellé du bouton md 1", kind: "primary", disabled: false },
          { label: "libellé du bouton md 2", kind: "secondary", disabled: false },
          { label: "libellé du bouton md 3", kind: "secondary", disabled: false },
        ]}
      ></dsfr-buttons-group>
      <dsfr-buttons-group
        size="lg"
        inline="true"
        buttons={[
          { label: "libellé du bouton lg 1", kind: "primary", disabled: false },
          { label: "libellé du bouton lg 2", kind: "secondary", disabled: false },
          { label: "libellé du bouton lg 3", kind: "secondary", disabled: false },
        ]}
      ></dsfr-buttons-group>
    </div>
  {/snippet}
</Story>

<Story
  name="Primaire"
  args={{
    inline: true,
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "primary",
        disabled: false,
      },
      {
        label: "libellé du bouton 2",
        kind: "secondary",
        disabled: false,
      },
      {
        label: "libellé du bouton 3",
        kind: "secondary",
        disabled: false,
      },
    ],
  }}
/>

<Story
  name="Secondaire"
  args={{
    inline: true,
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "secondary",
        disabled: false,
      },
      {
        label: "libellé du bouton 2",
        kind: "secondary",
        disabled: false,
      },
      {
        label: "libellé du bouton 3",
        kind: "secondary",
        disabled: false,
      },
    ],
  }}
/>

<Story
  name="Tertiaire"
  args={{
    inline: true,
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "tertiary-no-outline",
        disabled: false,
      },
      {
        label: "libellé du bouton 2",
        kind: "tertiary-no-outline",
        disabled: false,
      },
      {
        label: "libellé du bouton 3",
        kind: "tertiary",
        disabled: false,
      },
    ],
  }}
/>

<Story
  name="Inverse"
  args={{
    ...buttonsGroupArgs,
    buttons: [
      {
        label: "libellé du bouton 1",
        kind: "inverted-primary",
        disabled: false,
        icon: "checkbox-circle-line",
      },
      {
        label: "libellé du bouton 2",
        kind: "inverted-secondary",
        disabled: false,
        icon: "checkbox-circle-line",
      },
    ],
  }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
