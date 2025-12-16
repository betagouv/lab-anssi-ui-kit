<script lang="ts">
  interface Props {
    id: string;
    collapseId: string;
    noBorder?: boolean;
    languages: TranslateLanguage[];
    buttonId?: string;
    buttonTitle?: string;
    buttonKind?: Kind;
  }

  let { id, collapseId, noBorder, languages, buttonId, buttonTitle, buttonKind }: Props = $props();
</script>

<dsfr-translate
  {id}
  collapse-id={collapseId}
  no-border={noBorder}
  {languages}
  button-id={buttonId}
  button-title={buttonTitle}
  button-kind={buttonKind}
></dsfr-translate>
