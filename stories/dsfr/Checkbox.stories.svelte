<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";
  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Checkbox",
    component: DsfrCheckbox,
    argTypes: checkboxArgTypes,
    args: checkboxArgs,
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-checkbox
      id={args.id}
      label={args.label}
      name={args.name}
      size={args.size}
      hint={args.hint}
      disabled={args.disabled}
      checked={args.checked}
      value={args.value}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
    ></dsfr-checkbox>
  {/snippet}
</Story>
