<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrButtonsGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-buttons-group
    size={args.size}
    has-icon={args.hasIcon}
    icon-place={args.iconPlace}
    group-markup={args.groupMarkup}
    inline={args.inline}
    equisized={args.equisized || undefined}
    align={args.align}
    reverse={args.reverse || undefined}
    buttons={args.buttons}
  ></dsfr-buttons-group>
{/snippet}

<Story name="Défaut" />
