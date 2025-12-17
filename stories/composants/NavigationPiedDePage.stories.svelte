<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import NavigationPiedDePage from "$lib/composants/pied-de-page/NavigationPiedDePage.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/NavigationPiedDePage",
    component: NavigationPiedDePage,
    args: {
      conforme: false,
    },
    argTypes: {
      conforme: {
        description: "Indique si la navigation est conforme ou non conforme.",
        control: "boolean",
      },
    },
    render: template,
  });

  type Args = ComponentProps<NavigationPiedDePage>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-navigation-pied-de-page conforme={args.conforme || undefined}
  ></lab-anssi-navigation-pied-de-page>
{/snippet}

<Story name="Defaut" />

<Story name="Conforme" args={{ conforme: true }} />
