<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import MultiSelect from "$lib/composants/MultiSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/MultiSelect",
    component: MultiSelect,
    args: {
      id: "multi-select-1",
      label: "Label du multi-select",
      hint: "Hint du multi-select",
      placeholder: "Sélectionnez une valeur",
      options: [
        { id: "option1", value: "option1", label: "Option 1" },
        { id: "option2", value: "option2", label: "Option 2" },
        { id: "option3", value: "option3", label: "Option 3" },
      ],
      values: ["option2"],
      disabled: false,
      required: false,
      errorMessage: "",
    },
    argTypes: {
      values: {
        control: { type: "array" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<MultiSelect>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-multi-select
    id={args.id}
    label={args.label}
    options={args.options}
    hint={args.hint}
    placeholder={args.placeholder}
    disabled={args.disabled || undefined}
    values={args.values}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
  ></lab-anssi-multi-select>
{/snippet}

<Story name="Defaut" />

<Story name="Désactivé" args={{ disabled: true }} />
