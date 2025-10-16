<svelte:options
  customElement={{
    tag: "dsfr-button",
    props: {
      label: { attribute: "label", type: "String" },
      kind: { attribute: "kind", type: "String" },
      size: { attribute: "size", type: "String" },
      id: { attribute: "id", type: "String" },
      title: { attribute: "title", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      iconPlace: { attribute: "icon-place", type: "String" },
      markup: { attribute: "markup", type: "String" },
      type: { attribute: "type", type: "String" },
      href: { attribute: "href", type: "String" },
      target: { attribute: "target", type: "String" },
      centered: { attribute: "centered", type: "Boolean" },
      expandable: { attribute: "expandable", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Kind, Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type ButtonSize = Extract<Size, "sm" | "md" | "lg">;
  interface Props {
    /** Libellé du bouton */
    label: string;
    /** Type du bouton */
    kind?: Kind;
    /** Taille du bouton */
    size?: ButtonSize;
    /** Attribut 'id' du bouton */
    id?: string;
    /** Attribut 'title' du bouton */
    title?: string;
    /** Le bouton est désactivé */
    disabled?: boolean;
    /** Le bouton a une icône */
    hasIcon?: boolean;
    /** Nom de l'icône dans le bouton */
    icon?: string;
    /** Emplacement de l'icône<br>Si non défini alors que le paramètre icon est défini, bouton avec icône seule, sans label<br>valeurs :<br>- left : icône à gauche du label<br>- right : icône à droite du label */
    iconPlace?: "only" | "left" | "right";
    /** Type de balise HTML */
    markup?: "button" | "a" | "input";
    /** Type de bouton */
    type?: "button" | "submit" | "reset";
    /** Lien de destination */
    href?: string;
    /** Cible du lien */
    target?: "_self" | "_blank";
    /** Centre le bouton et lui affecte une largeur de 100% du conteneur */
    centered?: boolean | undefined;
    /** Détermine si le bouton est utilisé comme déclencheur d'un élément extensible */
    expandable?: boolean | undefined;
  }

  const {
    disabled,
    hasIcon,
    href,
    icon,
    iconPlace = "left",
    id,
    kind = "primary",
    label,
    markup = "button",
    size = "md",
    target = "_self",
    title,
    type = "button",
    centered = false,
    expandable = false,
    ...restProps
  }: Props = $props();

  function setButtonType(markup: string) {
    if (markup === "button" || markup === "input") return type;
    return undefined;
  }

  const iconClass = $derived<boolean | string>(hasIcon && icon && setIconClass(icon));
  const isCentered = $derived.by(() => {
    if (hasIcon && iconPlace === "only") return false;

    return centered;
  });

  function handleClickAction(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
  }
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
  class:fr-btn--centered={isCentered}
  aria-expanded={expandable ? "false" : undefined}
  {...restProps}
>
  <slot>{label}</slot>
</svelte:element>

<style lang="scss">
  // DSFR Modules
  @use "src/module/color";
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

  @include set-shadow-host("inline-flex") {
    &:has(.fr-btn--centered) {
      --component-width: 100%;
      justify-content: center;
    }
  }

  @include set-dsfr-sizing("btn") {
    width: var(--component-width, fit-content);

    &--tertiary {
      &,
      &-no-outline {
        &[aria-expanded="true"] {
          @include color.background(
            open blue-france,
            (
              legacy: false,
            )
          );
        }
      }
    }

    &--secondary {
      --hover: var(--background-default-grey-hover);
      --active: var(--background-default-grey-active);
    }

    &--inverted-primary {
      --hover: var(--background-default-grey-hover);
      --active: var(--background-default-grey-active);
      background-color: var(--background-default-grey);
      box-shadow: inset 0 0 0 1px var(--background-default-grey);
      color: var(--text-action-high-blue-france);
    }

    &--inverted-secondary {
      --hover: var(--background-transparent-hover, rgb(255 255 255 / 8%));
      --active: var(--background-transparent-active, rgb(255 255 255 / 16%));
      box-shadow: inset 0 0 0 1px var(--background-default-grey);
      color: var(--text-inverted-grey);
    }

    &--centered {
      --component-width: 100%;
      justify-content: center;
    }
  }
</style>
