<script context="module">
  import StoryConteneur from "./StoryConteneur.svelte";
  import LienDiagnosticCyber from "$lib/mes-services-cyber/lien/LienDiagnosticCyber.svelte";

  export const meta = {
    title: "Composants/Lien Diagnostic Cyber",
    component: LienDiagnosticCyber,
    args: {
      lien: "#",
      versExterne: false,
    },
  };
</script>

<script>
  import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
  <StoryConteneur align="right">
    <LienDiagnosticCyber {...args} />
  </StoryConteneur>
</Template>

<Story name="Defaut" />
