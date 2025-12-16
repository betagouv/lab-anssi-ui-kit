<script lang="ts">
  interface Props {
    size?: SegmentedSize;
    legend?: string;
    legendInline?: boolean;
    noLegend?: boolean;
    hint?: string;
    hasIcon?: boolean;
    elements: Segmented[];
    value?: string | number;
  }

  let { size, legend, legendInline, noLegend, hint, hasIcon, elements, value }: Props = $props();
</script>

<dsfr-segmented
  {size}
  {legend}
  legend-inline={legendInline}
  no-legend={noLegend}
  {hint}
  has-icon={hasIcon}
  {elements}
  {value}
></dsfr-segmented>
