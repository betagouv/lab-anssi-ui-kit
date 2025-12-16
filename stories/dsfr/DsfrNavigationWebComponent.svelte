<script lang="ts">
  interface Props {
    id: string;
    ariaLabel: string;
    items: MenuItem[];
  }

  let { id, ariaLabel, items }: Props = $props();
</script>

<dsfr-navigation
  {id}
  aria-label={ariaLabel}
  {items}
></dsfr-navigation>
