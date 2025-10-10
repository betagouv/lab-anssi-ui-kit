<script lang="ts">
  type MenuItem = {
    id: string;
    type?: "link" | "menu" | "mega-menu";
    active?: boolean;
    collapsable?: boolean;
    collapseId?: string;
    label: string;
    href?: string;
    items?: MenuItem[];
  };

  interface Props {
    /** Attribut id de la navigation principale */
    id: string;
    /** Attribut aria-label de la navigation principale */
    ariaLabel: string;
    /** Éléments de la navigation principale */
    items: MenuItem[];
  }

  let { id, ariaLabel, items = [] }: Props = $props();

  const COLLAPSE_ID_PREFIX = "navigation-collapse";
  const isLink = (item) => item.type === "link" || (item.type === "menu" && !item.collapsable);
  const getMarkup = (item: MenuItem) => (isLink(item) ? "a" : "button");

  function setCollapseId(collapseId: string | undefined, index: number): string {
    return collapseId ? `${collapseId}-${index}` : `${COLLAPSE_ID_PREFIX}-${index}`;
  }

  function handleClickNode(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const ariaExpanded = button.ariaExpanded;
    const ariaControls = button.getAttribute("aria-controls");
    const isExpanded = ariaExpanded === "true";
    button.ariaExpanded = (!isExpanded).toString();

    const collapseElement = ariaControls
      ? button.parentElement.querySelector(`#${ariaControls}`)
      : null;
    if (collapseElement) {
      if (isExpanded) {
        collapseElement.classList.remove("fr-collapse--expanded");
      } else {
        collapseElement.classList.add("fr-collapse--expanded");
      }
    }
  }
</script>

<nav {id} class="fr-nav" role="navigation" aria-label={ariaLabel}>
  {#if items && items.length > 0}
    <ul class="fr-nav__list">
      {#each items as item, index}
        <li class="fr-nav__item">
          <svelte:element
            this={getMarkup(item)}
            class={[isLink(item) ? "fr-nav__link" : "fr-nav__btn"]}
            href={isLink(item) ? item.href : undefined}
            id={item.id}
            type={!isLink(item) ? "button" : undefined}
            aria-expanded={!isLink(item) && item.collapsable ? "false" : undefined}
            aria-controls={!isLink(item) ? setCollapseId(item.collapseId, index) : undefined}
            aria-current={item.active ? (isLink(item) ? "page" : true) : undefined}
            role={!isLink(item) ? "button" : undefined}
            onclick={item.collapsable ? handleClickNode : undefined}
          >
            {item.label}
          </svelte:element>
          {#if item.type === "menu" && item.collapsable && item.collapseId}
            <div id={setCollapseId(item.collapseId, index)} class="fr-collapse fr-menu">
              {#if item.items && item.items.length > 0}
                <ul class="fr-menu__list">
                  {#each item.items as subItem, subIndex (subItem.id)}
                    <li>
                      <a id={subItem.id} href={subItem.href} class="fr-nav__link">
                        {subItem.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</nav>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/spacing/module/elevation";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/navigation/navigation.main.css";
  @import "@gouvfr/dsfr/dist/component/button/button.main.css";

  @include set-shadow-host("block");
  @include set-dsfr-sizing("nav") {
    position: relative;
  }
</style>
