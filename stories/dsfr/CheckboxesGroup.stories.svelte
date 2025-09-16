<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    checkboxesGroupArgs,
    checkboxesGroupArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkboxes-group-arg-types.js";
  import DsfrCheckboxesGroup from "$lib/dsfr/DsfrCheckboxesGroup.svelte";

  const args = {
    ...checkboxesGroupArgs,
    checkboxes: [
      {
        id: "chk1",
        value: "valeur1",
        label: "Checkbox 1",
      },
      {
        id: "chk2",
        value: "valeur2",
        label: "Checkbox 2",
        hint: "Aide additionnelle",
      },
      {
        id: "chk3",
        value: "valeur3",
        label: "Checkbox 3",
      },
    ],
  };

  const { Story } = defineMeta({
    title: "Composants/dsfr/Checkboxes Group",
    component: DsfrCheckboxesGroup,
    argTypes: checkboxesGroupArgTypes,
    args,
  });
</script>

<Story name="Défaut" />
