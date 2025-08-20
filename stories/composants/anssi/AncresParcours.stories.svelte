<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Ancres from "$lib/composants/AncresParcours.svelte";

  const { Story } = defineMeta({
    component: Ancres,
    title: "Composants/ANSSI/Ancres",
    args: {
      ancres: [
        { label: "Section 1", anchor: "#section1" },
        { label: "Section 2", anchor: "#section2" },
        { label: "Section 3", anchor: "#section3" },
      ],
      indexActif: 0,
    },
  });
</script>

<Story name="Défaut" />
