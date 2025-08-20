<svelte:options
  customElement={{
    tag: "dsfr-alert",
    props: {
      buttonCloseLabel: { attribute: "button-close-label", reflect: false, type: "String" },
      hasTitle: { attribute: "has-title", reflect: false, type: "Boolean" },
      title: { attribute: "title", reflect: false, type: "String" },
      hasDescription: { attribute: "has-description", reflect: false, type: "Boolean" },
      text: { attribute: "text", reflect: false, type: "String" },
      type: { attribute: "type", reflect: false, type: "String" },
      size: { attribute: "size", reflect: false, type: "String" },
      id: { attribute: "id", reflect: false, type: "String" },
      dismissible: { attribute: "dismissible", reflect: false, type: "Boolean" },
      icon: { attribute: "icon", reflect: false, type: "String" },
    },
  }}
/>

<script lang="ts">
  import { setIconClass } from "$lib/utilitaires";
  import type { Size } from "$lib/types";

  type AlertSize = Extract<Size, "sm" | "md">;

  interface Props {
    buttonCloseLabel?: string;
    hasTitle?: boolean;
    title?: string;
    hasDescription?: boolean;
    text?: string;
    type?: "default" | "success" | "error" | "info" | "warning";
    size?: AlertSize;
    id?: string;
    dismissible?: boolean;
    icon?: string;
  }

  let {
    hasTitle = true,
    hasDescription = true,
    title,
    text,
    type = "default",
    size = "md",
    id,
    icon,
    dismissible = false,
    buttonCloseLabel,
  }: Props = $props();

  let iconClass = $derived(setIconClass(icon));
  let typeClass = $derived(`fr-alert--${type}`);
  let sizeClass = $derived(`fr-alert--${size}`);
</script>

<div {id} class={["fr-alert", iconClass, typeClass, sizeClass]}>
  {#if hasTitle || size === "md"}
    <h3 class="fr-alert__title">{title}</h3>
  {/if}
  {#if hasDescription || size === "sm"}
    <p>{text}</p>
  {/if}
  {#if dismissible}
    <button title={buttonCloseLabel} type="button" class="fr-btn--close fr-btn">
      {buttonCloseLabel}
    </button>
  {/if}
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/alert/alert.min.css";
</style>
