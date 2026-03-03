<svelte:options
  customElement={{
    tag: "dsfr-table",
    props: {
      id: { attribute: "id", type: "String" },
      caption: { attribute: "caption", type: "String" },
      captionDetail: { attribute: "caption-detail", type: "String" },
      noCaption: { attribute: "no-caption", type: "Boolean" },
      captionBottom: { attribute: "caption-bottom", type: "Boolean" },
      bordered: { attribute: "bordered", type: "Boolean" },
      noScroll: { attribute: "no-scroll", type: "Boolean" },
      multiline: { attribute: "multiline", type: "Boolean" },
      layoutFixed: { attribute: "layout-fixed", type: "Boolean" },
      size: { attribute: "size", type: "String" },
      fixedFirstCellHead: { attribute: "fixed-first-cell-head", type: "Boolean" },
      hasHeader: { attribute: "has-header", type: "Boolean" },
      hasHeaderSegmented: { attribute: "has-header-segmented", type: "Boolean" },
      hasHeaderSearch: { attribute: "has-header-search", type: "Boolean" },
      hasHeaderDetails: { attribute: "has-header-details", type: "Boolean" },
      headerDetails: { attribute: "header-details", type: "String" },
      hasHeaderButtons: { attribute: "has-header-buttons", type: "Boolean" },
      table: { attribute: "table", type: "Object" },
      columns: { attribute: "columns", type: "Array" },
      rows: { attribute: "rows", type: "Array" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type TableSize = Extract<Size, "sm" | "md" | "lg">;
  type CellSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
  type CellAlign = "left" | "center" | "right";
  type CellValign = "top" | "bottom";
  type FixedBreakpoint = "sm" | "md" | "lg";

  interface TheadCell {
    /** Contenu textuel de la cellule */
    content: string;
    /** Largeur minimale de la colonne (fr-col--[size]) */
    size?: CellSize;
    /** Alignement horizontal du texte */
    align?: CellAlign;
    /** Alignement vertical du contenu */
    valign?: CellValign;
    /** Fixe la colonne en sticky. Passer un breakpoint pour l'activer uniquement à partir de celui-ci */
    fixed?: boolean | FixedBreakpoint;
    /** Indique que la colonne est triable (fr-cell--sort) */
    sort?: boolean;
    /** Affiche le contenu en flex inline (fr-cell--inline) */
    inline?: boolean;
    /** Autorise le retour à la ligne dans cette cellule (fr-cell--multiline) */
    multiline?: boolean;
  }

  interface TbodyCell {
    /** Contenu textuel de la cellule */
    content: string;
    /** Alignement horizontal du texte */
    align?: CellAlign;
    /** Alignement vertical du contenu */
    valign?: CellValign;
    /** Fixe la colonne en sticky. Passer un breakpoint pour l'activer uniquement à partir de celui-ci */
    fixed?: boolean | FixedBreakpoint;
    /** Affiche le contenu en flex inline (fr-cell--inline) */
    inline?: boolean;
    /** Autorise le retour à la ligne dans cette cellule (fr-cell--multiline) */
    multiline?: boolean;
  }

  interface Table {
    thead: TheadCell[][];
    tbodies: TbodyCell[][][];
  }

  interface Column {
    key: string;
    label: string;
    size?: CellSize;
    align?: CellAlign;
    valign?: CellValign;
    fixed?: boolean | FixedBreakpoint;
    sort?: boolean;
    inline?: boolean;
    multiline?: boolean;
  }

  type Row = Record<string, string>;

  export interface Props {
    /** Id du tableau */
    id?: string;
    /** Titre du tableau */
    caption: string;
    /** Description précise du tableau */
    captionDetail?: string;
    /** Cache le texte de la caption (reste présent pour l'accessibilité) */
    noCaption?: boolean;
    /** Positionne la caption en bas du tableau */
    captionBottom?: boolean;
    /** Ajoute des séparateurs verticaux entre chaque colonne */
    bordered?: boolean;
    /** Désactive le scroll horizontal */
    noScroll?: boolean;
    /** Active le retour à la ligne dans toutes les cellules du tableau */
    multiline?: boolean;
    /** Fixe la mise en page du tableau (table-layout: fixed) */
    layoutFixed?: boolean;
    /** Taille des espacements internes des cellules */
    size?: TableSize;
    /** Fixe la première cellule de l'en-tête en sticky */
    fixedFirstCellHead?: boolean;
    /** Affiche la section en-tête du tableau */
    hasHeader?: boolean;
    /** Affiche un contrôle segmenté dans l'en-tête */
    hasHeaderSegmented?: boolean;
    /** Affiche une barre de recherche dans l'en-tête */
    hasHeaderSearch?: boolean;
    /** Affiche un texte de détail dans l'en-tête */
    hasHeaderDetails?: boolean;
    /** Texte de détail affiché dans l'en-tête */
    headerDetails?: string;
    /** Affiche des boutons d'actions dans l'en-tête */
    hasHeaderButtons?: boolean;
    /** Données du tableau (source par défaut pour columns et rows) */
    table?: Table;
    /** Données des colonnes. Prends le pas sur `table.thead` si défini */
    columns?: Column[];
    /** Données des lignes. Prends le pas sur `table.tbodies` si défini */
    rows?: Row[];
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
    layoutFixed = false,
    size = "md",
    fixedFirstCellHead = false,
    hasHeader = false,
    hasHeaderSegmented = false,
    hasHeaderSearch = false,
    hasHeaderDetails = false,
    headerDetails,
    hasHeaderButtons = false,
    table,
    columns,
    rows,
  }: Props = $props();

  let captionEl: HTMLElement | undefined = $state();
  let tableOffset = $state("0");

  $effect(() => {
    if (!captionEl || noCaption) {
      tableOffset = "0";
      return;
    }

    const updateOffset = () => {
      const captionHeight = captionEl.getBoundingClientRect().captionHeight;
      tableOffset = `calc(${captionHeight}px + 1rem)`;
    };

    const observer = new ResizeObserver(updateOffset);
    observer.observe(captionEl);
    updateOffset();

    return () => observer.disconnect();
  });

  let computedThead = $derived(
    columns
      ? [
          columns.map((col) => ({
            content: col.label,
            size: col.size,
            align: col.align,
            valign: col.valign,
            fixed: col.fixed,
            sort: col.sort,
            inline: col.inline,
            multiline: col.multiline,
          })),
        ]
      : (table?.thead ?? []),
  );

  let computedTbodies = $derived(
    rows && columns
      ? [
          rows.map((row) =>
            columns.map((col) => ({
              content: row[col.key] ?? "",
              align: col.align,
              valign: col.valign,
              fixed: col.fixed,
              inline: col.inline,
              multiline: col.multiline,
            })),
          ),
        ]
      : (table?.tbodies ?? []),
  );

  /**
   * Génère les classes CSS applicables à une cellule de tableau en fonction de ses propriétés.
   *
   * @param {TheadCell | TbodyCell} cell - La cellule dont les classes doivent être générées
   * @param {boolean} [isHeader=false] - Indique si la cellule est un en-tête de colonne
   * @param {boolean} [forceFixed=false] - Force l'application de la classe de cellule fixe
   * @returns {string[]} Un tableau contenant les classes CSS à appliquer à la cellule
   */
  function getCellClasses(
    cell: TheadCell | TbodyCell,
    isHeader = false,
    forceFixed = false,
  ): string[] {
    const classes: string[] = [];

    if ("size" in cell && cell.size) classes.push(`fr-col--${cell.size}`);
    if (cell.align === "center") classes.push("fr-cell--center");
    if (cell.align === "right") classes.push("fr-cell--right");
    if (cell.valign === "top") classes.push("fr-cell--top");
    if (cell.valign === "bottom") classes.push("fr-cell--bottom");

    if (forceFixed || cell.fixed === true) classes.push("fr-cell--fixed");
    else if (typeof cell.fixed === "string") classes.push(`fr-cell--fixed@${cell.fixed}`);

    if (cell.inline) classes.push("fr-cell--inline");
    if (cell.multiline) classes.push("fr-cell--multiline");
    if (isHeader && "sort" in cell && cell.sort) classes.push("fr-cell--sort");

    return classes;
  }
</script>

<div
  id={id ? `${id}-component` : undefined}
  class={["fr-table", `fr-table--${size}`]}
  class:fr-table--no-caption={noCaption}
  class:fr-table--caption-bottom={!noCaption && captionBottom}
  class:fr-table--bordered={bordered}
  class:fr-table--no-scroll={noScroll}
  class:fr-table--multiline={multiline}
  class:fr-table--layout-fixed={layoutFixed}
  data-fr-js-table="true"
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

      <slot name="tableheader"></slot>
    </div>
  {/if}

  <div class="fr-table__wrapper" style={`--table-offset: ${tableOffset};`}>
    <div class="fr-table__container">
      <div class="fr-table__content">
        <slot name="tablecontent">
          <table {id}>
            <caption>
              {caption}
              {#if captionDetail}
                <div class="fr-table__caption__desc">{captionDetail}</div>
              {/if}
            </caption>

            {#if computedThead?.length}
              <thead>
                {#each computedThead as row, rowIndex (rowIndex)}
                  <tr>
                    {#each row as cell, colIndex (colIndex)}
                      <th
                        scope="col"
                        class={getCellClasses(
                          cell,
                          true,
                          fixedFirstCellHead && rowIndex === 0 && colIndex === 0,
                        )}
                      >
                        {cell.content}
                      </th>
                    {/each}
                  </tr>
                {/each}
              </thead>
            {/if}

            {#each computedTbodies as tbody, tIndex (tIndex)}
              <tbody>
                {#each tbody as row, index (index)}
                  <tr id={`${id}-row-key-${index}`} data-row-key={index}>
                    {#each row as cell, cellIndex (cellIndex)}
                      <td class={getCellClasses(cell)}>
                        {cell.content}
                      </td>
                    {/each}
                  </tr>
                {/each}
              </tbody>
            {/each}
          </table>
        </slot>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/dist/component/table/table.main.css";
</style>
