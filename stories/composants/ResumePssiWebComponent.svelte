<script lang="ts">
  interface Props {
    nomService: string;
  }

  let { nomService }: Props = $props();
</script>

<lab-anssi-resume-pssi
  nom-service={nomService}
></lab-anssi-resume-pssi>
