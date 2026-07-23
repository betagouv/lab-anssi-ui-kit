<svelte:options
  customElement={{
    tag: "dsfr-tooltip",
    props: {
      content: { attribute: "content", type: "String" },
      id: { attribute: "id", type: "String" },
      type: { attribute: "type", type: "String" },
      triggerLabel: { attribute: "trigger-label", type: "String" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import { withIconsStyleSheet, setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type TooltipType = "hover" | "click";

  interface Props {
    /** Contenu texte de l'infobulle */
    content: string;
    /** Identifiant de l'infobulle */
    id: string;
    /** Type de déclenchement : 'hover' (information contextuelle) ou 'click' (infobulle) */
    type?: TooltipType;
    /** Libellé accessible du bouton déclencheur (type 'click' uniquement) */
    triggerLabel?: string;
  }

  let {
    content,
    id,
    type = "hover",
    triggerLabel = "Information contextuelle",
  }: Props = $props();

  let shown = $state(false);
  let placement = $state<"top" | "bottom">("top");
  let tooltipElement: HTMLSpanElement;
  let wrapperElement: HTMLDivElement;
  let triggerContainer: HTMLSpanElement;
  let focusActive = $state(false);
  let hoverActive = $state(false);
  let hideTimeout: ReturnType<typeof setTimeout>;

  const shouldShow = $derived(focusActive || hoverActive);

  $effect(() => {
    shown = shouldShow;
  });

  $effect(() => {
    if (!shown) return;

    const frameId = requestAnimationFrame(updatePlacement);
    return () => cancelAnimationFrame(frameId);
  });

  function updatePlacement() {
    if (!tooltipElement || !wrapperElement) return;

    const wrapperRect = wrapperElement.getBoundingClientRect();
    const tooltipHeight = tooltipElement.offsetHeight;

    placement = wrapperRect.top < tooltipHeight + 8 ? "bottom" : "top";
  }

  function handleFocusIn() {
    focusActive = true;
  }

  function handleFocusOut() {
    focusActive = false;
  }

  function handleMouseOver() {
    clearTimeout(hideTimeout);
    hoverActive = true;
  }

  function handleMouseOut() {
    hideTimeout = setTimeout(() => {
      hoverActive = false;
    }, 100);
  }

  $effect(() => {
    if (!shown) return;

    function onClickOutside(event: MouseEvent) {
      const host = $host();
      if (host && !event.composedPath().includes(host)) {
        focusActive = false;
        hoverActive = false;
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        focusActive = false;
        hoverActive = false;
      }
    }

    document.addEventListener("click", onClickOutside, true);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("click", onClickOutside, true);
      document.removeEventListener("keydown", onEscape);
    };
  });

  $effect(() => {
    if (type !== "hover" || !triggerContainer) return;
    const slot = triggerContainer.querySelector("slot") as HTMLSlotElement;
    if (!slot) return;

    function setAria() {
      for (const el of slot.assignedElements()) {
        el.setAttribute("aria-describedby", id);
      }
    }

    slot.addEventListener("slotchange", setAria);
    setAria();

    return () => slot.removeEventListener("slotchange", setAria);
  });

  $effect(() => {
    return () => clearTimeout(hideTimeout);
  });
</script>

<div class="fr-tooltip-wrapper" bind:this={wrapperElement}>
  {#if type === "click"}
    <button
      class="fr-btn--tooltip fr-btn"
      type="button"
      aria-describedby={id}
      onfocusin={handleFocusIn}
      onfocusout={handleFocusOut}
    >
      {triggerLabel}
    </button>
  {:else}
    <span
      class="fr-tooltip-trigger"
      bind:this={triggerContainer}
      onfocusin={handleFocusIn}
      onfocusout={handleFocusOut}
      onmouseover={handleMouseOver}
      onmouseout={handleMouseOut}
    >
      <slot></slot>
    </span>
  {/if}
  <span
    class={[
      "fr-tooltip",
      "fr-placement",
      `fr-placement--${placement}`,
      { "fr-tooltip--shown": shown },
    ]}
    {id}
    role="tooltip"
    style:--arrow-x="0px"
    bind:this={tooltipElement}
    onmouseover={type === "hover" ? handleMouseOver : undefined}
    onmouseout={type === "hover" ? handleMouseOut : undefined}
  >
    {content}
  </span>
</div>

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;

  @import "@gouvfr/dsfr/dist/component/button/button.main.css";
  @import "@gouvfr/dsfr/dist/component/tooltip/tooltip.main.css";

  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("tooltip");

  .fr-tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .fr-tooltip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .fr-tooltip.fr-placement--top {
    bottom: 100%;
  }

  .fr-tooltip.fr-placement--bottom {
    top: 100%;
  }

  .fr-tooltip-trigger {
    display: contents;
  }
</style>
