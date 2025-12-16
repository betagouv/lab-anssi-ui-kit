<script lang="ts">
  interface Props {
    sourceUtm?: string;
  }

  let { sourceUtm }: Props = $props();
</script>

<lab-anssi-bouton-suite-cyber-navigation
  source-utm={sourceUtm}
></lab-anssi-bouton-suite-cyber-navigation>
