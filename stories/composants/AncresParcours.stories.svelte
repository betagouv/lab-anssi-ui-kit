<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import AncresParcours from "$lib/composants/AncresParcours.svelte";

  const { Story } = defineMeta({
    component: AncresParcours,
    title: "Composants/ANSSI/Ancres Parcours",
    args: {
      ancres: [
        { label: "Section 1", cible: "#section1" },
        { label: "Section 2", cible: "#section2" },
        { label: "Section 3", cible: "#section3" },
      ],
      indexActif: 0,
    },
  });
</script>

<Story name="Defaut" />
