<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Reactions from "$lib/composants/Reactions.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Reactions",
    component: Reactions,
    args: {
      reactions: [
        { id: "1", emoji: "🔥", compteur: 9 },
        { id: "2", emoji: "❤️", compteur: 12, actif: true },
        { id: "3", emoji: "👍", compteur: 34 },
      ],
      variant: "tertiaire-sans-bordure",
      tooltipTexte: "Ajouter une réaction",
      tooltipId: "tooltipReactions",
    },
    argTypes: {
      onajouteReaction: {
        description: "Déclenché lorsqu'une réaction est ajoutée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onsupprimeReaction: {
        description: "Déclenché lorsqu'une réaction est retirée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["ajouteReaction", "supprimeReaction"] },
      layout: "centered",
    },
    render: template,
  });

  type Args = ComponentProps<Reactions>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-reactions
    reactions={args.reactions}
    variant={args.variant}
    tooltip-texte={args.tooltipTexte}
    tooltip-id={args.tooltipId}
  ></lab-anssi-reactions>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-reactions");
    await step("Les boutons de réaction sont rendus", async () => {
      const buttons = el?.shadowRoot?.querySelectorAll("button");
      await expect(buttons?.length).toBeGreaterThan(0);
    });
    await step("La classe de variante est appliquée", async () => {
      const container = el?.shadowRoot?.querySelector(
        ".lab-anssi-reactions--tertiaire-sans-bordure",
      );
      await expect(container).toBeTruthy();
    });
    await step("Les compteurs de réaction sont affichés", async () => {
      const compteurs = el?.shadowRoot?.querySelectorAll(".lab-anssi-reactions__compteur");
      await expect(compteurs?.length).toBeGreaterThan(0);
    });
    await step("Le bouton déclencheur est présent", async () => {
      const trigger = el?.shadowRoot?.querySelector(".lab-anssi-reactions__declencheur");
      await expect(trigger).toBeTruthy();
    });
    await step("La réaction active a l'attribut aria-pressed", async () => {
      const activeButton = el?.shadowRoot?.querySelector('[aria-pressed="true"]');
      await expect(activeButton).toBeTruthy();
    });
  }}
/>

<Story name="Variation tertiaire" args={{ variant: "tertiaire" }} />
