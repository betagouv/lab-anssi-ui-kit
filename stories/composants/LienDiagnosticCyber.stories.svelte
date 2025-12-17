<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ConteneurStory from "./ConteneurStory.svelte";
  import LienDiagnosticCyber from "$lib/composants/mes-services-cyber/lien/LienDiagnosticCyber.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Lien Diagnostic Cyber",
    component: LienDiagnosticCyber,
    args: {
      lien: "#",
      versExterne: false,
    },
    render: template,
  });

  type Args = ComponentProps<LienDiagnosticCyber>;
</script>

{#snippet template(args: Args)}
  <ConteneurStory alignement="droite">
    <lab-anssi-mes-services-cyber-lien-diagnostic-cyber
      lien={args.lien}
      vers-externe={args.versExterne || undefined}
    ></lab-anssi-mes-services-cyber-lien-diagnostic-cyber>
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
