<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
    getColSizeTableArgs,
    getFixedColTableArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/table/template/stories/table-arg-types.js";

  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  type CellSize = "xs" | "sm" | "md" | "lg";
  type DsfrCell = { content: string };
  type DsfrTableArgs = { thead: DsfrCell[][]; tbodies: DsfrCell[][][] };

  // Le helper DSFR `getColSizeTableArgs` exprime la taille de colonne via `attributes.class`
  // (ex: `fr-col--xs`). Le composant DsfrTable lit `cell.size` directement, on adapte donc
  // la structure pour que la classe soit appliquée par le composant.
  function adaptColSize(table: DsfrTableArgs) {
    const sizes: CellSize[] = ["xs", "sm", "md", "lg"];
    return {
      thead: table.thead.map((row) =>
        row.map((cell, i) => ({ content: cell.content, size: sizes[i] })),
      ),
      tbodies: table.tbodies,
    };
  }

  // Le helper DSFR `getFixedColTableArgs` ajoute une colonne fixe via
  // `classes: ['fr-cell--fixed']` et `markup: 'th'` (row header). Le composant
  // DsfrTable utilise `cell.fixed` pour le sticky et rend des `<td>` (pas de row header).
  // On adapte la structure pour que la propriété `fixed` soit lue par le composant.
  function adaptFixedCol(breakpoint?: "sm" | "md" | "lg") {
    const table = getFixedColTableArgs(breakpoint) as DsfrTableArgs;
    const fixed: boolean | string = breakpoint ?? true;

    return {
      thead: table.thead.map((row) =>
        row.map((cell, i) => ({
          content: cell.content || "",
          ...(i === 0 ? { fixed } : {}),
        })),
      ),
      tbodies: table.tbodies.map((tbody) =>
        tbody.map((row) =>
          row.map((cell, i) => ({
            content: cell.content || "",
            ...(i === 0 ? { fixed } : {}),
          })),
        ),
      ),
    };
  }

  const { Story } = defineMeta({
    title: "Composants/DSFR/Table",
    component: DsfrTable,
    argTypes: {
      ...tableArgTypes,
      layoutFixed: {
        control: "boolean",
        description: "Fixe la mise en page du tableau (table-layout: fixed)",
      },
      fixedFirstCellHead: {
        control: "boolean",
        description: "Fixe la première cellule de l'en-tête (sticky)",
      },
      onpagechanged: {
        description: "Déclenché lors du changement de page.<br>" + "`detail: number`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<number>" },
        },
        control: false,
      },
      onrowsperpagechanged: {
        description:
          "Déclenché lors du changement du nombre de lignes par page.<br>" + "`detail: number`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<number>" },
        },
        control: false,
      },
      onselectionchanged: {
        description:
          "Déclenché lors du changement de la sélection des lignes.<br>" +
          "`detail: { keys: (string | number)[], rows: Row[] }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ keys: (string | number)[], rows: Row[] }>" },
        },
        control: false,
      },
      slotEmpty: {
        name: "empty",
        description: "Contenu affiché quand le tableau ne contient aucune ligne",
        control: false,
        table: { category: "Slots" },
      },
      slotFooterbuttons: {
        name: "footerbuttons",
        description: "Boutons d'action dans le pied du tableau",
        control: false,
        table: { category: "Slots" },
      },
      slotFooterpagination: {
        name: "footerpagination",
        description: "Pagination personnalisée (remplace le DsfrPagination par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      slotFooterselect: {
        name: "footerselect",
        description: "Sélecteur du nombre d'éléments par page (remplace le DsfrSelect par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      slotHeaderbuttons: {
        name: "headerbuttons",
        description: "Boutons d'action dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      slotHeadersearch: {
        name: "headersearch",
        description: "Barre de recherche dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      slotHeadersegmented: {
        name: "headersegmented",
        description: "Contrôles de segmentation dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      slotTablecontent: {
        name: "tablecontent",
        description: "Corps personnalisé du tableau (remplace le rendu automatique des lignes)",
        control: false,
        table: { category: "Slots" },
      },
      slotTableheader: {
        name: "tableheader",
        description: "En-tête personnalisé du tableau (remplace le rendu automatique)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: tableArgs,
    parameters: {
      actions: { handles: ["pagechanged", "rowsperpagechanged", "selectionchanged"] },
      docs: {
        description: {
          component:
            "Les tableaux sont utilisés pour organiser et afficher les informations d'un jeu de données.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tableau)\n\n---\n\n" +
            `Les stories présentes dans cette page sont issues de la documentation du DSFR.<br/> Elles ne couvrent que les cas d'usage de base du composant **Table** tel que présentés dans le DSFR, et ne mettent pas en avant les fonctionnalités plus avancées du composant _(ex: cellules avec contenus riches, en-têtes de ligne, etc)_.<br/> D'autres stories d'exemples plus spécifiques sur des usages avancés du composant sont présentes dans le menu **"Exemples"**.`,
        },
        source: {
          transform: webComponentSourceCode("dsfr-table"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTable>;
</script>

{#snippet template(args: Args)}
  <dsfr-table
    id={args.id}
    caption={args.caption}
    caption-detail={args.captionDetail}
    no-caption={args.noCaption || undefined}
    caption-bottom={args.captionBottom || undefined}
    bordered={args.bordered || undefined}
    no-scroll={args.noScroll || undefined}
    multiline={args.multiline || undefined}
    layout-fixed={args.layoutFixed || undefined}
    size={args.size}
    fixed-first-cell-head={args.fixedFirstCellHead || undefined}
    has-header={args.hasHeader || undefined}
    has-header-segmented={args.hasHeaderSegmented || undefined}
    has-header-search={args.hasHeaderSearch || undefined}
    has-header-details={args.hasHeaderDetails || undefined}
    header-details={args.headerDetails}
    has-header-buttons={args.hasHeaderButtons || undefined}
    has-footer={args.hasFooter || undefined}
    has-footer-select={args.hasFooterSelect || undefined}
    has-footer-pagination={args.hasFooterPagination || undefined}
    has-footer-buttons={args.hasFooterButtons || undefined}
    items-per-page={args.itemsPerPage ? JSON.stringify(args.itemsPerPage) : undefined}
    table={args.table}
    selectable={args.selectable || undefined}
    select-all={args.selectAll || undefined}
    selected-row-keys={args.selectedRowKeys ? JSON.stringify(args.selectedRowKeys) : undefined}
  ></dsfr-table>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;
    const tableData = (args as unknown as { table: { thead: unknown[][]; tbodies: unknown[][][] } })
      .table;
    const headerCount = tableData?.thead?.[0]?.length ?? 0;
    const rowCount = tableData?.tbodies?.reduce((acc, tbody) => acc + tbody.length, 0) ?? 0;

    await step("Le caption est affiché", async () => {
      const caption = shadow?.querySelector("caption");

      await expect(caption?.textContent).toContain(args.caption);
    });

    await step("Les en-têtes de colonnes correspondent aux données", async () => {
      const headers = shadow?.querySelectorAll("thead th");

      await expect(headers?.length).toBe(headerCount);
    });

    await step("Les lignes de données correspondent aux données", async () => {
      const rows = shadow?.querySelectorAll("tbody tr");

      await expect(rows?.length).toBe(rowCount);
    });
  }}
/>

<Story
  name="Taille small"
  args={{ size: "sm" }}
  play={async ({ args, canvasElement, step }) => {
    const shadow = canvasElement.querySelector("dsfr-table")?.shadowRoot;
    const size = (args as unknown as { size: string }).size;

    await step("Le tableau a la classe de taille correspondante", async () => {
      const table = shadow?.querySelector(".fr-table");

      await expect(table?.classList.contains(`fr-table--${size}`)).toBe(true);
    });
  }}
/>

<Story
  name="Taille medium"
  args={{ size: "md" }}
  play={async ({ args, canvasElement, step }) => {
    const shadow = canvasElement.querySelector("dsfr-table")?.shadowRoot;
    const size = (args as unknown as { size: string }).size;

    await step("Le tableau a la classe de taille correspondante", async () => {
      const table = shadow?.querySelector(".fr-table");

      await expect(table?.classList.contains(`fr-table--${size}`)).toBe(true);
    });
  }}
/>

<Story
  name="Taille large"
  args={{ size: "lg" }}
  play={async ({ args, canvasElement, step }) => {
    const shadow = canvasElement.querySelector("dsfr-table")?.shadowRoot;
    const size = (args as unknown as { size: string }).size;

    await step("Le tableau a la classe de taille correspondante", async () => {
      const table = shadow?.querySelector(".fr-table");

      await expect(table?.classList.contains(`fr-table--${size}`)).toBe(true);
    });
  }}
/>

<Story
  name="Avec bordure"
  args={{ bordered: true }}
  play={async ({ canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;

    await step("Le tableau a la classe bordered", async () => {
      const table = shadow?.querySelector(".fr-table");

      await expect(table?.classList.contains("fr-table--bordered")).toBe(true);
    });
  }}
/>

<Story name="Sans scroll" args={{ noScroll: true }} />

<Story name="Multiligne" args={{ multiline: true }} />

<Story
  name="Multiligne avec taille de colonnes minimale"
  args={{ multiline: true, table: adaptColSize(getColSizeTableArgs()) }}
/>

<!--
  Limitation : le DSFR utilise un <th scope="row"> pour la première colonne de données (row header).
  Le composant DsfrTable rend systématiquement des <td>, l'information sémantique de row header
  est donc absente. Le comportement visuel sticky est néanmoins fonctionnel via la prop `fixed`.
-->
<Story name="Colonne fixe" args={{ table: adaptFixedCol() }} />

<Story
  name="Colonne fixe à partir de MD"
  parameters={{
    docs: {
      description: {
        story:
          "La première colonne est fixe à partir du breakpoint `md`. Existe aussi avec les breakpoints `sm` et `lg`.",
      },
    },
  }}
  args={{ table: adaptFixedCol("md") }}
/>

<!--
  Note : les helpers DSFR `getSelectableTableArgs` / `getSelectableTableSelectedLineArgs`
  préfixent eux-mêmes une colonne checkbox dans le tableau. Notre `DsfrTable` la génère
  automatiquement via la prop `selectable`, on part donc de la table simple et on délègue
  l'ajout de la colonne au composant.
-->
<Story
  name="Sélectionnable"
  args={{ selectable: true }}
  play={async ({ args, canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;
    const tableData = (args as unknown as { table: { tbodies: unknown[][][] } }).table;
    const rowCount = tableData?.tbodies?.reduce((acc, tbody) => acc + tbody.length, 0) ?? 0;

    await step("Les checkboxes de sélection correspondent aux lignes", async () => {
      const checkboxes = shadow?.querySelectorAll('tbody input[type="checkbox"]');

      await expect(checkboxes?.length).toBe(rowCount);
    });

    await step("Émet selectionchanged lors de la sélection d'une ligne", async () => {
      const handler = fn();
      dsfrTable?.addEventListener("selectionchanged", handler);

      const checkbox = shadow?.querySelector('tbody input[type="checkbox"]') as HTMLInputElement;

      await userEvent.click(checkbox);

      await expect(handler).toHaveBeenCalledOnce();

      const detail = handler.mock.calls.at(-1)?.[0].detail;

      await expect(detail).toHaveProperty("keys");
      await expect(detail).toHaveProperty("rows");
      await expect(detail.keys.length).toBe(1);

      dsfrTable?.removeEventListener("selectionchanged", handler);
    });
  }}
/>

<Story
  name="Sélectionnable avec ligne sélectionnée"
  args={{ selectable: true, selectedRowKeys: [0] }}
  play={async ({ canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;

    await step("La ligne pré-sélectionnée a sa checkbox cochée", async () => {
      const firstCheckbox = shadow?.querySelector(
        'tbody input[type="checkbox"]',
      ) as HTMLInputElement;

      await expect(firstCheckbox?.checked).toBe(true);
    });

    await step("La ligne pré-sélectionnée a l'attribut aria-selected", async () => {
      const selectedRow = shadow?.querySelector('tbody tr[aria-selected="true"]');

      await expect(selectedRow).toBeTruthy();
    });
  }}
/>

<Story
  name="Sélectionnable avec tout sélectionner"
  args={{ selectable: true, selectAll: true }}
  play={async ({ canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;

    await step(
      "Le clic sur tout sélectionner coche toutes les lignes et émet l'événement",
      async () => {
        const handler = fn();
        dsfrTable?.addEventListener("selectionchanged", handler);

        const selectAll = shadow?.querySelector('thead input[type="checkbox"]') as HTMLInputElement;

        await userEvent.click(selectAll);

        await expect(handler).toHaveBeenCalledOnce();

        const rowCheckboxes = shadow?.querySelectorAll(
          'tbody input[type="checkbox"]',
        ) as NodeListOf<HTMLInputElement>;

        for (const cb of rowCheckboxes) {
          await expect(cb.checked).toBe(true);
        }

        dsfrTable?.removeEventListener("selectionchanged", handler);
      },
    );
  }}
/>

<Story
  name="Avec pagination"
  args={{
    hasFooter: true,
    hasFooterSelect: true,
    hasFooterPagination: true,
    itemsPerPage: [2, 5],
  }}
  play={async ({ canvasElement, step }) => {
    const dsfrTable = canvasElement.querySelector("dsfr-table");
    const shadow = dsfrTable?.shadowRoot;

    await step("Le changement de page émet l'événement pagechanged", async () => {
      const handler = fn();
      dsfrTable?.addEventListener("pagechanged", handler);

      const nextLink = shadow?.querySelector(".fr-pagination__link--next") as HTMLElement;

      await userEvent.click(nextLink);

      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(2);

      dsfrTable?.removeEventListener("pagechanged", handler);
    });

    await step(
      "Le changement du nombre de lignes émet l'événement rowsperpagechanged",
      async () => {
        const handler = fn();
        dsfrTable?.addEventListener("rowsperpagechanged", handler);

        const select = shadow?.querySelector("select.fr-select") as HTMLSelectElement;

        await userEvent.selectOptions(select, "5");

        await expect(handler).toHaveBeenCalledOnce();
        await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(5);

        dsfrTable?.removeEventListener("rowsperpagechanged", handler);
      },
    );
  }}
/>

<!--
  Limitation : la story DSFR « ComplexTableStory » utilise rowspan, colspan, l'attribut headers
  et des <th scope="row"> (row headers) pour décrire un emploi du temps scolaire.
  Ces fonctionnalités ne sont pas prises en charge par DsfrTable.
  La version ci-dessous est une approximation aplatie sans fusion de cellules.
-->
<Story
  name="Complexe"
  args={{
    bordered: true,
    captionDetail:
      "(Résumé) Emploi du temps horaire des Groupes 1 et 2, le matin des jours de la semaine ouvrée (Lundi au Vendredi)",
    table: {
      thead: [
        [
          { content: "Horaires", fixed: true },
          { content: "Lundi (G1 & G2)" },
          { content: "Mardi (G1 & G2)" },
          { content: "Mercredi (G1)" },
          { content: "Jeudi (G2)" },
          { content: "Vendredi (G1 & G2)" },
        ],
      ],
      tbodies: [
        [
          [
            { content: "8h", fixed: true },
            { content: "Français" },
            { content: "Mathématiques" },
            { content: "LV1" },
            { content: "Histoire - Géographie" },
            { content: "EPS" },
          ],
          [
            { content: "9h", fixed: true },
            { content: "Étude dirigée" },
            { content: "Étude dirigée" },
            { content: "Étude dirigée" },
            { content: "Étude dirigée" },
            { content: "Étude dirigée" },
          ],
          [
            { content: "10h", fixed: true },
            { content: "Mathématiques" },
            { content: "Histoire - Géographie" },
            { content: "Arts appliqués" },
            { content: "LV2" },
            { content: "Sciences" },
          ],
          [
            { content: "11h", fixed: true },
            { content: "Français" },
            { content: "EPS" },
            { content: "Arts appliqués" },
            { content: "Histoire - Géographie" },
            { content: "Physique - Chimie" },
          ],
          [
            { content: "12h", fixed: true },
            { content: "Sciences" },
            { content: "LV1" },
            { content: "EPS" },
            { content: "EPS" },
            { content: "LV2" },
          ],
        ],
      ],
    },
  }}
/>

<!--
  Limitation : la story DSFR « MiscellaneousTableStory » montre des cellules à contenu riche
  (badges, boutons de tri, inputs, tooltips, tags, liens de téléchargement, pictogrammes SVG)
  et une colonne sélectionnable avec <th scope="row">.
  Le composant DsfrTable ne prend pas en charge le rendu HTML brut dans les cellules via la
  prop `table`. Pour du contenu riche, utiliser l'API columns/rows avec `rich` ou `Column.rich`
  et les slots nommés `cell:<colKey>:<rowIndex>` (cf. stories dans "Exemples").
  La version ci-dessous est une approximation textuelle des données d'origine.
-->
<Story
  name="Divers"
  args={{
    selectable: true,
    table: {
      thead: [
        [
          { content: "Titre" },
          { content: "Texte" },
          { content: "Titre et description", multiline: true },
          { content: "Badge et texte", inline: true },
          { content: "Texte" },
          { content: "Saisie" },
          { content: "Montant", align: "right" },
          { content: "Statut" },
          { content: "Action", align: "center" },
          { content: "Tag" },
          { content: "Téléchargement" },
          { content: "Pictogramme", align: "center" },
        ],
      ],
      tbodies: [
        [
          [
            { content: "Titre par défaut" },
            { content: "Texte par défaut" },
            {
              content: "Libellé par défaut — Titre par défaut — Texte par défaut",
              multiline: true,
            },
            { content: "Libellé par défaut — Texte par défaut", inline: true },
            { content: "Texte par défaut" },
            { content: "(champ de saisie)" },
            { content: "30,00 €", align: "right" },
            { content: "Libellé par défaut" },
            { content: "Libellé bouton", align: "center" },
            { content: "Libellé par défaut" },
            { content: "Lien de Téléchargement — JPG 61,88 Ko" },
            { content: "(pictogramme)", align: "center" },
          ],
          [
            { content: "Titre par défaut" },
            { content: "Texte par défaut" },
            {
              content: "Libellé par défaut — Titre par défaut — Texte par défaut",
              multiline: true,
            },
            { content: "Libellé par défaut — Texte par défaut", inline: true },
            { content: "Texte par défaut" },
            { content: "(champ de saisie)" },
            { content: "30,00 €", align: "right" },
            { content: "Libellé par défaut" },
            { content: "Libellé bouton", align: "center" },
            { content: "Libellé par défaut" },
            { content: "Lien de Téléchargement — JPG 61,88 Ko" },
            { content: "(pictogramme)", align: "center" },
          ],
        ],
      ],
    },
  }}
/>
