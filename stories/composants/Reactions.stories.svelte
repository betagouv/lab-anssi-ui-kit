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
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Les boutons de réaction sont rendus", async () => {
      const buttons = el?.shadowRoot?.querySelectorAll("button");
      await expect(buttons?.length).toBeGreaterThan(0);
    });
    await step("Les compteurs de réaction sont affichés", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("9");
      await expect(el?.shadowRoot?.textContent).toContain("12");
      await expect(el?.shadowRoot?.textContent).toContain("34");
    });
    await step("Le bouton d'ajout de réaction est présent", async () => {
      const trigger = el?.shadowRoot?.querySelector("button[popovertarget]");
      await expect(trigger).toBeTruthy();
    });
    await step("La réaction active a l'attribut aria-pressed", async () => {
      const activeButton = el?.shadowRoot?.querySelector('[aria-pressed="true"]');
      await expect(activeButton).toBeTruthy();
    });
  }}
/>

<Story name="Variation tertiaire" args={{ variant: "tertiaire" }} />
