<script module lang="ts">
  import { expect, userEvent } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import CentreAide from "$lib/composants/CentreAide.svelte";
  import ConteneurStory from "./legacy/ConteneurStory.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Centre d'aide",
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

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-centre-aide");

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le centre d'aide s'ouvre au clic sur le déclencheur", async () => {
      const button = el?.shadowRoot?.querySelector("button");
      await userEvent.click(button!);

      const text = el?.shadowRoot?.textContent;
      await expect(text).toContain("Centre d'aide");
    });

    await step("Le panneau affiche le message de bienvenue", async () => {
      const text = el?.shadowRoot?.textContent;
      await expect(text).toContain("Bonjour");
    });
  }}
/>
