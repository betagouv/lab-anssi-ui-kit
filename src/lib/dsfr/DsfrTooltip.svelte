<svelte:options
  customElement={{
    tag: "dsfr-tooltip",
    props: {
      id: { attribute: "id", type: "String" },
      content: { attribute: "content", type: "String" },
      type: { attribute: "type", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { setThemeable } from "$lib/utilitaires";

  type TooltipType = "hover" | "click";

  interface Props {
    /** Identifiant de l'infobulle */
    id: string;
    /** Contenu texte de l'infobulle */
    content: string;
    /** Type de déclenchement : 'hover' (information contextuelle) ou 'click' (infobulle) */
    type?: TooltipType;
  }

  setThemeable($host());

  let { id, content, type = "hover" }: Props = $props();

  let shown = $state(false);
  let placement = $state<"top" | "bottom">("top");
  let translateX = $state(0);
  let arrowX = $state(0);

  let tooltipElement: HTMLSpanElement;
  let wrapperElement: HTMLDivElement;
  let triggerElement: HTMLSpanElement;

  let focusActive = $state(false);
  let hoverActive = $state(false);

  let timeoutID: ReturnType<typeof setTimeout>;

  const SAFE_AREA_MARGIN = 16; // Marge minimale entre le tooltip et les bords du viewport (en px)
  const ARROW_EDGE_MARGIN = 8; // Marge minimale entre la flèche et les bords du tooltip (en px)

  const shouldShow = $derived(focusActive || hoverActive);

  $effect(() => {
    shown = shouldShow;
  });

  $effect(() => {
    if (!shown) return;

    const frameId = requestAnimationFrame(updatePlacement);
    return () => cancelAnimationFrame(frameId);
  });

  /**
   * Met à jour la position et l'alignement de l'infobulle en fonction de l'espace disponible
   * dans la fenêtre. Calcule la position horizontale (translateX) et la position de la flèche (arrowX)
   * pour éviter que l'infobulle ne sorte de la fenêtre.
   */
  function updatePlacement() {
    if (!tooltipElement || !wrapperElement) return;

    const wrapperRect = wrapperElement.getBoundingClientRect();
    const tooltipWidth = tooltipElement.offsetWidth;
    const tooltipHeight = tooltipElement.offsetHeight;
    const viewportWidth = window.innerWidth;

    placement = wrapperRect.top < tooltipHeight + ARROW_EDGE_MARGIN ? "bottom" : "top";

    const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
    const centerOffset = (wrapperRect.width - tooltipWidth) / 2;
    const centerLeft = wrapperRect.left + centerOffset;
    const centerRight = centerLeft + tooltipWidth;

    let horizontalOffset: number;
    let arrowOffset: number;

    if (centerLeft >= SAFE_AREA_MARGIN && centerRight <= viewportWidth - SAFE_AREA_MARGIN) {
      horizontalOffset = centerOffset;
      arrowOffset = 0;
    } else if (wrapperRect.left + tooltipWidth <= viewportWidth - SAFE_AREA_MARGIN) {
      horizontalOffset = 0;
      arrowOffset = wrapperCenter - (wrapperRect.left + tooltipWidth / 2);
    } else if (wrapperRect.right - tooltipWidth >= SAFE_AREA_MARGIN) {
      horizontalOffset = wrapperRect.width - tooltipWidth;
      arrowOffset =
        wrapperCenter - (wrapperRect.left + (wrapperRect.width - tooltipWidth) + tooltipWidth / 2);
    } else {
      horizontalOffset = centerOffset;
      arrowOffset = 0;
    }

    translateX = Math.round(horizontalOffset);

    const limit = tooltipWidth / 2 - ARROW_EDGE_MARGIN;
    arrowX = Math.max(-limit, Math.min(limit, arrowOffset));
  }

  function handleFocusIn() {
    focusActive = true;
  }

  function handleFocusOut() {
    focusActive = false;
  }

  function handleMouseOver() {
    clearTimeout(timeoutID);
    hoverActive = true;
  }

  function handleMouseOut() {
    timeoutID = setTimeout(() => {
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
    if (!triggerElement) return;

    const slot = triggerElement.querySelector("slot") as HTMLSlotElement;
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
    return () => clearTimeout(timeoutID);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div class="fr-tooltip-wrapper" bind:this={wrapperElement}>
  <span
    class="fr-tooltip-trigger"
    bind:this={triggerElement}
    onfocusin={handleFocusIn}
    onfocusout={handleFocusOut}
    onmouseover={type === "hover" ? handleMouseOver : undefined}
    onmouseout={type === "hover" ? handleMouseOut : undefined}
  >
    <slot></slot>
  </span>

  <span
    class={[
      "fr-tooltip",
      "fr-placement",
      `fr-placement--${placement}`,
      { "fr-tooltip--shown": shown },
    ]}
    {id}
    role="tooltip"
    style:--arrow-x="{arrowX.toFixed(2)}px"
    style:transform="translateX({translateX}px)"
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/placement/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;

  @import "@gouvfr/dsfr/dist/component/tooltip/tooltip.main.css";

  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("tooltip");

  .fr-tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .fr-tooltip {
    position: absolute;
    left: 0;
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
