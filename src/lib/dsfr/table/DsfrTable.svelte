<svelte:options
  customElement={{
    tag: "dsfr-table",
    props: {
      isExpanded: { attribute: "is-expanded", type: "Boolean" },
      id: { attribute: "id", type: "String" },
      caption: { attribute: "caption", type: "String" },
      captionDetail: { attribute: "caption-detail", type: "String" },
      noCaption: { attribute: "no-caption", type: "Boolean" },
      captionBottom: { attribute: "caption-bottom", type: "Boolean" },
      bordered: { attribute: "bordered", type: "Boolean" },
      noScroll: { attribute: "no-scroll", type: "Boolean" },
      multiline: { attribute: "multiline", type: "Boolean" },
      size: { attribute: "size", type: "String" },
      hasHeader: { attribute: "has-header", type: "Boolean" },
      hasHeaderSegmented: { attribute: "has-header-segmented", type: "Boolean" },
      hasHeaderSearch: { attribute: "has-header-search", type: "Boolean" },
      hasHeaderDetails: { attribute: "has-header-details", type: "Boolean" },
      headerDetails: { attribute: "header-details", type: "String" },
      hasHeaderButtons: { attribute: "has-header-buttons", type: "Boolean" },
      hasFooter: { attribute: "has-footer", type: "Boolean" },
      hasFooterSelect: { attribute: "has-footer-select", type: "Boolean" },
      hasFooterPagination: { attribute: "has-footer-pagination", type: "Boolean" },
      hasFooterButtons: { attribute: "has-footer-buttons", type: "Boolean" },
      table: { attribute: "table", type: "Object" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  import DsfrPagination from "$lib/dsfr/DsfrPagination.svelte";
  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  setThemeable($host());

  type TableSize = Extract<Size, "sm" | "md" | "lg">;

  interface Thead {
    content: string;
  }

  interface Tbody {
    content: string;
  }

  interface Table {
    thead: Thead[][];
    tbodies: Tbody[][][];
  }

  export interface Props {
    /** Id du tableau */
    id: string;
    /** Titre du tableau */
    caption: string;
    /** Description précise du tableau */
    captionDetail?: string;
    /** Cache le texte de la caption */
    noCaption?: boolean;
    /** Positionne la caption en bas */
    captionBottom?: boolean;
    /** ajoute des séparateurs entre chaque ligne */
    bordered?: boolean;
    /** Désactive le scroll horizontal */
    noScroll?: boolean;
    /** Active le mode multi-lignes pour les cellules du tableau */
    multiline?: boolean;
    /** Taille des espacements du tableau */
    size?: TableSize;
    /** Affiche un exemple d'en-tête du tableau */
    hasHeader?: boolean;
    /** Affiche un contrôle segmenté dans l'en-tête du tableau */
    hasHeaderSegmented?: boolean;
    /** Affiche une barre de recherche dans l'en-tête du tableau */
    hasHeaderSearch?: boolean;
    /** Affiche un detail dans l'en-tête du tableau */
    hasHeaderDetails?: boolean;
    /** Detail dans l'en-tête du tableau */
    headerDetails?: string;
    /** Affiche des boutons d'actions dans l'en-tête du tableau */
    hasHeaderButtons?: boolean;
    /** Affiche un exemple de pied de page du tableau */
    hasFooter?: boolean;
    /** Affiche le nombre d'éléments par page dans le pied de page du tableau */
    hasFooterSelect?: boolean;
    /** Affiche la pagination dans le pied de page du tableau */
    hasFooterPagination?: boolean;
    /** Affiche des boutons d'actions dans le pied de page du tableau */
    hasFooterButtons?: boolean;
    /** contenu du tableau */
    table?: Table;
    /** Nombre de lignes par page dans la pagination */
    itemsPerPage: number[];
  }

  let {
    id,
    caption,
    captionDetail,
    noCaption = false,
    captionBottom = false,
    bordered = false,
    noScroll = false,
    multiline = false,
    size = "md",
    hasHeader = false,
    hasHeaderSegmented = false,
    hasHeaderSearch = false,
    hasHeaderDetails = false,
    headerDetails,
    hasHeaderButtons = false,
    hasFooter = false,
    hasFooterSelect = false,
    hasFooterPagination = false,
    hasFooterButtons = false,
    table,
    itemsPerPage = [5, 10, 20],
  }: Props = $props();

  let tableData = $derived(table);
  let nbRows = $derived(tableData?.tbodies[0].length);

  let pages = [
    {
      label: "1",
      title: "Page 1",
      href: "#",
      displayedLg: false,
    },
    {
      label: "2",
      title: "Page 2",
      href: "#",
      displayedLg: false,
    },
    {
      label: "3",
      title: "Page 3",
      href: "#",
      displayedLg: true,
    },
    {
      markup: "span",
      label: "…",
      title: null,
      href: "#",
      displayedLg: true,
    },
    {
      label: "130",
      title: "Page 130",
      href: "#",
      displayedLg: true,
    },
    {
      label: "131",
      title: "Page 131",
      href: "#",
      displayedLg: true,
    },
    {
      label: "132",
      title: "Page 132",
      href: "#",
      displayedLg: false,
    },
  ];

  const first = {
    label: "Première page",
    title: "Première page",
    href: "#",
    displayedLg: false,
  };

  const last = {
    label: "Dernière page",
    title: "Dernière page",
    href: "#",
    displayedLg: false,
  };

  const prev = {
    label: "Page précédente",
    title: "Page précédente",
    href: "#",
    displayedLg: false,
    hasLgLabel: true,
  };

  const next = {
    label: "Page suivante",
    title: "Page suivante",
    href: "#",
    displayedLg: false,
    hasLgLabel: true,
  };
</script>

<div
  id={`${id}-component`}
  class={["fr-table", `fr-table--${size}`]}
  class:fr-table--no-caption={noCaption}
  class:fr-table--caption-bottom={!noCaption && captionBottom}
  class:fr-table--bordered={bordered}
  class:fr-table--no-scroll={noScroll}
  class:fr-table--multiline={multiline}
  data-fr-js-table="true"
  style="--table-offset: 0;"
>
  {#if hasHeader}
    <div class="fr-table__header">
      {#if hasHeaderSegmented}
        <slot name="headersegmented"></slot>
      {/if}

      {#if hasHeaderSearch}
        <slot name="headersearch"></slot>
      {/if}

      {#if hasHeaderDetails && headerDetails}
        <p class="fr-table__detail">{headerDetails}</p>
      {/if}

      {#if hasHeaderButtons}
        <slot name="headerbuttons"></slot>
      {/if}
    </div>
  {/if}

  <div
    class="fr-table__wrapper"
    data-fr-js-table-wrapper="true"
    style="--table-offset: calc(32px + 1rem);"
  >
    <div class="fr-table__container">
      <div class="fr-table__content">
        <table {id} data-fr-js-table-element="true">
          <caption data-fr-js-table-caption="true">
            {caption}

            {#if captionDetail}
              <div class="fr-table__caption__desc">{captionDetail}</div>
            {/if}
          </caption>

          {#each tableData?.thead as row}
            <thead>
              <tr>
                {#each row as cell}
                  <th>{cell.content}</th>
                {/each}
              </tr>
            </thead>
          {/each}

          {#each tableData?.tbodies as tbody}
            <tbody>
              {#each tbody as row, index (index)}
                <tr id={`${id}-row-key-${index}`} data-row-key={index}>
                  {#each row as cell}
                    <td>{cell.content}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          {/each}
        </table>
      </div>
    </div>
  </div>

  {#if hasFooter}
    <div class="fr-table__footer">
      {#if hasFooterSelect}
        <div class="fr-table__footer--start">
          <p class="fr-table__detail">{nbRows} {nbRows > 1 ? "lignes" : "ligne"}</p>

          <slot name="footerselect">
            {#if itemsPerPage.length > 1}
              <DsfrSelect
                id="table-footer-select"
                label="Nombre de lignes par page"
                placeholder="Nombre de lignes par page"
                hideLabel
                options={itemsPerPage.map((item) => ({
                  value: item.toString(),
                  label: `${item} lignes par page`,
                }))}
              />
            {/if}
          </slot>
        </div>
      {/if}

      {#if hasFooterPagination}
        <div class="fr-table__footer--middle">
          <div class="fr-table__footer--middle-wrapper">
            <slot name="footerpagination">
              <DsfrPagination {pages} />
            </slot>
          </div>
        </div>
      {/if}

      {#if hasFooterButtons}
        <div class="fr-table__footer--end">
          <div class="fr-table__footer--end-wrapper">
            <slot name="footerbuttons"></slot>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/table/table.min.css";
  // DSFR Core styles
  // @import "@gouvfr/dsfr/src/dsfr/core/index";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/button";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/motion/module";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/typography";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  // @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  // @include _core-scheme;
  // // DSFR Component styles
  // @import "@gouvfr/dsfr/src/dsfr/component/accordion/main";

  // @include set-shadow-host();
  // @include set-dsfr-sizing("accordion");

  @include set-dsfr-sizing("table") {
    &__footer {
      &--middle-wrapper {
        margin-block-start: 0.75rem;
      }

      &--end-wrapper {
        @media (min-width: 48em) {
          padding-inline-start: 0.5rem;
        }
      }
    }
  }
</style>
