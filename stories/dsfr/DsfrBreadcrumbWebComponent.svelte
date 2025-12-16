<script lang="ts">
  interface Props {
    id: string;
    segments: Segment[];
    buttonAriaLabel: string;
    buttonLabel: string;
    inverse?: boolean;
    markup?: Markup;
    hasMarginVariant?: boolean;
  }

  let { id, segments, buttonAriaLabel, buttonLabel, inverse, markup, hasMarginVariant }: Props = $props();
</script>

<dsfr-breadcrumb
  {id}
  {segments}
  button-aria-label={buttonAriaLabel}
  button-label={buttonLabel}
  {inverse}
  {markup}
  has-margin-variant={hasMarginVariant}
></dsfr-breadcrumb>
