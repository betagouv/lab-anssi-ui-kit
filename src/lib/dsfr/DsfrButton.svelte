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
</script>

<svelte:element
  this={markup}
  {id}
  type={setButtonType(markup)}
  href={markup === "a" ? href : undefined}
  target={markup === "a" ? target : undefined}
  {disabled}
  {title}
  class={["fr-btn", iconClass]}
  class:fr-btn--primary={kind === "primary"}
  class:fr-btn--secondary={kind === "secondary"}
  class:fr-btn--tertiary={kind === "tertiary"}
  class:fr-btn--tertiary-no-outline={kind === "tertiary-no-outline"}
  class:fr-btn--inverted={kind === "inverted"}
  class:fr-btn--sm={size === "sm"}
  class:fr-btn--md={size === "md"}
  class:fr-btn--lg={size === "lg"}
  class:fr-btn--icon-left={hasIcon && iconPlace === "left"}
  class:fr-btn--icon-right={hasIcon && iconPlace === "right"}
>
  {label}
</svelte:element>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/dist/component/button/button.min.css";
  @use "./icones" as *;

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

    // Inclus les icônes utilisables dans les boutons
    @include icone(arrow-down-s-line, "arrows");
    @include icone(arrow-left-s-line, "arrows");
    @include icone(arrow-right-line, "arrows");
    @include icone(arrow-right-s-line, "arrows");
    @include icone(arrow-up-line, "arrows");
    @include icone(fr--arrow-left-s-first-line, "arrows");
    @include icone(fr--arrow-right-s-last-line, "arrows");
    @include icone(add-line, "system");
    @include icone(close-circle-line, "system");
    @include icone(close-line, "system");
    @include icone(delete-bin-line, "system");
    @include icone(external-link-line, "system");
    @include icone(menu-fill, "system");
    @include icone(search-line, "system");
    @include icone(user-add-line, "system");
  }
</style>
