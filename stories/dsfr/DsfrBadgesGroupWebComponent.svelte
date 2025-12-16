<script lang="ts">
  interface Props {
    badges: Badge[];
    size?: BadgesGroupSize;
    groupMarkup?: GroupMarkup;
  }

  let { badges, size, groupMarkup }: Props = $props();
</script>

<dsfr-badges-group
  {badges}
  {size}
  group-markup={groupMarkup}
></dsfr-badges-group>
