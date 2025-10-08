<svelte:options
  customElement={{
    tag: "dsfr-button",
    props: {
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      iconPlace: { attribute: "icon-place", type: "String" },
      markup: { attribute: "markup", type: "String" },
      type: { attribute: "type", type: "String" },
      href: { attribute: "href", type: "String" },
      target: { attribute: "target", type: "String" },
      label: { attribute: "label", type: "String" },
      kind: { attribute: "kind", type: "String" },
      size: { attribute: "size", type: "String" },
      id: { attribute: "id", type: "String" },
      title: { attribute: "title", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type ButtonSize = Extract<Size, "sm" | "md" | "lg">;

  interface Props {
    disabled: boolean;
    hasIcon: boolean;
    href: string;
    icon: string;
    iconPlace: "only" | "left" | "right";
    id?: string;
    kind: "primary" | "secondary" | "tertiary" | "tertiary-no-outline" | "inverted";
    label: string;
    markup: "button" | "a" | "input";
    size: ButtonSize;
    target: "_self" | "_blank";
    title: string;
    type: "button" | "submit" | "reset";
  }

  const {
    disabled = false,
    hasIcon = false,
    href,
    icon = "checkbox-line",
    iconPlace = "left",
    id,
    kind = "primary",
    label = "libellé du bouton",
    markup = "button",
    size = "md",
    target = "_self",
    title = "",
    type = "button",
  }: Props = $props();

  function setButtonType(markup: string) {
    if (markup === "button" || markup === "input") return type;
    return undefined;
  }

  const iconClass = $derived<boolean | string>(hasIcon && icon && setIconClass(icon));
</script>

<svelte:element
  this={markup}
  {id}
  type={setButtonType(markup)}
  href={markup === "a" ? href : undefined}
  target={markup === "a" ? target : undefined}
  {disabled}
  {title}
  class={["fr-btn", `fr-btn--${kind}`, `fr-btn--${size}`, iconClass]}
  class:fr-btn--icon-left={hasIcon && iconPlace === "left"}
  class:fr-btn--icon-right={hasIcon && iconPlace === "right"}
>
  {label}
</svelte:element>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";

  @include set-shadow-host("inline-flex");
  @include set-dsfr-sizing("btn");

  .fr-btn {
    justify-content: center;
    width: 100%;

    &--inverted {
      --hover: var(--background-default-grey-hover);
      --active: var(--background-default-grey-active);

      background-color: var(--background-default-grey);
      box-shadow: inset 0 0 0 1px var(--background-default-grey);
      color: var(--text-action-high-blue-france);
    }
  }
</style>
