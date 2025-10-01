<svelte:options
  customElement={{
    tag: "dsfr-alert",
    props: {
      buttonCloseLabel: { attribute: "button-close-label", type: "String" },
      hasTitle: { attribute: "has-title", type: "Boolean" },
      title: { attribute: "title", type: "String" },
      hasDescription: { attribute: "has-description", type: "Boolean" },
      text: { attribute: "text", type: "String" },
      type: { attribute: "type", type: "String" },
      size: { attribute: "size", type: "String" },
      id: { attribute: "id", type: "String" },
      dismissible: { attribute: "dismissible", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

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
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/dist/component/alert/alert.min.css";
</style>
