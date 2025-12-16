<script lang="ts">
  interface Props {
    size?: ButtonsGroupSize;
    hasIcon?: boolean;
    iconPlace?: "only" | "left" | "right";
    groupMarkup?: "ul" | "div";
    inline?: "false" | "true" | "sm" | "md" | "lg";
    equisized?: boolean;
    align?: "left" | "center" | "right";
    reverse?: boolean;
    buttons?: Button[];
  }

  let { size, hasIcon, iconPlace, groupMarkup, inline, equisized, align, reverse, buttons }: Props = $props();
</script>

<dsfr-buttons-group
  {size}
  has-icon={hasIcon}
  icon-place={iconPlace}
  group-markup={groupMarkup}
  {inline}
  {equisized}
  {align}
  {reverse}
  {buttons}
></dsfr-buttons-group>
