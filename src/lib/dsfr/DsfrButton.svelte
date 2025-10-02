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
    target: "self" | "blank";
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
    target = "self",
    title = "",
    type = "button",
  }: Props = $props();

  function setButtonType(markup: string) {
    if (markup === "button" || markup === "input") return type;
    return undefined;
  }

  const iconClass = $derived<boolean | string>(hasIcon && icon && setIconClass(icon));
  let iconPlaceClass = $derived.by(() => {
    return hasIcon && iconPlace !== "only" && `fr-btn--icon-${iconPlace}`;
  });
</script>

<svelte:element
  this={markup}
  {id}
  type={setButtonType(markup)}
  href={markup === "a" ? href : undefined}
  target={markup === "a" ? target : undefined}
  {disabled}
  {title}
  class={["fr-btn", `fr-btn--${kind}`, `fr-btn--${size}`, iconClass, iconPlaceClass]}
>
  {label}
</svelte:element>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/utility/main";
  @use "@gouvfr/dsfr/src/dsfr/component/button/main" as *;

  .fr-btn {
    box-sizing: border-box;
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
