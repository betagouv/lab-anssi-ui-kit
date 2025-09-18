<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

  const args = { ...inputArgs, rows: 6 };

  const { Story } = defineMeta({
    title: "Composants/dsfr/Textarea",
    component: DsfrTextarea,
    argTypes: inputArgTypes,
    args,
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-textarea
      id={args.id}
      label={args.label}
      hint={args.hiny}
      icon={args.icon}
      value={args.value}
      placeholder={args.placeholder}
      name={args.name}
      autocomplete={args.autocomplete}
      disabled={args.disabled}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
      rows={args.rows}
    ></dsfr-textarea>
  {/snippet}
</Story>
