<script module lang="ts">
  import { defineMeta, type StoryContext } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ConteneurStory from "./legacy/ConteneurStory.svelte";
  import SuiteCyber from "$lib/composants/suite-cyber/SuiteCyber.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Suite Cyber",
    component: SuiteCyber,
    render: template,
  });

  type Args = ComponentProps<SuiteCyber>;
</script>

{#snippet template(args: Args, context: StoryContext<Args>)}
  {console.log(JSON.stringify(context.globals))}

  <ConteneurStory alignement="droite">
    <lab-anssi-bouton-suite-cyber-navigation
      source-utm={context.globals.theme || "MonServiceSécurisé"}
    ></lab-anssi-bouton-suite-cyber-navigation>
  </ConteneurStory>
{/snippet}

<Story name="Defaut" />
