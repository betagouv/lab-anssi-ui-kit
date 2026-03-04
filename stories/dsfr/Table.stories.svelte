<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/table/template/stories/table-arg-types.js";

  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";
  import tableData from "../utilitaires/tableData.json";

  const citiesColumns = tableData.thead[0].map((cell, i) => ({
    key: String(i),
    label: cell.content,
  }));

  const citiesRows = tableData.tbodies[0].map((row) =>
    Object.fromEntries(row.map((cell, i) => [String(i), cell.content])),
  );

  // État local pour la story "pagination côté serveur"
  let serverPage = $state(1);
  let serverPerPage = $state(5);
  let serverRows = $derived(
    citiesRows.slice((serverPage - 1) * serverPerPage, serverPage * serverPerPage),
  );

  const { Story } = defineMeta({
    title: "Composants/dsfr/Table",
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
    },
    args: {
      ...tableArgs,
      columns: citiesColumns,
      rows: citiesRows,
      buttons: [
        {
          label: "Action tableau",
          kind: "primary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
        {
          label: "Action tableau",
          kind: "secondary",
          disabled: false,
          icon: "checkbox-circle-line",
        },
      ],
      itemsPerPage: [5, 10, 20],
      layoutFixed: false,
      fixedFirstCellHead: false,
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTable>;
</script>

{#snippet contenuCellulePopulation(value: unknown, _row: Record<string, unknown>)}
  <strong>{value as string} hab.</strong>
{/snippet}

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
    columns={args.columns}
    rows={args.rows}
    items-per-page={JSON.stringify(args.itemsPerPage)}
  >
    <dsfr-buttons-group slot="footerbuttons" buttons={args.buttons} inline="true"
    ></dsfr-buttons-group>
  </dsfr-table>
{/snippet}

<Story name="Defaut" />

<Story
  name="Avec pagination"
  args={{
    hasFooter: true,
    hasFooterSelect: true,
    hasFooterPagination: true,
  }}
/>

<Story name="Tableau vide avec slot personnalisé">
  {#snippet template(_args: Args)}
    <DsfrTable
      id="table-empty-custom"
      caption="Grandes villes de France"
      columns={citiesColumns}
      rows={[]}
    >
      <p slot="empty" class="fr-text--sm">Aucune ville ne correspond à votre recherche.</p>
    </DsfrTable>
  {/snippet}
</Story>

<Story name="Avec pagination côté serveur">
  {#snippet template(_args: Args)}
    <DsfrTable
      id="table-server"
      caption="Grandes villes de France (pagination côté serveur)"
      columns={citiesColumns}
      rows={serverRows}
      totalRows={citiesRows.length}
      hasFooter
      hasFooterSelect
      hasFooterPagination
      itemsPerPage={[5, 10, 20]}
      onpagechange={(page) => {
        serverPage = page;
      }}
      onrowsperpagechange={(perPage) => {
        serverPerPage = perPage;
        serverPage = 1;
      }}
    />
  {/snippet}
</Story>

<Story name="Avec contenu riche (snippet)">
  {#snippet template(_args: Args)}
    <DsfrTable
      id="table-rich-snippet"
      caption="Grandes villes de France"
      columns={[
        { key: "0", label: "Ville" },
        { key: "1", label: "Département" },
        { key: "2", label: "Région" },
        { key: "3", label: "Population (2020)", render: contenuCellulePopulation },
        { key: "4", label: "Superficie (km²)" },
      ]}
      rows={citiesRows.slice(0, 10)}
    />
  {/snippet}
</Story>
