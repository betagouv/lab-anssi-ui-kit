<svelte:options
  customElement={{
    tag: "dsfr-stepper",
    props: {
      title: { attribute: "title", type: "String" },
      nextStep: { attribute: "next-step", type: "String" },
      currentStep: { attribute: "current-step", type: "Number" },
      stepCount: { attribute: "step-count", type: "Number" },
      level: { attribute: "level", type: "Number" },
    },
  }}
/>

<script lang="ts">
  type Markup = "h2" | "h3" | "h4" | "h5";
  type Level = 2 | 3 | 4 | 5;
  interface Props {
    /** Titre de l'indicateur d'étapes */
    title: string;
    /** Titre de la prochaine étape */
    nextStep: string;
    /** Numéro de l'étape courrante */
    currentStep: number;
    /** Nombre d'étapes */
    stepCount: number;
    /** Niveau du titre (défaut: 2) */
    level?: Level;
  }

  let { title, nextStep, currentStep, stepCount, level = 2 }: Props = $props();
  let markup: Markup = $derived.by(
    () => ([2, 3, 4, 5].includes(level) ? `h${level}` : `h2`) as Markup,
  );
</script>

<div class="fr-stepper">
  <svelte:element this={markup} class="fr-stepper__title">
    {title}
    <span class="fr-stepper__state">Étape {currentStep} sur {stepCount}</span>
  </svelte:element>
  <div class="fr-stepper__steps" data-fr-current-step={currentStep} data-fr-steps={stepCount}></div>
  <p class="fr-stepper__details">
    <span class="fr-text--bold">Étape suivante :</span>
    {nextStep}
  </p>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/stepper/stepper.main.css";

  .fr-stepper {
    box-sizing: border-box;
  }
</style>
