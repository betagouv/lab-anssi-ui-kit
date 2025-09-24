<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    stepperArgTypes,
    stepperArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/stepper/template/stories/stepper-arg-types.js";
  import DsfrStepper from "$lib/dsfr/DsfrStepper.svelte";

  delete stepperArgTypes.markup;
  delete stepperArgs.markup;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Stepper",
    component: DsfrStepper,
    argTypes: stepperArgTypes,
    args: stepperArgs,
  });
</script>

<Story name="Défaut" />
