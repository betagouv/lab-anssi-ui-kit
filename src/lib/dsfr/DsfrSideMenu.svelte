<svelte:options
  customElement={{
    tag: "dsfr-side-menu",
    props: {
      title: { attribute: "title", type: "String" },
      items: { attribute: "items", type: "Object" },
      buttonLabel: { attribute: "button-label", type: "String" },
      buttonId: { attribute: "button-id", type: "String" },
      titleId: { attribute: "title-id", type: "String" },
      hasTitle: { attribute: "has-title", type: "Boolean" },
      modifier: { attribute: "modifier", type: "String" },
    },
  }}
/>

<script lang="ts">
  type MenuItem = {
    id: string;
    label: string;
    href?: string;
    type?: "link" | "menu";
    active?: boolean;
    markup?: "a" | "button";
    isCollapsible?: boolean;
    collapseId?: string;
    items?: MenuItem[];
    attributes?: Record<string, string>;
  };
  type Modifier = "default" | "sticky" | "right" | "sticky-full-height";
  interface Props {
    /** Titre du menu latéral */
    title: string;
    /** Items du menu */
    items: MenuItem[];
    /** Titre du bouton accordéon en mobile */
    buttonLabel: string;
    /** Id du bouton accordéon en mobile */
    buttonId: string;
    /** Id du titre du menu latéral */
    titleId?: string;
    /** Si true, ajoute un titre au menu latéral */
    hasTitle?: boolean;
    /** Modifier de style de sidemenu */
    modifier?: Modifier;
  }

  let { title, titleId, hasTitle = true, items, modifier, buttonLabel, buttonId }: Props = $props();

  const COLLAPSE_ID_PREFIX = "sidemenu-collapse-";

  let modifierClass = $derived(`fr-sidemenu--${modifier}`);

  function isLink(item: MenuItem) {
    return item.type === "link" || (item.type === "menu" && !item.isCollapsible);
  }

  function setCollapseId(collapseId: string | undefined, index: number): string {
    return collapseId ? `${collapseId}-${index}` : `${COLLAPSE_ID_PREFIX}-${index}`;
  }

  const getMarkup = (item: MenuItem) => (isLink(item) ? "a" : "button");

  function handleClick(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const ariaExpanded = button.ariaExpanded;
    const ariaControls = button.getAttribute("aria-controls");
    const isExpanded = ariaExpanded === "true";
    button.ariaExpanded = (!isExpanded).toString();

    const collapseElement = ariaControls ? document.getElementById(ariaControls) : null;
    if (collapseElement) {
      if (isExpanded) {
        collapseElement.classList.remove("fr-collapse--expanded");
      } else {
        collapseElement.classList.add("fr-collapse--expanded");
      }
    }
  }
</script>

{#snippet listItem(item: MenuItem, index: number)}
  <li class="fr-sidemenu__item">
    <svelte:element
      this={getMarkup(item)}
      class={[isLink(item) ? "fr-sidemenu__link" : "fr-sidemenu__btn"]}
      href={isLink(item) ? item.href : undefined}
      type={!isLink(item) ? "button" : undefined}
      aria-expanded={!isLink(item) && item.isCollapsible ? "false" : undefined}
      aria-controls={!isLink(item) ? setCollapseId(item.collapseId, index) : undefined}
      aria-current={item.active ? (isLink(item) ? "page" : true) : undefined}
      onclick={handleClick}
      {...item.attributes}
    >
      {item.label}
    </svelte:element>
    {#if item.type === "menu" && item.isCollapsible && item.collapseId}
      <div id={setCollapseId(item.collapseId, index)} class={[item.collapseId && "fr-collapse"]}>
        {#if item.items && item.items.length > 0}
          <ul class="fr-sidemenu__list">
            {#each item.items as subItem, subIndex (subItem.id)}
              {@render listItem(subItem, subIndex)}
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </li>
{/snippet}

<nav class={["fr-sidemenu", modifierClass]} role="navigation" aria-labelledby={titleId}>
  <div class="fr-sidemenu__inner">
    <button
      aria-expanded="false"
      aria-controls={buttonId}
      type="button"
      class="fr-sidemenu__btn"
      onclick={handleClick}
    >
      {buttonLabel}
    </button>
    <div class="fr-collapse" id={buttonId}>
      {#if hasTitle && title}
        <p class="fr-sidemenu__title" id={titleId}>
          {title}
        </p>
      {/if}

      <ul class="fr-sidemenu__list">
        {#each items as item, index (item.id)}
          {@render listItem(item, index)}
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/src/dsfr/component/sidemenu/main" as *;

  .fr-sidemenu {
    box-sizing: border-box;
  }
</style>
