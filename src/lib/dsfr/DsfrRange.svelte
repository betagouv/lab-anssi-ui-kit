<svelte:options
  customElement={{
    tag: "dsfr-range",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      name: { attribute: "name", type: "String" },
      hint: { attribute: "hint", type: "String" },
      size: { attribute: "size", type: "String" },
      min: { attribute: "min", type: "Number" },
      max: { attribute: "max", type: "Number" },
      value: { attribute: "value", type: "Number", reflect: true },
      step: { attribute: "step", type: "Number" },
      prefix: { attribute: "prefix", type: "String" },
      suffix: { attribute: "suffix", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      isDouble: { attribute: "is-double", type: "Boolean" },
      value2: { attribute: "value2", type: "Number", reflect: true },
      minValueLabel: { attribute: "min-value-label", type: "String" },
      maxValueLabel: { attribute: "max-value-label", type: "String" },
      isStep: { attribute: "is-step", type: "Boolean" },
      indicators: { attribute: "indicators", type: "Boolean" },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { untrack } from "svelte";
  import { createEventDispatcher } from "svelte";
  import type { Size, Status } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type RangeSize = Extract<Size, "sm" | "md">;
  type RangeStatus = Extract<Status, "default" | "error">;

  interface Props {
    /** Attribut id de l'input */
    id: string;
    /** Libellé du curseur */
    label?: string;
    /** Attribut name du curseur */
    name?: string;
    /** Texte additionnel du curseur */
    hint: string;
    /** Taille de du curseur */
    size?: RangeSize;
    /** Valeur minimale du curseur */
    min: number;
    /** Valeur maximale du curseur */
    max: number;
    /** valeur initiale du curseur */
    value: number;
    /** Pas du curseur */
    step?: number;
    /** Texte avant la valeur du curseur */
    prefix?: string;
    /** Texte après la valeur du curseur */
    suffix?: string;
    /** Désactive le curseur */
    disabled?: boolean;
    /** Mode double curseur [defaut: false] */
    isDouble?: boolean;
    /** Deuxième valeur initiale pour le curseur double */
    value2: number;
    /** Label pour le 1er curseur en mode double (attribut aria-label) */
    minValueLabel: string;
    /** Label pour le Deuxième curseur en mode double (attribut aria-label) */
    maxValueLabel: string;
    /** Mode urseur à pas [defaut: false] */
    isStep?: boolean;
    /** Pour afficher les valeurs min et max sous le curseur [default: true] */
    indicators?: boolean;
    /** Statut du message */
    status?: RangeStatus;
    /** Texte du message d'erreur */
    errorMessage?: string;
  }

  let {
    id,
    label,
    name,
    hint,
    size = "md",
    min,
    max,
    value = $bindable(),
    step = 1,
    prefix,
    suffix,
    disabled = false,
    isDouble = false,
    value2 = $bindable(),
    minValueLabel,
    maxValueLabel,
    isStep = false,
    indicators = true,
    status = "default",
    errorMessage,
  }: Props = $props();

  const dispatch = createEventDispatcher();

  const decorate = (val: number | string) => `${prefix ?? ""}${val}${suffix ?? ""}`;

  // Diamètres du thumb selon le DSFR source : 24px (md) / 16px (sm)
  const THUMB_MD = 24;
  const THUMB_SM = 16;

  let rangeEl: HTMLDivElement | undefined = $state();
  let rangeWidth = $state(0);

  // Observe la largeur du conteneur pour recalculer les positions
  $effect(() => {
    if (!rangeEl) return;

    const observer = new ResizeObserver(() => {
      rangeWidth = rangeEl!.getBoundingClientRect().width;
    });
    observer.observe(rangeEl);

    return () => observer.disconnect();
  });

  // Espace total réservé aux thumbs aux extrémités du rail (1 thumb en simple, 2 en double)
  const thumbDiameter = $derived(size === "sm" ? THUMB_SM : THUMB_MD);
  // Largeur du rail disponible pour le déplacement des thumbs
  const thumbsReservedWidth = $derived(isDouble ? thumbDiameter * 2 : thumbDiameter);
  // Amplitude totale des valeurs possibles (max - min)
  const usableRailWidth = $derived(rangeWidth - thumbsReservedWidth);

  // Position du 1er curseur sur le rail
  const valueRange = $derived(max - min);

  // Position du 2e curseur sur le rail (mode double uniquement)
  const valueRatio = $derived(valueRange > 0 ? (value - min) / valueRange : 0);
  const value2Ratio = $derived(valueRange > 0 ? (value2 - min) / valueRange : 0);

  // Texte de la bulle (décoration prefix/suffix, "val1 - val2" en double)
  const outputText = $derived(
    isDouble ? `${decorate(value)} - ${decorate(value2)}` : decorate(value),
  );

  // Transform CSS de la bulle : centrée sur le thumb courant (ou la moyenne en double)
  const outputTransform = $derived.by(() => {
    const r = isDouble ? (valueRatio + value2Ratio) / 2 : valueRatio;

    return `translateX(${(r * rangeWidth).toFixed(2)}px) translateX(-${(r * 100).toFixed(2)}%)`;
  });

  // --progress-right : bord droit de la barre colorée
  // --progress-left  : bord gauche en mode double uniquement
  const progressRight = $derived(
    `${(usableRailWidth * (isDouble ? value2Ratio : valueRatio) + thumbsReservedWidth * (isDouble ? 0.75 : 0.5)).toFixed(2)}px`,
  );
  const progressLeft = $derived(
    isDouble
      ? `${(usableRailWidth * valueRatio + thumbsReservedWidth * 0.25).toFixed(2)}px`
      : undefined,
  );

  // --step-width : espacement visuel des crans (mode step uniquement)
  const stepWidth = $derived.by(() => {
    if (!isStep || valueRange === 0) return undefined;
    const steps = valueRange / step;
    let sw = usableRailWidth / steps;
    if (sw < 1 || !isFinite(sw)) sw = 4;
    while (sw < 4) sw *= 2;
    return `${sw.toFixed(3)}px`;
  });

  // En mode double (value doit toujours être ≤ value2)
  // Quand input1 dépasse input2, on pousse input2 vers la droite
  function handleInput1(e: Event) {
    const newVal = parseFloat((e.target as HTMLInputElement).value);
    value = newVal;

    dispatch("valuechanged", newVal);

    if (isDouble && value2 < newVal) {
      untrack(() => (value2 = newVal));
      dispatch("value2changed", newVal);
    }
  }

  // Quand input2 passe sous input1, on ramène input1 vers la gauche
  function handleInput2(e: Event) {
    const newVal = parseFloat((e.target as HTMLInputElement).value);
    value2 = newVal;

    dispatch("value2changed", newVal);

    if (isDouble && value > newVal) {
      untrack(() => (value = newVal));
      dispatch("valuechanged", newVal);
    }
  }
</script>

<div
  class={[
    "fr-range-group",
    disabled && "fr-range-group--disabled",
    status === "error" && "fr-range-group--error",
  ]}
  id="{id}-group"
>
  <label class="fr-label" id="{id}-label" for={id}>
    {label}
    {#if hint}
      <span class="fr-hint-text">
        {hint}
      </span>
    {/if}
  </label>

  <div
    bind:this={rangeEl}
    class={[
      "fr-range",
      size === "sm" && "fr-range--sm",
      isDouble && "fr-range--double",
      isStep && "fr-range--step",
    ]}
    data-fr-prefix={prefix}
    data-fr-suffix={suffix}
    data-fr-js-range="true"
    style:--progress-left={progressLeft}
    style:--progress-right={progressRight}
    style:--step-width={stepWidth}
  >
    <span class="fr-range__output" style:transform={outputTransform}>
      {outputText}
    </span>

    <input
      {id}
      {name}
      type="range"
      aria-labelledby={isDouble ? `${id} ${id}-label` : `${id}-label`}
      aria-label={isDouble ? minValueLabel : undefined}
      {min}
      {max}
      {value}
      oninput={handleInput1}
      {step}
      {disabled}
      aria-describedby="{id}-messages"
    />

    {#if isDouble}
      <input
        id="{id}-2"
        name={name ? `${name}-2` : undefined}
        type="range"
        aria-labelledby="{id}-2 {id}-label"
        aria-label={maxValueLabel}
        {min}
        {max}
        value={value2}
        oninput={handleInput2}
        {step}
        {disabled}
        aria-describedby="{id}-messages"
      />
    {/if}

    {#if indicators}
      <span class="fr-range__min" aria-hidden="true">{decorate(min)}</span>
      <span class="fr-range__max" aria-hidden="true">{decorate(max)}</span>
    {/if}
  </div>

  <slot name="messagesgroup"></slot>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/range/range.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("range-group");
</style>
