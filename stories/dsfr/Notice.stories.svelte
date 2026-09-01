<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    noticeArgs,
    noticeArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/notice/template/stories/notice-arg-types.js";

  import DsfrNotice from "$lib/dsfr/DsfrNotice.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Notice",
    component: DsfrNotice,
    args: noticeArgs,
    argTypes: noticeArgTypes,
    parameters: {
      docs: {
        description: {
          component:
            "Le bandeau d’information importante permet aux utilisateurs de voir ou d’accéder à une information importante et temporaire.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bandeau-d-information-importante)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-notice"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrNotice>;
</script>

{#snippet template(args: Args)}
  <dsfr-notice
    title={args.title}
    has-description={args.hasDescription || undefined}
    desc={args.desc}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    type={args.type}
    markup={args.markup}
    notice={args.notice || undefined}
    dismissible={args.dismissible || undefined}
    has-link={args.hasLink || undefined}
    link-label={args.linkLabel}
    link-title={args.linkTitle}
    link-href={args.linkHref}
    blank={args.blank || undefined}
    button-label={args.buttonLabel}
  ></dsfr-notice>
{/snippet}

<Story name="Défaut" />

<Story
  name="Information"
  args={{
    type: "info",
    title: "Titre du bandeau d'information importante",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Avertissement"
  args={{
    type: "warning",
    title: "Titre du bandeau d'avertissement",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Alerte"
  args={{
    type: "alert",
    title: "Titre du bandeau d'alerte",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Météo orange"
  args={{
    type: "weather-orange",
    title: "Vigilance météo orange",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
  }}
/>

<Story
  name="Météo rouge"
  args={{
    type: "weather-red",
    title: "Vigilance météo rouge",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Météo violet"
  args={{
    type: "weather-purple",
    title: "Vigilance météo violette",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Attaque"
  args={{
    type: "attack",
    title: "Attentat en cours",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Témoin"
  args={{
    type: "witness",
    title: "Appel à témoins",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>

<Story
  name="Cyberattaque"
  args={{
    type: "cyberattack",
    title: "Cyber-attaque",
    desc: "Texte de description lorem ipsum sit consectetur adipiscing elit.",
    hasLink: true,
    blank: true,
    dismissible: true,
  }}
/>
