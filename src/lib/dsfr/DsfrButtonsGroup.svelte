<svelte:options
  customElement={{
    tag: "dsfr-buttons-group",
    props: {
      size: { attribute: "size", type: "String" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      iconPlace: { attribute: "icon-place", type: "String" },
      groupMarkup: { attribute: "group-markup", type: "String" },
      inline: { attribute: "inline", type: "String" },
      equisized: { attribute: "equisized", type: "Boolean" },
      align: { attribute: "align", type: "String" },
      reverse: { attribute: "reverse", type: "Boolean" },
      buttons: { attribute: "buttons", type: "Object" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass, setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type ButtonsGroupSize = Extract<Size, "sm" | "md" | "lg">;
  type Button = {
    label: string;
    disabled?: boolean;
    icon?: string;
    id?: string;
    kind?: string;
    preset?: string;
    title?: string;
    href?: string;
    blank?: boolean;
  };
  interface Props {
    /** Taille des boutons */
    size?: ButtonsGroupSize;
    /** Les boutons ont une icône */
    hasIcon?: boolean;
    /** Emplacement de l'icône<br>Si non défini alors que le paramètre icon est défini, bouton avec icône seule, sans label<br>valeurs :<br>- left : icône à gauche du label<br>- right : icône à droite du label */
    iconPlace?: "only" | "left" | "right";
    /** Type de balise HTML pour la liste du groupe de boutons */
    groupMarkup?: "ul" | "div";
    /** Disposition des boutons<br>Valeurs:<br>- Vertical : les boutons sont disposés les uns en dessous des autres<br>- en ligne : les boutons sont disposés les uns à côté des autres<br>- En ligne à partir du breakpoint sm : les boutons sont disposés les uns à côté des autres à partir du breakpoint sm<br>- En ligne à partir du breakpoint md : les boutons sont disposés les uns à côté des autres à partir du breakpoint md<br>- En ligne à partir du breakpoint lg : les boutons sont disposés les uns à côté des autres à partir du breakpoint lg */
    inline?: "false" | "true" | "sm" | "md" | "lg";
    /** Les boutons ont la même largeur. Fixe la largeur des boutons à celle du plus grand bouton du groupe. */
    equisized?: boolean;
    /** Alignement horizontal des boutons dans le groupe */
    align?: "left" | "center" | "right";
    /** Inverse l'ordre des boutons en ligne lorsqu'ils sont spécifiquement alignés à droite */
    reverse?: boolean;
    /** Liste de boutons */
    buttons?: Button[];
  }

  let {
    size = "md",
    hasIcon = false,
    iconPlace = "left",
    groupMarkup = "ul",
    inline = "false",
    equisized = false,
    align = "left",
    reverse = false,
    buttons = [],
  }: Props = $props();

  const alignClass = $derived.by(() => {
    if (!inline) return "";

    switch (align) {
      case "center":
        return "fr-btns-group--center";
      case "right":
        return reverse
          ? "fr-btns-group--right fr-btns-group--inline-reverse"
          : "fr-btns-group--right";
      default:
        return "fr-btns-group--left";
    }
  });
  const equisizedClass = $derived(equisized && "fr-btns-group--equisized");
  const iconClass = $derived(hasIcon && iconPlace !== "only" && `fr-btns-group--icon-${iconPlace}`);
  const inlineClass = $derived.by(() => {
    switch (inline) {
      case "true":
        return "fr-btns-group--inline";
      case "sm":
        return "fr-btns-group--inline-sm";
      case "md":
        return "fr-btns-group--inline-md";
      case "lg":
        return "fr-btns-group--inline-lg";
      default:
        return "";
    }
  });

  function setButtonClass(btn: Button) {
    let classes = [];

    if (btn.kind) {
      classes.push(`fr-btn--${btn.kind}`);
    }

    if (btn.preset) {
      classes.push(`fr-btn--${btn.preset}`);
    }

    if (hasIcon && btn.icon) {
      classes.push(setIconClass(btn.icon));
    }

    return classes;
  }
</script>

{#snippet dsfrbutton(btn)}
  <svelte:element
    this={btn.href ? "a" : "button"}
    type={!btn.href ? "button" : undefined}
    href={btn.href}
    target={btn.blank ? "_blank" : undefined}
    class={["fr-btn", setButtonClass(btn)]}
    disabled={btn.disabled}
    id={btn.id}
    title={btn.title}
  >
    {btn.label}
  </svelte:element>
{/snippet}

<svelte:element
  this={groupMarkup}
  class={[
    "fr-btns-group",
    `fr-btns-group--${size}`,
    alignClass,
    equisizedClass,
    iconClass,
    inlineClass,
  ]}
>
  {#each buttons as button, index (index)}
    {#if groupMarkup === "ul"}
      <li>
        {@render dsfrbutton(button)}
      </li>
    {:else}
      {@render dsfrbutton(button)}
    {/if}
  {/each}
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
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("btns-group");
  @include set-dsfr-sizing("btn") {
    @include set-border-radius();
  }
</style>
