<script context="module">
  import ConteneurStory from "./ConteneurStory.svelte";
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
  <ConteneurStory alignement="droite">
    <LienDiagnosticCyber {...args} />
  </ConteneurStory>
</Template>

<Story name="Defaut" />
