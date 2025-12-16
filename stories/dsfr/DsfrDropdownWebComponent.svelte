<script lang="ts">
  interface Props {
    id: string;
    collapseId: string;
    buttonId?: string;
    buttonTitle?: string;
    buttonKind?: ButtonKind;
    buttonSize?: ButtonSize;
    buttonIcon?: string;
    buttonIconPlace?: "only" | "left" | "right";
    contentType: "buttons" | "links" | "custom";
    align?: "left" | "right";
  }

  let { id, collapseId, buttonId, buttonTitle, buttonKind, buttonSize, buttonIcon, buttonIconPlace, contentType, align }: Props = $props();
</script>

<dsfr-dropdown
  {id}
  collapse-id={collapseId}
  button-id={buttonId}
  button-title={buttonTitle}
  button-kind={buttonKind}
  button-size={buttonSize}
  button-icon={buttonIcon}
  button-icon-place={buttonIconPlace}
  content-type={contentType}
  {align}
></dsfr-dropdown>
