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
  let collapseElement: HTMLDivElement;
  let triggerButton: HTMLButtonElement;

  const COLLAPSE_ID_PREFIX = "sidemenu-collapse-";

  let modifierClass = $derived(`fr-sidemenu--${modifier}`);

  function isLink(item: MenuItem) {
    return item.type === "link" || (item.type === "menu" && !item.isCollapsible);
  }

  function setCollapseId(collapseId: string | undefined, index: number): string {
    return collapseId ? `${collapseId}-${index}` : `${COLLAPSE_ID_PREFIX}-${index}`;
  }

  const getMarkup = (item: MenuItem) => (isLink(item) ? "a" : "button");

  function handleClickNode(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const ariaExpanded = button.ariaExpanded;
    const ariaControls = button.getAttribute("aria-controls");
    const isExpanded = ariaExpanded === "true";
    button.ariaExpanded = (!isExpanded).toString();

    if (!isExpanded) {
      replieAutresMenusDuMemeNiveau(button);
    }

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

  function handleClickLeaf(event: MouseEvent) {
    triggerButton.ariaExpanded = "false";
    collapseElement.ariaExpanded = "false";
    replieTousLesItems();
    collapseElement.classList.remove("fr-collapse--expanded");
  }

  function replieTousLesItems() {
    collapseElement
      .querySelectorAll(".fr-collapse")
      .forEach((element) => element.classList.remove("fr-collapse--expanded"));
    collapseElement
      .querySelectorAll(".fr-sidemenu__btn")
      .forEach((element) => (element.ariaExpanded = "false"));
  }

  function replieAutresMenusDuMemeNiveau(button: HTMLButtonElement) {
    const autreBoutons = button.parentElement.parentElement
      .querySelectorAll(`:scope > * > button`)
      .values()
      .filter(
        (bouton) => bouton.getAttribute("aria-controls") !== button.getAttribute("aria-controls"),
      );
    autreBoutons.forEach((autreBouton) => {
      autreBouton.ariaExpanded = "false";
      const collapseElement = autreBouton.parentElement.querySelector(
        `#${autreBouton.getAttribute("aria-controls")}`,
      );
      collapseElement?.classList.remove("fr-collapse--expanded");
    });
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
      onclick={item.isCollapsible ? handleClickNode : handleClickLeaf}
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
      onclick={handleClickNode}
      bind:this={triggerButton}
    >
      {buttonLabel}
    </button>
    <div class="fr-collapse" id={buttonId} bind:this={collapseElement}>
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
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/sidemenu/sidemenu.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("sidemenu") {
    &,
    &__inner {
      height: inherit;
    }
  }
</style>
