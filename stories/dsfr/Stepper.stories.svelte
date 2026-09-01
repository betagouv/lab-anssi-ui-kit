<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    stepperArgTypes,
    stepperArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/stepper/template/stories/stepper-arg-types.js";

  import DsfrStepper from "$lib/dsfr/DsfrStepper.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  delete stepperArgTypes.markup;
  delete stepperArgs.markup;

  const { Story } = defineMeta({
    title: "Composants/DSFR/Stepper",
    component: DsfrStepper,
    argTypes: stepperArgTypes,
    args: { ...stepperArgs, hideDetails: false },
    parameters: {
      docs: {
        description: {
          component:
            "L’indicateur d'étape permet d’indiquer à l’utilisateur où il se trouve dans un formulaire ou dans une démarche.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/indicateur-d-etapes)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-stepper"),
        },
      },
    },
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
    hide-details={args.hideDetails || undefined}
  ></dsfr-stepper>
{/snippet}

<Story name="Défaut" />
