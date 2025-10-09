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

  let displayAlert = $state(true);
  let iconClass = $derived(icon && setIconClass(icon));
</script>

{#if displayAlert}
  <div {id} class={["fr-alert", `fr-alert--${type}`, `fr-alert--${size}`, iconClass]}>
    {#if hasTitle || size === "md"}
      <h3 class="fr-alert__title">{title}</h3>
    {/if}
    {#if hasDescription || size === "sm"}
      <p>{text}</p>
    {/if}
    {#if dismissible}
      <button
        title={buttonCloseLabel}
        type="button"
        class="fr-btn--close fr-btn"
        onclick={() => (displayAlert = false)}
      >
        {buttonCloseLabel}
      </button>
    {/if}
  </div>
{/if}

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme();
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/alert/alert.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("alert");
</style>
