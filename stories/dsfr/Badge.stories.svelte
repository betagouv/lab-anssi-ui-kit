<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    badgeArgs,
    badgeArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badge-arg-types.js";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Badge",
    component: DsfrBadge,
    argTypes: badgeArgTypes,
    args: badgeArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le composant badge permet de mettre en avant une information de type “statut” ou “état” sur un élément du site.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-badge"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBadge>;
</script>

{#snippet template(args: Args)}
  <dsfr-badge
    label={args.label}
    accent={args.accent}
    ellipsis={args.ellipsis || undefined}
    has-icon={args.hasIcon || undefined}
    has-no-icon={args.hasNoIcon || undefined}
    icon={args.icon}
    size={args.size}
    status={args.status}
    type={args.type}
  ></dsfr-badge>
{/snippet}

<Story name="Défaut" />

<Story
  name="Taille SM"
  args={{
    size: "sm",
  }}
/>

<Story name="Statuts">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-badge type="status" status="success"></dsfr-badge>
      <dsfr-badge type="status" status="warning"></dsfr-badge>
      <dsfr-badge type="status" status="error"></dsfr-badge>
      <dsfr-badge type="status" status="info"></dsfr-badge>
      <dsfr-badge type="status" status="new"></dsfr-badge>
    </div>
  {/snippet}
</Story>

<Story name="Statut sans icône">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-badge type="status" status="success" has-no-icon></dsfr-badge>
      <dsfr-badge type="status" status="warning" has-no-icon></dsfr-badge>
      <dsfr-badge type="status" status="error" has-no-icon></dsfr-badge>
      <dsfr-badge type="status" status="info" has-no-icon></dsfr-badge>
      <dsfr-badge type="status" status="new" has-no-icon></dsfr-badge>
    </div>
  {/snippet}
</Story>

<Story
  name="Accent"
  args={{
    type: "accent",
    accent: "green-menthe",
  }}
/>

<Story
  name="Ellipsis"
  args={{
    ellipsis: true,
    label:
      "Label très long qui sera tronqué lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus sit amet luctus",
  }}
/>
