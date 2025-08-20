<svelte:options
  customElement={{
    tag: "dsfr-button",
    props: {
      hasIcon: { attribute: "has-icon", reflect: false, type: "Boolean" },
      icon: { attribute: "icon", reflect: false, type: "String" },
      iconPlace: { attribute: "icon-place", reflect: false, type: "String" },
      markup: { attribute: "markup", reflect: false, type: "String" },
      type: { attribute: "type", reflect: false, type: "String" },
      href: { attribute: "href", reflect: false, type: "String" },
      target: { attribute: "target", reflect: false, type: "String" },
      label: { attribute: "label", reflect: false, type: "String" },
      kind: { attribute: "kind", reflect: false, type: "String" },
      size: { attribute: "size", reflect: false, type: "String" },
      id: { attribute: "id", reflect: false, type: "String" },
      title: { attribute: "title", reflect: false, type: "String" },
      disabled: { attribute: "disabled", reflect: false, type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";

  type ButtonSize = Extract<Size, "sm" | "md" | "lg">;

  interface Props {
    hasIcon: boolean;
    icon: string;
    iconPlace: "only" | "left" | "right";
    markup: "button" | "a" | "input";
    type: "button" | "submit" | "reset";
    href: string;
    target: "self" | "blank";
    label: string;
    kind: "primary" | "secondary" | "tertiary" | "tertiary-no-outline" | "inverted";
    size: ButtonSize;
    id?: string;
    title: string;
    disabled: boolean;
  }

  let {
    label = "libellé du bouton",
    kind = "primary",
    size = "md",
    disabled = false,
    hasIcon = false,
    icon = "checkbox-line",
    iconPlace = "left",
    markup = "button",
    type = "button",
    href = "",
    target = "self",
    id = "",
  }: Props = $props();

  let kindClass = $derived(`fr-btn--${kind}`);
  let sizeClass = $derived(`fr-btn--${size}`);
</script>

<svelte:element
  this={markup}
  {id}
  type={markup === "button" ? type : undefined}
  href={markup === "a" ? href : undefined}
  {disabled}
  class={["fr-btn", kindClass, sizeClass]}
>
  {label}
</svelte:element>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/button/button.min.css";

  .fr-btn {
    box-sizing: border-box;

    &--inverted {
      --hover: inherit;
      --active: inherit;
      background-color: var(--background-default-grey);
      box-shadow: inset 0 0 0 1px var(--background-default-grey);
      color: var(--text-action-high-blue-france);
    }
  }
</style>
