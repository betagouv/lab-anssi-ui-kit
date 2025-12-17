<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import AncresParcours from "$lib/composants/AncresParcours.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Ancres Parcours",
    component: AncresParcours,
    args: {
      ancres: [
        { label: "Section 1", cible: "#section1" },
        { label: "Section 2", cible: "#section2" },
        { label: "Section 3", cible: "#section3" },
      ],
      indexActif: 0,
    },
    render: template,
  });

  type Args = ComponentProps<AncresParcours>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-ancres ancres={args.ancres} index-actif={args.indexActif}></lab-anssi-ancres>
{/snippet}

<Story name="Defaut" />
