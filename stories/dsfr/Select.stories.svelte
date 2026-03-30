<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

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
      default: {
        description: "Options `<option>` personnalisées (remplace les options générées par la prop `options`)",
        control: false,
        table: { category: "Slots" },
      },
      onvaluechanged: {
        description: "Callback appelé lors du changement de valeur",
        control: false,
        table: { category: "Événements" },
      },
    },
    args: selectArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-select"),
        },
      },
    },
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
    onvaluechanged={args.onvaluechanged}
  ></dsfr-select>
{/snippet}

<Story name="Défaut" />
