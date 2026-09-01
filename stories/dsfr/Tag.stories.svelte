<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tagArgs,
    tagArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/tag/template/stories/tag-arg-types.js";

  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Tag",
    component: DsfrTag,
    argTypes: {
      ...tagArgTypes,
      onselected: {
        description: "Déclenché lorsque le tag est sélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onunselected: {
        description: "Déclenché lorsque le tag est désélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: tagArgs,
    parameters: {
      actions: { handles: ["selected", "unselected"] },
      docs: {
        description: {
          component:
            "Le tag catégorise/classe/organise les contenus à l'aide de mots-clés. Il aide les utilisateurs à rechercher et à trouver facilement une information.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tag)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-tag"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTag>;
</script>

{#snippet template(args: Args)}
  <dsfr-tag
    label={args.label}
    type={args.type}
    size={args.size}
    href={args.href}
    blank={args.blank || undefined}
    title={args.title}
    pressed={args.pressed || undefined}
    disabled={args.disabled || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    accent={args.accent}
  ></dsfr-tag>
{/snippet}

<Story name="Défaut" />

<Story
  name="Taille MD"
  args={{
    size: "md",
  }}
/>

<Story
  name="Taille SM"
  args={{
    size: "sm",
  }}
/>

<Story
  name="Avec icône"
  args={{
    hasIcon: true,
    icon: "arrow-right-line",
  }}
/>

<Story
  name="Cliquable"
  args={{
    type: "clickable",
    size: "md",
  }}
/>

<Story
  name="Cliquable taille SM"
  args={{
    type: "clickable",
    size: "sm",
  }}
/>

<Story
  name="Cliquable avec icône"
  args={{
    type: "clickable",
    hasIcon: true,
    icon: "arrow-right-line",
  }}
/>

<Story name="Cliquable accent">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="clickable" size="md" href="[URL - à modifier]"></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="clickable"
        size="md"
        href="[URL - à modifier]"
        accent="green-menthe"
      ></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="clickable"
        size="md"
        href="[URL - à modifier]"
        accent="yellow-moutarde"
      ></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story name="Pressable">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="md"></dsfr-tag>
      <dsfr-tag label="libellé tag" type="pressable" size="md" pressed></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story name="Pressable taille SM">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="sm"></dsfr-tag>
      <dsfr-tag label="libellé tag" type="pressable" size="sm" pressed></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story name="Pressable avec icône">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-tag label="libellé tag" type="pressable" size="sm" has-icon icon="arrow-right-line"
      ></dsfr-tag>
      <dsfr-tag
        label="libellé tag"
        type="pressable"
        size="sm"
        has-icon
        icon="arrow-right-line"
        pressed
      ></dsfr-tag>
    </div>
  {/snippet}
</Story>

<Story
  name="Fermable"
  args={{
    type: "dismissible",
    size: "md",
  }}
/>

<Story
  name="Fermable taille SM"
  args={{
    type: "dismissible",
    size: "sm",
  }}
/>
