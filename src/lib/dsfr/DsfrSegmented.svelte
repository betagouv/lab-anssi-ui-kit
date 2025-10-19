<svelte:options
  customElement={{
    tag: "dsfr-segmented",
    props: {
      size: { attribute: "size", type: "String" },
      legend: { attribute: "legend", type: "String" },
      legendInline: { attribute: "legend-inline", type: "Boolean" },
      noLegend: { attribute: "no-legend", type: "Boolean" },
      hint: { attribute: "hint", type: "String" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      elements: { attribute: "elements", type: "Array" },
      value: { attribute: "value", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";
  import { createEventDispatcher } from "svelte";

  type SegmentedSize = Extract<Size, "sm" | "md">;
  type Segmented = {
    id: string;
    label: string;
    name: string;
    checked?: boolean;
    value?: string | number;
    disabled?: boolean;
    icon?: string;
  };

  interface Props {
    /** Taille du contrôle segmenté */
    size?: SegmentedSize;
    /** Légende du contrôle segmenté */
    legend?: string;
    /** Si true, affiche la légende sur la même ligne que le contrôle segmenté */
    legendInline?: boolean;
    /** Si true, n'affiche pas la légende */
    noLegend?: boolean;
    /** Texte additionnel du contrôle segmenté */
    hint?: string;
    /** Le contrôle segmenté a une icône */
    hasIcon?: boolean;
    /** Les éléments du contrôle segmenté */
    elements: Segmented[];
    /** Valeur des segments */
    value?: string | number;
  }

  const dispatch = createEventDispatcher();

  let {
    size = "md",
    legend,
    legendInline = false,
    noLegend = false,
    hint,
    hasIcon = false,
    elements = [],
    value,
  }: Props = $props();

  let currentValue = $state(value);

  function handleChange(event: Event) {
    dispatch("valuechanged", currentValue);
  }
</script>

<fieldset
  class={["fr-segmented", `fr-segmented--${size}`]}
  class:fr-segmented--no-legend={noLegend}
>
  <legend class="fr-segmented__legend" class:fr-segmented__legend--inline={legendInline}>
    {legend}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>
  <div class="fr-segmented__elements">
    {#each elements as segmented (segmented.id)}
      <div class="fr-segmented__element">
        <input
          type="radio"
          id={segmented.id}
          value={segmented.value}
          name={segmented.name}
          bind:group={currentValue}
          onchange={handleChange}
        />
        <label class={["fr-label", hasIcon ? setIconClass(segmented.icon) : ""]} for={segmented.id}>
          {segmented.label}
        </label>
      </div>
    {/each}
  </div>
</fieldset>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Form
  @import "@gouvfr/dsfr/src/dsfr/component/form/index";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/segmented/segmented.main.min.css";

  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("segmented");
</style>
