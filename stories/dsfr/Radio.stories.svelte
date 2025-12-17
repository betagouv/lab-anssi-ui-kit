<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrRadio>;
</script>

{#snippet template(args: Args)}
  <dsfr-radio
    id={args.id}
    name={args.name}
    label={args.label}
    value={args.value}
    size={args.size}
    hint={args.hint}
    rich={args.rich || undefined}
    has-pictogram={args.hasPictogram || undefined}
    pictogram-name={args.pictogramName}
    pictogram-accent={args.pictogramAccent}
    disabled={args.disabled || undefined}
    form={args.form}
    required={args.required || undefined}
  ></dsfr-radio>
{/snippet}

<Story name="Défaut" />
