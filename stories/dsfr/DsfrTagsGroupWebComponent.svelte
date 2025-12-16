<script lang="ts">
  interface Props {
    tags: Tag[];
    type?: "default" | "clickable" | "pressable" | "dismissible";
    size?: TagsGroupSize;
    groupMarkup?: GroupMarkup;
    hasIcon?: boolean;
  }

  let { tags, type, size, groupMarkup, hasIcon }: Props = $props();
</script>

<dsfr-tags-group
  {tags}
  {type}
  {size}
  group-markup={groupMarkup}
  has-icon={hasIcon}
></dsfr-tags-group>
