<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    badgesGroupArgTypes,
    badgesGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badges-group-arg-types.js";

  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Badges Group",
    component: DsfrBadgesGroup,
    argTypes: badgesGroupArgTypes,
    args: badgesGroupArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le composant badge permet de mettre en avant une information de type “statut” ou “état” sur un élément du site.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-badges-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBadgesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-badges-group badges={args.badges} size={args.size} group-markup={args.groupMarkup}
  ></dsfr-badges-group>
{/snippet}

<Story name="Défaut" />

<Story
  name="Taille MD"
  args={{
    size: "md",
    badges: [
      {
        label: "libellé badge 1",
        type: "accent",
        accent: "green-bourgeon",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 2",
        type: "accent",
        accent: "green-menthe",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 3",
        type: "accent",
        accent: "blue-ecume",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
    ],
  }}
/>

<Story
  name="Taille SM"
  args={{
    size: "sm",
    badges: [
      {
        label: "libellé badge 1",
        type: "accent",
        accent: "green-bourgeon",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 2",
        type: "accent",
        accent: "green-menthe",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 3",
        type: "accent",
        accent: "blue-ecume",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
    ],
  }}
/>
