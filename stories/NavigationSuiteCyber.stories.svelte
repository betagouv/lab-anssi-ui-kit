<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import ConteneurStory from "./ConteneurStory.svelte";
  import Navigation from "$lib/suite-cyber/navigation/Navigation.svelte";

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/form/form.min.css";
  import "@gouvfr/dsfr/dist/component/select/select.min.css";


  const { Story } = defineMeta({
    title: "Composants/ANSSI/Navigation Suite Cyber",
    component: Navigation,
    args: {
      sourceUtm: "mon-service-lab-anssi",
    },
  });
</script>

{#snippet template(args)}
  <ConteneurStory alignement="droite">
    <Navigation {...args} />
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
