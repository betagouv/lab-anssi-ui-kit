<script lang="ts">
  interface Props {
    lien: any;
    versExterne?: boolean;
  }

  let { lien, versExterne }: Props = $props();
</script>

<lab-anssi-mes-services-cyber-lien-diagnostic-cyber
  {lien}
  vers-externe={versExterne}
></lab-anssi-mes-services-cyber-lien-diagnostic-cyber>
