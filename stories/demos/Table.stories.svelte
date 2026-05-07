<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
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
    title: "Exemples/DSFR - Tableau",
    component: DsfrTable,
    args: {
      columns: citiesColumns,
      rows: citiesRows,
    },
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrTable>;
</script>

<Story name="Avec pagination">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-pagination"
      caption="Grandes villes de France"
      columns={citiesColumns}
      rows={citiesRows}
      has-footer={true}
      has-footer-select={true}
      has-footer-pagination={true}
      items-per-page={JSON.stringify([5, 10, 20])}
    ></dsfr-table>
  {/snippet}
</Story>

<Story name="Avec pagination côté serveur">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-server"
      caption="Grandes villes de France (pagination côté serveur)"
      columns={citiesColumns}
      rows={serverRows}
      total-rows={citiesRows.length}
      has-footer={true}
      has-footer-select={true}
      has-footer-pagination={true}
      items-per-page={JSON.stringify([5, 10, 20])}
      onpagechange={(event: CustomEvent<number>) => {
        serverPage = event.detail;
      }}
      onrowsperpagechange={(event: CustomEvent<number>) => {
        serverPerPage = event.detail;
        serverPage = 1;
      }}
    ></dsfr-table>
  {/snippet}
</Story>

<Story name="Tableau vide avec slot personnalisé">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-empty-custom"
      caption="Grandes villes de France"
      columns={citiesColumns}
      rows={[]}
    >
      <p slot="empty" class="fr-text--sm">Aucune ville ne correspond à votre recherche.</p>
    </dsfr-table>
  {/snippet}
</Story>
