<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ConteneurStory from "./ConteneurStory.svelte";
  import Navigation from "$lib/composants/suite-cyber/navigation/Navigation.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Navigation Suite Cyber",
    component: Navigation,
    args: {
      sourceUtm: "mon-service-lab-anssi",
    },
    render: template,
  });

  type Args = ComponentProps<Navigation>;
</script>

{#snippet template(args: Args)}
  <ConteneurStory alignement="droite">
    <lab-anssi-bouton-suite-cyber-navigation source-utm={args.sourceUtm}
    ></lab-anssi-bouton-suite-cyber-navigation>
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
