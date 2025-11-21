<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import ConteneurStory from "./ConteneurStory.svelte";
  import LienDiagnosticCyber from "$lib/composants/mes-services-cyber/lien/LienDiagnosticCyber.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Lien Diagnostic Cyber",
    component: LienDiagnosticCyber,
    render: template,
    args: {
      lien: "#",
      versExterne: false,
    },
  });
</script>

{#snippet template(args)}
  <ConteneurStory alignement="droite">
    <LienDiagnosticCyber {...args} />
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
