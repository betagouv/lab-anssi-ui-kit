<script lang="ts">
  interface Props {
    fluid?: boolean;
  }

  let { fluid }: Props = $props();
</script>

<dsfr-container
  {fluid}
></dsfr-container>
