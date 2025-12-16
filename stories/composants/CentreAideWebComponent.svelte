<script lang="ts">
  interface Props {
    nomService: string;
    liens: string;
  }

  let { nomService, liens }: Props = $props();
</script>

<lab-anssi-centre-aide
  nom-service={nomService}
  {liens}
></lab-anssi-centre-aide>
