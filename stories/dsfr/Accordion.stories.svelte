<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    accordionArgs,
    accordionArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/accordion/template/stories/accordion-arg-types.js";

  import DsfrAccordion from "$lib/dsfr/DsfrAccordion.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Accordion",
    component: DsfrAccordion,
    args: { ...accordionArgs, titleMarkupLevel: 4 },
    argTypes: {
      ...accordionArgTypes,
      default: {
        description: "Contenu de l'accordéon (remplace la prop `content`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            "L'accordéon permet aux utilisateurs d'afficher et de masquer des sections de contenu présentés dans une page.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/accordeon)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-accordion"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrAccordion>;
</script>

{#snippet template(args: Args)}
  <dsfr-accordion
    is-expanded={args.isExpanded || undefined}
    id={args.id}
    label={args.label}
    content={args.content}
    title-markup-level={args.titleMarkupLevel}
  >
    {@html args.content}
  </dsfr-accordion>
{/snippet}

<Story name="Défaut" />
