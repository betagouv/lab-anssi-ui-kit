<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Reactions from "$lib/composants/Reactions.svelte";

  const { Story } = defineMeta({
    component: Reactions,
    title: "Composants/ANSSI/Reactions",
    args: {
      reactions: [
        { id: "1", emoji: "🔥", compteur: 9 },
        { id: "2", emoji: "❤️", compteur: 12, actif: true },
        { id: "3", emoji: "👍", compteur: 34 },
      ],
    },
  });
</script>

<Story name="Defaut" />
