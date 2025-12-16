<script lang="ts">
  interface Props {
    titre: string;
    raisons: string[];
    action?: Action | undefined;
    illustration: Image;
  }

  let { titre, raisons, action, illustration }: Props = $props();
</script>

<lab-anssi-brique-rejoindre-la-communaute
  {titre}
  {raisons}
  {action}
  {illustration}
></lab-anssi-brique-rejoindre-la-communaute>
