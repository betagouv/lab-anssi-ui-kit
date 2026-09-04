<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    shareArgTypes,
    shareArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/share/template/stories/share-arg-types.js";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  import DsfrShare from "$lib/dsfr/DsfrShare.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Share",
    component: DsfrShare,
    argTypes: {
      ...shareArgTypes,
    },
    args: shareArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le composant de partage permet à l'utilisateur de partager la page sur les réseaux sociaux, par email ou de copier le lien dans le presse-papier.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/partage)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-share"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrShare>;
</script>

{#snippet template(args: Args)}
  <dsfr-share
    title={args.title}
    buttons={args.buttons}
    disabled={args.disabled || undefined}
    text={args.text}
  >
    {#if args.hasText}
      <span slot="text">
        Veuillez <DsfrLink neutral href="#" label="autoriser le dépôt de cookies" /> pour partager sur
        Facebook, Twitter, Bluesky et LinkedIn.
      </span>
    {/if}
  </dsfr-share>
{/snippet}

<Story name="Défaut" />

<Story
  name="Désactivé"
  args={{
    disabled: true,
    hasText: true,
  }}
/>
