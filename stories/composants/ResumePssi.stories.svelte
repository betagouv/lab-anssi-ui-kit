<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import ResumePssi from "$lib/composants/ResumePssi.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/ResumePssi",
    component: ResumePssi,
    args: {
      nomService: "MonService",
    },
    argTypes: {
      nomService: { control: "text", description: "Le nom du service" },
    },
    render: template,
  });

  type Args = ComponentProps<ResumePssi>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-resume-pssi nom-service={args.nomService}></lab-anssi-resume-pssi>
{/snippet}

<Story name="Defaut" />
