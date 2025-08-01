<script context="module">
  import StoryConteneur from "./StoryConteneur.svelte";
  import Navigation from "$lib/suite-cyber/navigation/Navigation.svelte";

  export const meta = {
    title: "Composants/Navigation Suite Cyber",
    component: Navigation,
    args: {
      sourceUtm: "mon-service-lab-anssi",
    },
  };
</script>

<script>
  import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
  <StoryConteneur align="right">
    <Navigation {...args} />
  </StoryConteneur>
</Template>

<Story name="Defaut" />
