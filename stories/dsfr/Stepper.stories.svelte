<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
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

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-stepper");
    const shadow = el?.shadowRoot;
    const { currentStep, stepCount, nextStep } = args as unknown as {
      currentStep: number;
      stepCount: number;
      nextStep: string;
    };

    await step("Le titre de l'étape est affiché", async () => {
      const title = shadow?.querySelector(".fr-stepper__title");

      await expect(title?.textContent).toContain(args.title);
    });

    await step("L'état de l'étape correspond aux données", async () => {
      const state = shadow?.querySelector(".fr-stepper__state");

      await expect(state?.textContent?.trim()).toBe(`Étape ${currentStep} sur ${stepCount}`);
    });

    await step("La barre de progression a les bons attributs", async () => {
      const steps = shadow?.querySelector(".fr-stepper__steps");

      await expect(steps?.getAttribute("data-fr-current-step")).toBe(String(currentStep));
      await expect(steps?.getAttribute("data-fr-steps")).toBe(String(stepCount));
    });

    await step("Les détails de l'étape suivante sont affichés", async () => {
      const details = shadow?.querySelector(".fr-stepper__details");

      await expect(details?.textContent).toContain(nextStep);
    });
  }}
/>
