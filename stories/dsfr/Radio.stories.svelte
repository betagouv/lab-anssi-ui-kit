<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    radioArgTypes,
    radioArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radio-arg-types.js";
  import DsfrRadio from "$lib/dsfr/DsfrRadio.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Radio",
    component: DsfrRadio,
    argTypes: radioArgTypes,
    args: radioArgs,
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-radio
      id={args.id}
      name={args.name}
      label={args.label}
      value={args.value}
      size={args.size}
      hint={args.hint}
      rich={args.rich}
      has-pictogram={args.hasPictogram}
      pictogram-name={args.pictogramName}
      pictogram-accent={args.pictogramAccent}
      disabled={args.disabled}
    ></dsfr-radio>
  {/snippet}
</Story>
