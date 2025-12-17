<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrCheckbox>;
</script>

{#snippet template(args: Args)}
  <dsfr-checkbox
    id={args.id}
    label={args.label}
    name={args.name}
    size={args.size}
    hint={args.hint}
    disabled={args.disabled || undefined}
    checked={args.checked || undefined}
    value={args.value}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    form={args.form}
    required={args.required || undefined}
  ></dsfr-checkbox>
{/snippet}

<Story name="Défaut" />

<Story name="Un label avec un lien" args={{ ...checkboxArgs, label: undefined }}>
  {#snippet template(args: Args)}
    <dsfr-checkbox {...args}>
      Un label avec un&nbsp;<a href="https://google.fr" target="_blank">lien</a>
    </dsfr-checkbox>
  {/snippet}
</Story>
