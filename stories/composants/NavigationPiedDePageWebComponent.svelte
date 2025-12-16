<script lang="ts">
  interface Props {
    conforme?: boolean;
  }

  let { conforme }: Props = $props();
</script>

<lab-anssi-navigation-pied-de-page
  {conforme}
></lab-anssi-navigation-pied-de-page>
