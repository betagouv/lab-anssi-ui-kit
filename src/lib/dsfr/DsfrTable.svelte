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
      hasFooter: { attribute: "has-footer", type: "Boolean" },
      hasFooterSelect: { attribute: "has-footer-select", type: "Boolean" },
      hasFooterPagination: { attribute: "has-footer-pagination", type: "Boolean" },
      hasFooterButtons: { attribute: "has-footer-buttons", type: "Boolean" },
      table: { attribute: "table", type: "Object" },
      columns: { attribute: "columns", type: "Array" },
      rows: { attribute: "rows", type: "Array" },
      itemsPerPage: { attribute: "items-per-page", type: "Array" },
      totalRows: { attribute: "total-rows", type: "Number" },
      rich: { attribute: "rich", type: "Boolean" },
      selectable: { attribute: "selectable", type: "Boolean" },
      selectAll: { attribute: "select-all", type: "Boolean" },
      rowKey: { attribute: "row-key", type: "String" },
      selectedRowKeys: { attribute: "selected-row-keys", type: "Array" },
      disabledRowKeys: { attribute: "disabled-row-keys", type: "Array" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";
  import { setIndeterminate } from "$lib/directives/actions.svelte.ts";

  import DsfrPagination from "$lib/dsfr/DsfrPagination.svelte";
  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

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

  type Row = Record<string, unknown>;

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
    /**
     * Active le slot nommé `cell:<key>:<rowIndex>` uniquement sur les cellules de cette colonne.
     * Permet une activation granulaire de la personnalisation par light DOM, sans payer le coût
     * d'un `<slot>` par cellule sur les colonnes qui n'en ont pas besoin.
     *
     * Cumulatif avec la prop globale `rich` : si l'une des deux est `true`, le slot est activé.
     */
    rich?: boolean;
  }

  export interface Props {
    /** Titre du tableau */
    caption: string;
    /** Id du tableau */
    id?: string;
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
    /** Affiche la section pied de page du tableau */
    hasFooter?: boolean;
    /** Affiche le sélecteur de nombre de lignes par page */
    hasFooterSelect?: boolean;
    /** Affiche la pagination */
    hasFooterPagination?: boolean;
    /** Affiche des boutons d'actions dans le pied de page */
    hasFooterButtons?: boolean;
    /** Données du tableau (source par défaut pour columns et rows) */
    table?: Table;
    /** Données des colonnes. Prends le pas sur `table.thead` si défini */
    columns?: Column[];
    /** Données des lignes. Prends le pas sur `table.tbodies` si défini */
    rows?: Row[];
    /** Options permettant de définir le nombre de lignes par page */
    itemsPerPage?: number[];
    /**
     * Nombre total de lignes (mode pagination serveur).
     * Si fourni, désactive le slicing interne : le composant affiche les `rows` telles quelles
     * et délègue la gestion des données au parent via `onpagechanged` / `onrowsperpagechanged`.
     */
    totalRows?: number;
    /**
     * Callback appelé lors d'un changement de page.
     * En mode web component, un `CustomEvent<number>` `pagechanged` est également dispatché
     * sur l'élément (utilisable via `<dsfr-table onpagechanged={(e) => …}>`).
     */
    onpagechanged?: (page: number) => void;
    /**
     * Callback appelé lors d'un changement du nombre de lignes par page.
     * En mode web component, un `CustomEvent<number>` `rowsperpagechanged` est également dispatché
     * sur l'élément (utilisable via `<dsfr-table onrowsperpagechanged={(e) => …}>`).
     */
    onrowsperpagechanged?: (rowsPerPage: number) => void;
    /**
     * Active les slots nommés `cell:<colKey>:<rowIndex>` sur **toutes** les cellules du tableau,
     * permettant d'injecter du contenu personnalisé via le light DOM
     * (ex: `<div slot="cell:maColonne:0">…</div>`).
     *
     * Utile principalement en contexte web component.
     * Le rendu standard sert de fallback si aucun slot n'est fourni.
     *
     * ⚠️ Coût non-négligeable sur les gros tableaux : un `<slot>` est créé par cellule.
     * Pour une activation ciblée par colonne (sans payer le coût sur les autres),
     * utiliser plutôt `Column.rich` au cas par cas.
     */
    rich?: boolean;
    /**
     * Active la variation sélectionnable : ajoute une colonne de cases à cocher en début de chaque ligne.
     */
    selectable?: boolean;
    /**
     * Affiche une case à cocher « tout sélectionner » dans l'en-tête du tableau.
     * Permet de sélectionner/désélectionner toutes les lignes de la page courante.
     * L'état indéterminé s'active automatiquement quand une partie des lignes est sélectionnée.
     * Nécessite `selectable` pour être actif.
     */
    selectAll?: boolean;
    /**
     * Nom de la clé dans les objets `Row` à utiliser comme identifiant unique pour la sélection.
     * Si absent, l'index de la ligne est utilisé.
     */
    rowKey?: string;
    /**
     * Clés des lignes sélectionnées (mode contrôlé).
     * Si fourni, le composant utilise cette valeur ; sinon, il gère sa propre sélection en interne.
     */
    selectedRowKeys?: (string | number)[];
    /**
     * Clés des lignes désactivées.
     * Les lignes désactivées ont leur case à cocher `disabled` et sont ignorées
     * par la case « tout sélectionner ».
     */
    disabledRowKeys?: (string | number)[];
    /** Callback appelé lorsque la sélection change */
    onselectionchanged?: (selectedKeys: (string | number)[], selectedRows: Row[]) => void;
  }

  let wrapperEl: HTMLDivElement | undefined = $state();
  let captionEl: HTMLTableCaptionElement | undefined = $state();

  /**
   * Observateur de redimensionnement qui met à jour le décalage du tableau en fonction de la hauteur de la légende.
   * Calcule la hauteur de la légende et définit la variable CSS `--table-offset` pour ajuster l'espacement du wrapper.
   * Le callback `update` est appelé chaque fois que la légende change de taille.
   */
  $effect(() => {
    if (noCaption || !wrapperEl || !captionEl) {
      wrapperEl?.style.removeProperty("--table-offset");

      return;
    }

    const update = () => {
      wrapperEl!.style.removeProperty("--table-offset");

      const height = captionEl!.getBoundingClientRect().height;

      wrapperEl!.style.setProperty("--table-offset", `calc(${height}px + 1rem)`);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(captionEl);

    return () => observer.disconnect();
  });

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
    hasFooter = false,
    hasFooterSelect = false,
    hasFooterPagination = false,
    hasFooterButtons = false,
    table,
    columns,
    rows,
    itemsPerPage = [5, 10, 20],
    totalRows,
    onpagechanged,
    onrowsperpagechanged,
    rich = false,
    selectable = false,
    selectAll = false,
    rowKey,
    selectedRowKeys,
    disabledRowKeys,
    onselectionchanged,
  }: Props = $props();

  // Génère l'en-tête du tableau à partir de `columns` si fournies _(custom API)_, sinon à partir de `table` _(API DSFR)_.
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

  // Génère le corps du tableau à partir de `rows` et `columns` si fournies _(custom API)_, sinon à partir de `table` _(API DSFR)_.
  let computedTbodies = $derived(
    rows && columns
      ? [
          rows.map((row) =>
            columns.map((col) => ({
              content: row[col.key] != null ? String(row[col.key]) : "",
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

  // En mode serveur (présence de `totalRows`), le consommateur final gère le découpage, le composant lui affiche toutes les lignes reçues.
  // En mode client (mode par défaut), le composant calcule lui-même le nombre total depuis les données.
  let isServerSide = $derived(totalRows !== undefined);
  let nbRows = $derived(isServerSide ? (totalRows ?? 0) : (computedTbodies[0]?.length ?? 0));

  let rowsPerPage = $state(itemsPerPage[0]);
  let currentPage = $state(1);
  let totalPages = $derived(Math.ceil(nbRows / rowsPerPage));

  // Calcule les lignes à afficher en fonction du mode (serveur/client) et de la pagination
  let displayedRows = $derived.by(() => {
    const allRows = computedTbodies[0] ?? [];

    // En mode serveur, toutes les lignes reçues sont déjà filtrées par le parent
    if (isServerSide) return allRows;

    // Sans pagination ni sélection, afficher toutes les lignes
    if (!hasFooterSelect && !hasFooterPagination) return allRows;

    // Découper les lignes selon la page courante et le nombre de lignes par page
    return allRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  });

  let paginationPages = $derived(
    Array.from({ length: totalPages }, (_, i) => ({
      label: String(i + 1),
      title: `Page ${i + 1}`,
      href: "#",
      displayedLg: false,
    })),
  );

  /**
   * Gère le changement du nombre de lignes à afficher par page.
   * Réinitialise la page courante à 1 et émet l'événement associé.
   *
   * @param {string} value - La nouvelle valeur du nombre de lignes par page (sous forme de chaîne)
   */
  function handleRowsPerPageChange(value: string) {
    const newValue = parseInt(value, 10);

    rowsPerPage = newValue;
    currentPage = 1;

    onrowsperpagechanged?.(newValue);
    $host()?.dispatchEvent(
      new CustomEvent("rowsperpagechanged", { detail: newValue, bubbles: true }),
    );
  }

  /**
   * Gère le changement de page.
   * Met à jour la page courante et émet l'événement associé.
   *
   * @param {number} page - La nouvelle page courante
   */
  function handlePageChange(page: number) {
    currentPage = page;

    onpagechanged?.(page);
    $host()?.dispatchEvent(new CustomEvent("pagechanged", { detail: page, bubbles: true }));
  }

  /**
   * Récupère la clé d'une ligne.
   * En l'absence de `rowKey`, l'index de la ligne sert d'identifiant.
   *
   * @param row - La ligne dont on veut obtenir la clé
   * @param rowIndex - L'index de la ligne
   *
   * @returns La clé de la ligne (propriété `rowKey` ou index)
   */
  function getRowKey(row: Row, rowIndex: number): string | number {
    if (rowKey && row[rowKey] != null) return row[rowKey] as string | number;

    return rowIndex;
  }

  let internalSelectedKeys = $state<(string | number)[]>([]);

  let isSelectionControlled = $derived(selectedRowKeys !== undefined);
  let activeSelectedKeys = $derived(
    isSelectionControlled ? (selectedRowKeys ?? []) : internalSelectedKeys,
  );
  let selectedKeysSet = $derived(new Set<string | number>(activeSelectedKeys));
  let disabledKeysSet = $derived(new Set<string | number>(disabledRowKeys ?? []));

  let displayedRowKeys = $derived.by(() => {
    if (!selectable || !selectAll) return [];

    return displayedRows
      .map((_, index) => {
        const rowIndex = (currentPage - 1) * rowsPerPage + index;
        const originalRow = rows?.[isServerSide ? index : rowIndex] ?? {};

        return getRowKey(originalRow, rowIndex);
      })
      .filter((key) => !disabledKeysSet.has(key));
  });

  let allRowsSelected = $derived(
    displayedRowKeys.length > 0 && displayedRowKeys.every((key) => selectedKeysSet.has(key)),
  );
  let someRowsSelected = $derived(
    displayedRowKeys.some((key) => selectedKeysSet.has(key)) && !allRowsSelected,
  );

  /**
   * Vérifie si une ligne est actuellement sélectionnée.
   *
   * @param row - La ligne à vérifier
   * @param rowIndex - L'index de la ligne
   *
   * @returns `true` si la ligne est sélectionnée, `false` sinon
   */
  function isRowSelected(row: Row, rowIndex: number): boolean {
    return selectedKeysSet.has(getRowKey(row, rowIndex));
  }

  /**
   * Vérifie si une ligne est actuellement désactivée.
   *
   * @param row - La ligne à vérifier
   * @param rowIndex - L'index de la ligne
   *
   * @returns `true` si la ligne est désactivée, `false` sinon
   */
  function isRowDisabled(row: Row, rowIndex: number): boolean {
    return disabledKeysSet.has(getRowKey(row, rowIndex));
  }

  /**
   * Gère la sélection ou la désélection d'une ligne du tableau.
   *
   * Met à jour l'état interne de sélection (ou contrôlé de l'extérieur) et déclenche
   * les callbacks et événements appropriés avec la liste mise à jour des clés sélectionnées
   * et des lignes correspondantes.
   *
   * @param row - La ligne à sélectionner ou désélectionner
   * @param rowIndex - L'index de la ligne dans le tableau
   * @param checked - Indique si la ligne doit être sélectionnée (`true`) ou désélectionnée (`false`)
   */
  function handleRowSelection(row: Row, rowIndex: number, checked: boolean) {
    const key = getRowKey(row, rowIndex);
    const updatedSelection = new Set(activeSelectedKeys);

    if (checked) updatedSelection.add(key);
    else updatedSelection.delete(key);

    const updatedKeys = Array.from(updatedSelection);
    const updatedRows = (rows ?? []).filter((r, i) => updatedSelection.has(getRowKey(r, i)));

    if (!isSelectionControlled) internalSelectedKeys = updatedKeys;

    onselectionchanged?.(updatedKeys, updatedRows);
    $host()?.dispatchEvent(
      new CustomEvent("selectionchanged", {
        detail: { keys: updatedKeys, rows: updatedRows },
        bubbles: true,
      }),
    );
  }

  /**
   * Sélectionne ou désélectionne toutes les lignes actuellement affichées,
   * puis émet l'événement de changement de sélection.
   *
   * @param checked - Indique si toutes les lignes visibles doivent être sélectionnées (`true`) ou désélectionnées (`false`).
   */
  function handleSelectAll(checked: boolean) {
    const updatedSelection = new Set(activeSelectedKeys);

    for (const key of displayedRowKeys) {
      if (checked) updatedSelection.add(key);
      else updatedSelection.delete(key);
    }

    const updatedKeys = Array.from(updatedSelection);
    const updatedRows = (rows ?? []).filter((r, i) => updatedSelection.has(getRowKey(r, i)));

    if (!isSelectionControlled) internalSelectedKeys = updatedKeys;

    onselectionchanged?.(updatedKeys, updatedRows);
    $host()?.dispatchEvent(
      new CustomEvent("selectionchanged", {
        detail: { keys: updatedKeys, rows: updatedRows },
        bubbles: true,
      }),
    );
  }

  /**
   * Action Svelte : crée un `<slot name="...">` programmatiquement dans le `<td>`,
   * en déplaçant le contenu Svelte existant comme fallback du slot.
   * Contourne la restriction compile-time de Svelte sur les noms de slot dynamiques.
   * Est un no-op si `slotName` est null (mode non-rich).
   */
  function cellSlot(node: HTMLElement, slotName: string | null) {
    if (!slotName) return;

    const slot = document.createElement("slot");
    slot.name = slotName;

    while (node.firstChild) {
      slot.appendChild(node.firstChild);
    }
    node.appendChild(slot);

    return {
      update(newSlotName: string | null) {
        if (newSlotName) slot.name = newSlotName;
      },
      destroy() {
        while (slot.firstChild) {
          node.insertBefore(slot.firstChild, slot);
        }
        slot.remove();
      },
    };
  }

  /**
   * Action Svelte : observe la hauteur du `<tr>` et synchronise la CSS custom property `--row-height`,
   * reproduisant le comportement de `table-row.js` du DSFR.
   */
  function rowHeight(node: HTMLTableRowElement, enabled: boolean) {
    const ROW_HEIGHT_OFFSET_PX = 2;

    let height = 0;
    let observer: ResizeObserver | undefined;

    const update = () => {
      const newHeight = node.getBoundingClientRect().height + ROW_HEIGHT_OFFSET_PX;

      if (height === newHeight) return;

      height = newHeight;
      node.style.setProperty("--row-height", `${height}px`);
    };

    const start = () => {
      if (observer) return;

      update();

      observer = new ResizeObserver(update);
      observer.observe(node);
    };

    const stop = () => {
      observer?.disconnect();
      observer = undefined;

      height = 0;

      node.style.removeProperty("--row-height");
    };

    if (enabled) start();

    return {
      update(newEnabled: boolean) {
        if (newEnabled) start();
        else stop();
      },
      destroy() {
        stop();
      },
    };
  }

  /**
   * Génère les classes CSS applicables à une cellule de tableau en fonction de ses propriétés.
   *
   * @param cell La cellule dont les classes doivent être générées
   * @param isHeader Indique si la cellule est un en-tête de colonne
   * @param forceFixed Force l'application de la classe de cellule fixe
   * @returns Les classes CSS à appliquer à la cellule
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

  <div bind:this={wrapperEl} class="fr-table__wrapper">
    <div class="fr-table__container">
      <div class="fr-table__content">
        <slot name="tablecontent">
          <table {id}>
            <caption bind:this={captionEl}>
              {caption}
              {#if captionDetail}
                <div class="fr-table__caption__desc">{captionDetail}</div>
              {/if}
            </caption>

            {#if computedThead.length}
              <thead>
                {#each computedThead as row, headerRowIndex (headerRowIndex)}
                  <tr>
                    {#if selectable && headerRowIndex === 0}
                      <th class="fr-cell--fixed" role="columnheader">
                        {#if selectAll}
                          {@const selectAllId = `${id ?? "table"}-select-all`}

                          <div class="fr-checkbox-group fr-checkbox-group--sm">
                            <input
                              type="checkbox"
                              id={selectAllId}
                              checked={allRowsSelected}
                              use:setIndeterminate={someRowsSelected}
                              onchange={(event) =>
                                handleSelectAll((event.currentTarget as HTMLInputElement).checked)}
                            />
                            <label class="fr-label" for={selectAllId}> Sélectionner tout </label>
                          </div>
                        {:else}
                          <span class="fr-sr-only">Sélectionner</span>
                        {/if}
                      </th>
                    {/if}
                    {#each row as cell, colIndex (colIndex)}
                      <th
                        scope="col"
                        class={getCellClasses(
                          cell,
                          true,
                          fixedFirstCellHead && headerRowIndex === 0 && colIndex === 0,
                        )}
                      >
                        {cell.content}
                      </th>
                    {/each}
                  </tr>
                {/each}
              </thead>
            {/if}

            {#if nbRows === 0}
              <tbody>
                <tr>
                  <td colspan={(computedThead[0]?.length ?? 1) + (selectable ? 1 : 0)}>
                    <slot name="empty"></slot>
                  </td>
                </tr>
              </tbody>
            {:else}
              {#each computedTbodies as tbody, tIndex (tIndex)}
                <tbody>
                  {#each tIndex === 0 ? displayedRows : tbody as row, index (index)}
                    {@const rowIndex =
                      tIndex === 0 ? (currentPage - 1) * rowsPerPage + index : index}
                    {@const originalRow =
                      tIndex === 0 ? (rows?.[isServerSide ? index : rowIndex] ?? {}) : undefined}
                    {@const selected =
                      selectable && originalRow ? isRowSelected(originalRow, rowIndex) : undefined}
                    {@const disabled =
                      selectable && originalRow ? isRowDisabled(originalRow, rowIndex) : undefined}

                    <tr
                      use:rowHeight={selectable && tIndex === 0}
                      id={id ? `${id}-row-key-${rowIndex}` : undefined}
                      data-row-key={rowIndex}
                      aria-selected={selected}
                    >
                      {#if selectable && tIndex === 0 && originalRow}
                        {@const checkboxId = `${id ?? "table"}-select-checkbox-${rowIndex}`}

                        <th class="fr-cell--fixed" scope="row">
                          <div class="fr-checkbox-group fr-checkbox-group--sm">
                            <input
                              type="checkbox"
                              data-fr-row-select="true"
                              id={checkboxId}
                              checked={selected}
                              {disabled}
                              onchange={(event) =>
                                handleRowSelection(
                                  originalRow,
                                  rowIndex,
                                  (event.currentTarget as HTMLInputElement).checked,
                                )}
                            />
                            <label class="fr-label" for={checkboxId}>
                              Sélectionner la ligne {rowIndex + 1}
                            </label>
                          </div>
                        </th>
                      {/if}
                      {#each row as cell, cellIndex (cellIndex)}
                        {@const col = columns?.[cellIndex]}
                        <td
                          class={getCellClasses(cell)}
                          use:cellSlot={col && (rich || col.rich)
                            ? `cell:${col.key}:${rowIndex}`
                            : null}
                        >
                          {cell.content}
                        </td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              {/each}
            {/if}
          </table>
        </slot>
      </div>
    </div>
  </div>

  {#if hasFooter}
    <div class="fr-table__footer">
      {#if hasFooterSelect}
        <div class="fr-table__footer--start">
          <p class="fr-table__detail">
            {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, nbRows)} sur {nbRows}
            {nbRows > 1 ? "lignes" : "ligne"}
          </p>

          <slot name="footerselect">
            {#if itemsPerPage.length > 1}
              <DsfrSelect
                id={`${id}-footer-select`}
                label="Nombre de lignes par page"
                placeholder="Nombre de lignes par page"
                hideLabel
                placeholderDisabled
                value={String(rowsPerPage)}
                options={itemsPerPage.map((item) => ({
                  value: item.toString(),
                  label: `${item} lignes par page`,
                }))}
                onvaluechanged={handleRowsPerPageChange}
              />
            {/if}
          </slot>
        </div>
      {/if}

      {#if hasFooterPagination}
        <div class="fr-table__footer--middle">
          <slot name="footerpagination">
            <DsfrPagination
              pages={paginationPages}
              currentPageIndex={currentPage}
              hasPrevAndNext
              prev={{ label: "Précédent", href: "#", title: "Page précédente" }}
              next={{ label: "Suivant", href: "#", title: "Page suivante" }}
              onpagechange={handlePageChange}
            />
          </slot>
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
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/table/table.main.min.css";
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("table");

  .fr-checkbox-group {
    --checkbox-gap-sm: -1.25rem;

    @include set-themeable-checkbox();
    @include set-themeable-checkbox-sm();
  }

  .fr-sr-only {
    @include visually-hidden();
  }

  // Le DSFR ne fournit pas de style :indeterminate pour les checkboxes.
  // On reprend le pattern :checked (fond bleu + bordure active) avec un tiret horizontal.
  .fr-checkbox-group input[type="checkbox"]:indeterminate + label::before {
    background-color: var(--background-active-blue-france);
    background-image:
      radial-gradient(
        at 5px 4px,
        transparent 4px,
        var(--border-active-blue-france) 4px,
        var(--border-active-blue-france) 5px,
        transparent 6px
      ),
      linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)),
      radial-gradient(
        at calc(100% - 5px) 4px,
        transparent 4px,
        var(--border-active-blue-france) 4px,
        var(--border-active-blue-france) 5px,
        transparent 6px
      ),
      linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)),
      radial-gradient(
        at calc(100% - 5px) calc(100% - 4px),
        transparent 4px,
        var(--border-active-blue-france) 4px,
        var(--border-active-blue-france) 5px,
        transparent 6px
      ),
      linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)),
      radial-gradient(
        at 5px calc(100% - 4px),
        transparent 4px,
        var(--border-active-blue-france) 4px,
        var(--border-active-blue-france) 5px,
        transparent 6px
      ),
      linear-gradient(var(--border-active-blue-france), var(--border-active-blue-france)),
      var(--data-uri-svg);

    --data-uri-svg: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23f5f5fe' d='M5 11h14v2H5z'/></svg>");
  }
</style>
