<script lang="ts">
  interface Props {
    label: string;
    type?: "default" | "clickable" | "pressable" | "dismissible";
    size?: TagSize;
    href?: string;
    blank?: boolean;
    title?: string;
    pressed?: boolean;
    disabled?: boolean;
    hasIcon?: boolean;
    icon?: string;
    accent?: Accent;
  }

  let { label, type, size, href, blank, title, pressed, disabled, hasIcon, icon, accent }: Props = $props();
</script>

<dsfr-tag
  {label}
  {type}
  {size}
  {href}
  {blank}
  {title}
  {pressed}
  {disabled}
  has-icon={hasIcon}
  {icon}
  {accent}
></dsfr-tag>
