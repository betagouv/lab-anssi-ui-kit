<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import CentreAide from "$lib/composants/CentreAide.svelte";
  import ConteneurStory from "./ConteneurStory.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/CentreAide",
    component: CentreAide,
    args: {
      nomService: "MonServiceSécurisé",
      liens: JSON.stringify([
        {
          texte: "💬 Nous contacter par chat",
          href: "https://aide.messervices.cyber.gouv.fr/fr/?chat=ouvert",
        },
        {
          texte: "🙌 Consulter la F.A.Q.",
          href: "https://aide.messervices.cyber.gouv.fr/fr",
        },
        {
          texte: "🎬 Faire une action 'custom'",
          preventDefault: true,
          id: "action-custom",
        },
      ]),
    },
    argTypes: {
      onlienclique: {
        description:
          "Déclenché au clic sur un lien du centre d'aide.<br>" +
          "`detail: { target: HTMLAnchorElement }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ target: HTMLAnchorElement }>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["lienclique"] },
    },
    render: template,
  });

  type Args = ComponentProps<CentreAide>;
</script>

{#snippet template(args: Args)}
  <ConteneurStory>
    <lab-anssi-centre-aide nom-service={args.nomService} liens={args.liens}></lab-anssi-centre-aide>
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
