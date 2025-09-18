<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    selectArgTypes,
    selectArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/select/template/stories/select-arg-types.js";
  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Select",
    component: DsfrSelect,
    argTypes: selectArgTypes,
    args: selectArgs,
  });
</script>

<Story name="Défaut" />

<Story name="WebComponent">
  {#snippet template(args)}
    <dsfr-select
      id={args.id}
      value={args.value}
      grouped-options={args.groupedOptions}
      options={args.options}
      option-groups={args.optionGroups}
      hint={args.hint}
      placeholder={args.placeholder}
      placeholder-disabled={args.placeholderDisabled}
      disabled={args.disabled}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
    ></dsfr-select>
  {/snippet}
</Story>
