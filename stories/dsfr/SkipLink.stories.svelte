<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    skiplinkArgTypes,
    skiplinkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/skiplink/template/stories/skiplink-arg-types.js";

  import DsfrSkipLink from "$lib/dsfr/DsfrSkipLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Skiplink",
    component: DsfrSkipLink,
    argTypes: skiplinkArgTypes,
    args: skiplinkArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Les liens d’évitement permettent aux utilisateurs naviguant au clavier, ou équipés de lecteurs d'écran, d’accéder plus rapidement à des zones précises de la page.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/lien-d-evitement)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-skiplink"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSkipLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-skiplink items={args.items} aria-label={args.ariaLabel}></dsfr-skiplink>
{/snippet}

<Story name="Défaut" />
