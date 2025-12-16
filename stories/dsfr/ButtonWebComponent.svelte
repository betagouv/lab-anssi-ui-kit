<script lang="ts">
  interface Props {
    label: string;
    kind?: string;
    size?: string;
    disabled?: boolean;
    centered?: boolean;
    hasIcon?: boolean;
    icon?: string;
    iconPlace?: string;
  }

  let { label, kind, size, disabled, centered, hasIcon, icon, iconPlace }: Props = $props();
</script>

<dsfr-button
  {label}
  kind={kind}
  size={size}
  disabled={disabled}
  centered={centered}
  has-icon={hasIcon}
  {icon}
  icon-place={iconPlace}
></dsfr-button>
