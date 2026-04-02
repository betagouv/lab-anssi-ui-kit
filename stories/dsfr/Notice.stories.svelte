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
    title: "Composants/dsfr/Notice",
    component: DsfrNotice,
    args: noticeArgs,
    argTypes: noticeArgTypes,
    parameters: {
      docs: {
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
  name="Avec description"
  args={{
    type: "info",
    title: "Titre du bandeau",
    hasDescription: true,
    desc: "Texte de description du bandeau d'information.",
  }}
/>

<Story
  name="Info"
  args={{
    type: "info",
    title: "Titre du bandeau d'information",
  }}
/>

<Story
  name="Warning"
  args={{
    type: "warning",
    title: "Titre du bandeau d'avertissement",
  }}
/>

<Story
  name="Alert"
  args={{
    type: "alert",
    title: "Titre du bandeau d'alerte",
  }}
/>

<Story
  name="Avec lien"
  args={{
    type: "info",
    title: "Titre du bandeau",
    hasLink: true,
    linkLabel: "Lien de consultation",
    linkHref: "#",
    linkTitle: "Consulter - nouvelle fenêtre",
    linkBlank: true,
  }}
/>

<Story
  name="Dismissible"
  args={{
    type: "info",
    title: "Titre du bandeau",
    dismissible: true,
    buttonCloseLabel: "Masquer le message",
  }}
/>

<Story
  name="Sans icône"
  args={{
    type: "info",
    title: "Titre du bandeau sans icône",
    hasIcon: false,
  }}
/>

<Story
  name="Vigilance météo orange"
  args={{
    type: "weather-orange",
    title: "Vigilance météo orange",
  }}
/>

<Story
  name="Vigilance météo rouge"
  args={{
    type: "weather-red",
    title: "Vigilance météo rouge",
  }}
/>

<Story
  name="Vigilance météo violette"
  args={{
    type: "weather-purple",
    title: "Vigilance météo violette",
  }}
/>

<Story
  name="Appel à témoins"
  args={{
    type: "witness",
    title: "Appel à témoins",
  }}
/>

<Story
  name="Enlèvement"
  args={{
    type: "kidnapping",
    title: "Alerte enlèvement",
  }}
/>

<Story
  name="Attentat"
  args={{
    type: "attack",
    title: "Attentat en cours",
  }}
/>

<Story
  name="Cyberattaque"
  args={{
    type: "cyberattack",
    title: "Cyberattaque en cours",
  }}
/>
