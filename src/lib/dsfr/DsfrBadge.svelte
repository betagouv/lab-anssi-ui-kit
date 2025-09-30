<svelte:options
  customElement={{
    tag: "dsfr-badge",
    props: {
      label: { attribute: "label", type: "String" },
      accent: { attribute: "accent", type: "String" },
      ellipsis: { attribute: "ellipsis", type: "Boolean" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      size: { attribute: "size", type: "String" },
      status: { attribute: "status", type: "String" },
      type: { attribute: "type", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size, Status } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type BadgeSize = Extract<Size, "sm" | "md">;
  type BadgeType = "default" | "accent" | "status";

  interface Props {
    label: string;
    accent?: Accent;
    ellipsis?: boolean;
    hasIcon?: boolean;
    icon?: string;
    size?: BadgeSize;
    status?: Status;
    type?: BadgeType;
  }

  let {
    accent,
    ellipsis = false,
    hasIcon = false,
    icon,
    label,
    size,
    status,
    type,
  }: Props = $props();

  let accentClass = $derived.by(() => {
    return type === "accent" && accent && `fr-badge--${accent}`;
  });
  let iconClass = $derived.by(() => {
    return hasIcon && icon && `fr-badge--icon-left ${setIconClass(icon)}`;
  });
  let sizeClass = $derived(`fr-badge--${size}`);
  let statusClass = $derived.by(() => {
    return type === "status" && status && `fr-badge--${status}`;
  });
</script>

<p class={["fr-badge", accentClass, iconClass, sizeClass, statusClass]}>
  {#if ellipsis}
    <span class="fr-ellipsis">{label}</span>
  {:else}
    {label}
  {/if}
</p>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/badge/main" as *;
</style>
