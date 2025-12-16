<script lang="ts">
  interface Props {
    items: Link[];
    ariaLabel?: string;
  }

  let { items, ariaLabel }: Props = $props();
</script>

<dsfr-skiplink
  {items}
  aria-label={ariaLabel}
></dsfr-skiplink>
