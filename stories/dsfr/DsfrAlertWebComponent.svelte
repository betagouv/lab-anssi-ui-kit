<script lang="ts">
  interface Props {
    buttonCloseLabel?: string;
    hasTitle?: boolean;
    title?: string;
    hasDescription?: boolean;
    text?: string;
    type?: "default" | "success" | "error" | "info" | "warning";
    size?: AlertSize;
    id?: string;
    dismissible?: boolean;
    icon?: string;
  }

  let { buttonCloseLabel, hasTitle, title, hasDescription, text, type, size, id, dismissible, icon }: Props = $props();
</script>

<dsfr-alert
  button-close-label={buttonCloseLabel}
  has-title={hasTitle}
  {title}
  has-description={hasDescription}
  {text}
  {type}
  {size}
  {id}
  {dismissible}
  {icon}
></dsfr-alert>
