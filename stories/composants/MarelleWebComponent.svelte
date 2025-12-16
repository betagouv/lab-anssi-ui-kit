<script lang="ts">
  interface Props {
    titre?: string;
    etapesmarelle?: EtapeMarelle[];
    action: Action;
  }

  let { titre, etapesmarelle, action }: Props = $props();
</script>

<lab-anssi-marelle
  {titre}
  {etapesmarelle}
  {action}
></lab-anssi-marelle>
