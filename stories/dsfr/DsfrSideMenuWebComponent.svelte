<script lang="ts">
  interface Props {
    title: string;
    items: MenuItem[];
    buttonLabel: string;
    buttonId: string;
    titleId?: string;
    hasTitle?: boolean;
    modifier?: Modifier;
    activeItem?: string;
  }

  let { title, items, buttonLabel, buttonId, titleId, hasTitle, modifier, activeItem }: Props = $props();
</script>

<dsfr-side-menu
  {title}
  {items}
  button-label={buttonLabel}
  button-id={buttonId}
  title-id={titleId}
  has-title={hasTitle}
  {modifier}
  active-item={activeItem}
></dsfr-side-menu>
