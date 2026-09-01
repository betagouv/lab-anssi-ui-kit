<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    linkArgTypes,
    linkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/link/template/stories/link-arg-types.js";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Link",
    component: DsfrLink,
    argTypes: {
      ...linkArgTypes,
      neutral: {
        control: "boolean",
        description: "Affiche le lien dans une teinte neutre",
        type: {
          value: "boolean",
        },
      },
    },
    args: linkArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le lien permet la navigation entre une page et un autre contenu au sein de la même page, du même site ou externe. Pour les actions d’un autre type - comme la soumission d’un formulaire - il faut utiliser le composant bouton.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/lien)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-link"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-link
    label={args.label}
    size={args.size}
    id={args.id}
    disabled={args.disabled || undefined}
    blank={args.blank || undefined}
    title={args.title}
    href={args.href}
    download={args.download || undefined}
    detail={args.detail}
    hreflang={args.hreflang}
    assess={args.assess || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    icon-place={args.iconPlace}
    neutral={args.neutral || undefined}
  ></dsfr-link>
{/snippet}

<Story name="Défaut" />

<Story name="Lien texte (neutre)">
  {#snippet template(_args: Args)}
    <p>
      Lorem [...] elit, <dsfr-link label="lien interne" href="#" neutral></dsfr-link> incididunt [...]
      morbi.
    </p>
  {/snippet}
</Story>

<Story name="Icône">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-link
        label={linkArgs.label}
        href={linkArgs.href}
        has-icon
        icon="arrow-left-line"
        icon-place="left"
      ></dsfr-link>
      <dsfr-link
        label={linkArgs.label}
        href={linkArgs.href}
        has-icon
        icon="arrow-right-line"
        icon-place="right"
      ></dsfr-link>
    </div>
  {/snippet}
</Story>

<Story name="Tailles">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="sm"></dsfr-link>
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="md"></dsfr-link>
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="lg"></dsfr-link>
    </div>
  {/snippet}
</Story>

<Story name="Désactivé" args={{ ...linkArgs, disabled: true }} />

<Story
  name="Téléchargement"
  args={{
    ...linkArgs,
    label: "Télécharger le document lorem ipsum sit dolores amet",
    href: "img/image.jpg",
    download: true,
    detail: "JPG – 61,88 ko",
  }}
/>

<Story name="Externe" args={{ ...linkArgs, blank: true }} />

<Story
  name="Retour en haut"
  args={{
    ...linkArgs,
    label: "Haut de page",
    href: "#top",
    hasIcon: true,
    icon: "arrow-up-fill",
    iconPlace: "left",
  }}
/>
