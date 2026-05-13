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
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { withIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";
  setThemeable($host());

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
    /** Callback appelé lors du changement de segment actif */
    onvaluechanged?: (value: string | number) => void;
  }

  let {
    size = "md",
    legend,
    legendInline = false,
    noLegend = false,
    hint,
    hasIcon = false,
    elements = [],
    value,
    onvaluechanged,
  }: Props = $props();

  // `checked` sert de fallback si `value` n'est pas fourni
  let currentValue = $state(value ?? elements.find((e) => e.checked)?.value?.toString());

  $effect(() => {
    currentValue = value;
  });

  let fieldsetEl: HTMLFieldSetElement | undefined = $state();
  let elementsEl: HTMLDivElement | undefined = $state();

  /**
   * Redimensionne le composant en fonction de l'espace disponible (reproduit le comportement du JS DSFR).
   *
   * Vérifie la largeur du parent et bascule automatiquement le composant en mode vertical
   * si la largeur totale des éléments dépasse la largeur disponible.
   *
   * @function resize
   * @returns {void}
   */
  function resize() {
    if (!elementsEl || !fieldsetEl) return;

    const host = $host() as HTMLElement;
    const parentWidth = host.parentElement?.offsetWidth ?? 0;

    fieldsetEl.classList.remove("fr-segmented--vertical");

    if (elementsEl.offsetWidth > parentWidth || elementsEl.scrollWidth > parentWidth) {
      fieldsetEl.classList.add("fr-segmented--vertical");
    }
  }

  /**
   * Effectue le redimensionnement réactif du composant
   *
   * Observe les changements de largeur de l'élément parent
   * et déclenche une fonction de redimensionnement lorsque la largeur change.
   *
   * Utilise ResizeObserver pour déterminer si la largeur de l'élément parent
   * a changé et ne relance le redimensionnement que si nécessaire.
   *
   */
  $effect(() => {
    const host = $host() as HTMLElement;
    const parent = host.parentElement;

    if (!parent) return;

    let previousWidth = parent.offsetWidth;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.round(entry.contentRect.width);

        if (width !== previousWidth) {
          previousWidth = width;
          resize();
        }
      }
    });

    observer.observe(parent);

    resize();

    return () => observer.disconnect();
  });

  /**
   * Gère le changement de valeur du composant.
   * Émet un événement 'valuechanged' avec la valeur actuelle sélectionnée.
   *
   * @param {Event} event - L'événement de changement déclenché par l'élément DOM
   */
  function handleChange(event: Event) {
    onvaluechanged?.(currentValue);
    $host()?.dispatchEvent(
      new CustomEvent("valuechanged", { detail: currentValue, bubbles: true }),
    );
  }
</script>

<fieldset
  bind:this={fieldsetEl}
  class={["fr-segmented", `fr-segmented--${size}`]}
  class:fr-segmented--no-legend={noLegend}
>
  <legend class="fr-segmented__legend" class:fr-segmented__legend--inline={legendInline}>
    {legend}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </legend>
  <div class="fr-segmented__elements" bind:this={elementsEl}>
    {#each elements as segmented (segmented.id)}
      <div class="fr-segmented__element">
        <input
          type="radio"
          id={segmented.id}
          value={segmented.value}
          name={segmented.name}
          disabled={segmented.disabled}
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
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  // DSFR Form
  @import "@gouvfr/dsfr/src/dsfr/component/form/index";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/segmented/segmented.main.min.css";

  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("segmented");
</style>
