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
    href,
    target = "self",
    id,
  }: Props = $props();

  function setButtonType(markup: string) {
    if (markup === "button" || markup === "input") return type;
    return undefined;
  }

  let iconClass = $derived.by(() => {
    return hasIcon && icon && setIconClass(icon);
  });
  let iconPlaceClass = $derived.by(() => {
    return hasIcon && iconPlace !== "only" && `fr-btn--icon-${iconPlace}`;
  });
  let kindClass = $derived(`fr-btn--${kind}`);
  let sizeClass = $derived(`fr-btn--${size}`);
</script>

<svelte:element
  this={markup}
  {id}
  type={setButtonType(markup)}
  href={markup === "a" ? href : undefined}
  target={markup === "a" ? target : undefined}
  {disabled}
  class={["fr-btn", iconClass, iconPlaceClass, kindClass, sizeClass]}
>
  {label}
</svelte:element>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/button/main" as *;

  .fr-btn {
    box-sizing: border-box;

    &--inverted {
      --hover: var(--background-default-grey-hover);
      --active: var(--background-default-grey-active);

      background-color: var(--background-default-grey);
      box-shadow: inset 0 0 0 1px var(--background-default-grey);
      color: var(--text-action-high-blue-france);
    }
  }
</style>
