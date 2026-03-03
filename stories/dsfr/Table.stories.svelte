<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/table/template/stories/table-arg-types.js";

  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
  import tableData from "../utilitaires/tableData.json";

  const citiesColumns = tableData.thead[0].map((cell, i) => ({
    key: String(i),
    label: cell.content,
  }));

  const citiesRows = tableData.tbodies[0].map((row) =>
    Object.fromEntries(row.map((cell, i) => [String(i), cell.content])),
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
      layoutFixed: false,
      fixedFirstCellHead: false,
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
    columns={args.columns}
    rows={args.rows}
  ></dsfr-table>
{/snippet}

<Story name="Defaut" />
