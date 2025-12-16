<script lang="ts">
  interface Props {
    title: string;
    nextStep: string;
    currentStep: number;
    stepCount: number;
    level?: Level;
  }

  let { title, nextStep, currentStep, stepCount, level }: Props = $props();
</script>

<dsfr-stepper
  {title}
  next-step={nextStep}
  current-step={currentStep}
  step-count={stepCount}
  {level}
></dsfr-stepper>
