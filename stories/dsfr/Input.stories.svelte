<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Input",
    component: DsfrInput,
    argTypes: inputArgTypes,
    args: inputArgs,
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-input
      id={args.id}
      label={args.label}
      hint={args.hint}
      type={args.type}
      icon={args.icon}
      value={args.value}
      placeholder={args.placeholder}
      name={args.name}
      autocomplete={args.autocomplete}
      disabled={args.disabled}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
    ></dsfr-input>
  {/snippet}
</Story>
