<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    buttonsGroupArgTypes,
    buttonsGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/buttons-group-arg-types.js";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Buttons Group",
    component: DsfrButtonsGroup,
    argTypes: buttonsGroupArgTypes,
    args: {
      ...buttonsGroupArgs,
      buttons: [
        {
          label: "libellé du bouton 1",
          kind: "primary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 2",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "libellé du bouton 3",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
      ],
    },
  });
</script>

<Story name="Défaut" />
