<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MultiSelect from "$lib/composants/MultiSelect.svelte";

  const { Story } = defineMeta({
    component: MultiSelect,
    title: "Composants/ANSSI/MultiSelect",
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
  });
</script>

<Story name="Defaut" />

<Story name="Désactivé" args={{ disabled: true }} />

<Story name="Petit" args={{ size: "sm" }} />
