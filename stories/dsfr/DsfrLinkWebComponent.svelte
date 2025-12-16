<script lang="ts">
  interface Props {
    label: string;
    size?: LinkSize;
    id?: string;
    disabled?: boolean;
    blank?: boolean;
    title?: string;
    href?: string;
    download?: boolean;
    detail?: string;
    hreflang?: string;
    assess?: boolean;
    hasIcon?: boolean;
    icon?: string;
    iconPlace?: IconPlace;
  }

  let { label, size, id, disabled, blank, title, href, download, detail, hreflang, assess, hasIcon, icon, iconPlace }: Props = $props();
</script>

<dsfr-link
  {label}
  {size}
  {id}
  {disabled}
  {blank}
  {title}
  {href}
  {download}
  {detail}
  {hreflang}
  {assess}
  has-icon={hasIcon}
  {icon}
  icon-place={iconPlace}
></dsfr-link>
