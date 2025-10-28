<svelte:options
  customElement={{
    tag: "dsfr-col",
    props: {
      size: { attribute: "size", type: "Number" },
      sm: { attribute: "sm", type: "Number" },
      md: { attribute: "md", type: "Number" },
      lg: { attribute: "lg", type: "Number" },
      xl: { attribute: "xl", type: "Number" },
      offset: { attribute: "offset", type: "Number" },
    },
  }}
/>

<script lang="ts">
  import { off } from "process";

  interface Props {
    /** Définit la taille de la colonne */
    size?: number | undefined;
    sm?: number | undefined;
    md?: number | undefined;
    lg?: number | undefined;
    xl?: number | undefined;
    offset?: number | undefined;
  }

  let { size, sm, md, lg, xl, offset }: Props = $props();

  const defaultColClass = $derived.by(() => {
    if (size && size >= 1 && size <= 12) {
      return `fr-col-${size}`;
    }

    return;
  });

  const responsiveColClass = $derived.by(() => {
    let classes = [];

    if (sm && sm >= 1 && sm <= 12) {
      classes.push(`fr-col-sm-${sm}`);
    }
    if (md && md >= 1 && md <= 12) {
      classes.push(`fr-col-md-${md}`);
    }
    if (lg && lg >= 1 && lg <= 12) {
      classes.push(`fr-col-lg-${lg}`);
    }
    if (xl && xl >= 1 && xl <= 12) {
      classes.push(`fr-col-xl-${xl}`);
    }
    if (offset && offset >= 0 && offset <= 12) {
      classes.push(`fr-col-offset-${offset}`);
    }

    return classes.join(" ");
  });
</script>

<div class={["fr-col", defaultColClass, responsiveColClass]}>
  <slot></slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module/col";
  @include grid($grid-settings);

  @include set-dsfr-sizing("col");
</style>
