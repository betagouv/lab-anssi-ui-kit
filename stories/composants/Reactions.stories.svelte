<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Reactions from "$lib/composants/Reactions.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Reactions",
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
        description: "Callback appelé quand une réaction est ajoutée",
        control: false,
        table: { category: "Événements" },
      },
      onsupprimeReaction: {
        description: "Callback appelé quand une réaction est supprimée",
        control: false,
        table: { category: "Événements" },
      },
    },
    parameters: {
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
    onajouteReaction={args.onajouteReaction}
    onsupprimeReaction={args.onsupprimeReaction}
  ></lab-anssi-reactions>
{/snippet}

<Story name="Defaut" />

<Story name="Variation tertiaire" args={{ variant: "tertiaire" }} />
