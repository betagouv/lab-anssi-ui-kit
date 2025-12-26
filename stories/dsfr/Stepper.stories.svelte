<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrStepper>;
</script>

{#snippet template(args: Args)}
  <dsfr-stepper
    title={args.title}
    next-step={args.nextStep}
    current-step={args.currentStep}
    step-count={args.stepCount}
    level={args.level}
  ></dsfr-stepper>
{/snippet}

<Story name="Défaut" />
