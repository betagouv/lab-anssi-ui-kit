<svelte:options
  customElement={{
    tag: "dsfr-tags-group",
    props: {
      tags: { attribute: "tags", type: "Array" },
      type: { attribute: "type", type: "String" },
      size: { attribute: "size", type: "String" },
      groupMarkup: { attribute: "group-markup", type: "String" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  type TagsGroupSize = Extract<Size, "sm" | "md">;
  type TagType = "default" | "clickable" | "pressable" | "dismissible";
  type TagMarkup = "a" | "button" | "p";
  type Tag = {
    label: string;
    accent?: Accent;
    size: TagsGroupSize;
    href: string;
    icon: string;
    pressed: boolean;
    blank: boolean;
    disabled: boolean;
    id: string;
    type: TagType;
    markup: TagMarkup;
  };
  type GroupMarkup = "div" | "ul";
  interface Props {
    /** Liste des tags à afficher dans le groupe */
    tags: Tag[];
    /** Type des tags dans le groupe */
    type?: "default" | "clickable" | "pressable" | "dismissible";
    /** Taille des tags dans le groupe */
    size?: TagsGroupSize;
    /** Type de balise HTML pour la liste du groupe de tags */
    groupMarkup?: GroupMarkup;
    /** Si true, ajoute une icone dans le titre des onglets */
    hasIcon?: boolean;
  }

  let { tags, type = "default", size = "md", groupMarkup, hasIcon }: Props = $props();

  const dissmissClass = $derived.by(() => type === "dismissible" && "fr-tag--dismiss");
  const sizeClass = $derived(`fr-tags-group--${size}`);

  const markup: TagMarkup = $derived.by(() => {
    switch (type) {
      case "clickable":
        return "a";
      case "pressable":
      case "dismissible":
        return "button";
      default:
        return "p";
    }
  });

  let dispatch = createEventDispatcher<{ selected: string; unselected: string }>();

  const onpressed = (event: MouseEvent) => {
    let button = event.target as HTMLButtonElement;
    let ariaPressed = button.ariaPressed;
    const isPressed = ariaPressed === "true";
    button.ariaPressed = (!isPressed).toString();
    if (isPressed) {
      dispatch("unselected", button.id);
    } else {
      dispatch("selected", button.id);
    }
  };
</script>

{#snippet tagItem(tag: Tag)}
  <svelte:element
    this={markup}
    class={[
      "fr-tag",
      dissmissClass,
      hasIcon && tag.icon && `fr-tag--icon-left fr-icon-${tag.icon}`,
    ]}
    id={tag.id}
    href={type === "clickable" && !tag.disabled ? tag.href : undefined}
    type={type === "pressable" || type === "dismissible" ? "button" : undefined}
    aria-pressed={type === "pressable" ? "false" : undefined}
    onclick={type === "pressable" ? onpressed : undefined}
  >
    {tag.label}
  </svelte:element>
{/snippet}

<svelte:element this={groupMarkup} class={["fr-tags-group", sizeClass]}>
  {#each tags as tag}
    {#if groupMarkup === "ul"}
      <li>
        {@render tagItem(tag)}
      </li>
    {:else}
      {@render tagItem(tag)}
    {/if}
  {/each}
</svelte:element>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/tag/tag.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("tags-group");
</style>
