<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    selectArgTypes,
    selectArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/select/template/stories/select-arg-types.js";

  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Select",
    component: DsfrSelect,
    argTypes: {
      ...selectArgTypes,
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message",
        options: ["default", "valid", "error", "info"],
        type: {
          value: "string",
        },
        table: { category: "message" },
      },
    },
    args: selectArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrSelect>;
</script>

{#snippet template(args: Args)}
  <dsfr-select
    id={args.id}
    label={args.label}
    value={args.value}
    grouped-options={args.groupedOptions || undefined}
    options={args.options}
    option-groups={args.optionGroups}
    hint={args.hint}
    placeholder={args.placeholder}
    placeholder-disabled={args.placeholderDisabled || undefined}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    info-message={args.infoMessage}
    form={args.form}
    required={args.required || undefined}
  ></dsfr-select>
{/snippet}

<Story name="Défaut" />
