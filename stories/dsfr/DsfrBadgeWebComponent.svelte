<script lang="ts">
  interface Props {
    label: string;
    accent?: Accent;
    ellipsis?: boolean;
    hasIcon?: boolean;
    hasNoIcon?: boolean;
    icon?: string;
    size?: BadgeSize;
    status?: Status;
    type?: BadgeType;
  }

  let { label, accent, ellipsis, hasIcon, hasNoIcon, icon, size, status, type }: Props = $props();
</script>

<dsfr-badge
  {label}
  {accent}
  {ellipsis}
  has-icon={hasIcon}
  has-no-icon={hasNoIcon}
  {icon}
  {size}
  {status}
  {type}
></dsfr-badge>
