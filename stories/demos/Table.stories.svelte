<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
  import tableData from "../utilitaires/tableData.json";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";

  const citiesKeys = ["ville", "departement", "region", "population", "superficie"];

  const citiesColumns = tableData.thead[0].map((cell, i) => ({
    key: citiesKeys[i],
    label: cell.content,
  }));

  const citiesColumnsRich = tableData.thead[0].map((cell, i) => ({
    key: citiesKeys[i],
    label: cell.content,
    rich: i === 0 || i === tableData.thead[0].length - 1,
  }));

  const citiesRows = tableData.tbodies[0].map((row) =>
    Object.fromEntries(row.map((cell, i) => [citiesKeys[i], cell.content])),
  );

  // État local pour la story "pagination côté serveur"
  let serverPage = $state(1);
  let serverPerPage = $state(5);
  let serverRows = $derived(
    citiesRows.slice((serverPage - 1) * serverPerPage, serverPage * serverPerPage),
  );

  // Données et état local pour les stories "sélectionnable" en mode `columns/rows`
  const villesAvecId = citiesRows.slice(0, 8).map((row, i) => ({ ...row, id: `ville-${i}` }));
  let selectedKeys = $state<(string | number)[]>([]);
  let selectedRowsCount = $state(0);

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

<Story name="Tableau vide avec slot personnalisé">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-empty-custom"
      caption="Grandes villes de France (tableau vide avec slot personnalisé)"
      columns={citiesColumns}
      rows={[]}
    >
      <p slot="empty" class="fr-text--sm">Aucune ville ne correspond à votre recherche.</p>
    </dsfr-table>
  {/snippet}
</Story>

<Story name="Avec pagination">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-pagination"
      caption="Grandes villes de France (pagination côté client)"
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

<!--
La personnalisation complète des cellules via slot se fait en ajoutant l'attribut `rich` au composant DsfrTable.
L'attribut `rich` permet d'utiliser des slots pour personnaliser le rendu de chaque cellule, en utilisant la syntaxe `cell:{key}:{rowIndex}` pour cibler la cellule spécifique à personnaliser.
Attention : l'attribut `rich` appliqué au global peut engendrer des problèmes de performance sur les tableaux volumineux, car il rend chaque cellule personnalisable. Il est recommandé de l'utiliser uniquement pour des tableaux de petite taille ou uniquement lorsque la personnalisation est nécessaire pour toutes les cellules.
En cas de besoin de personnalisation partielle _(une ou deux colonnes uniquement)_, il est préférable d'utiliser la clé `rich` au niveau des colonnes spécifiques.
-->
<Story name="Avec toutes les cellules personnalisées via slot">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-rich-global"
      caption="Tableau avec toutes les cellules personnalisées via slot (rich global)"
      columns={citiesColumns}
      rows={citiesRows}
      rich
    >
      {#each citiesRows as city, rowIndex}
        <div slot={`cell:ville:${rowIndex}`}>
          <strong>{city["ville"]}</strong>
        </div>

        <div slot={`cell:departement:${rowIndex}`}>
          <dsfr-badge label={city["departement"]} size="sm" type="accent" accent="pink-macaron"
          ></dsfr-badge>
        </div>

        <div slot={`cell:region:${rowIndex}`}>
          <dsfr-link label={city["region"]} size="sm" href="#" blank></dsfr-link>
        </div>

        <div slot={`cell:population:${rowIndex}`}>
          <dsfr-badge label={city["population"]} size="sm" type="status" status="info"></dsfr-badge>
        </div>

        <div slot={`cell:superficie:${rowIndex}`}>
          <dsfr-tag label={city["superficie"]} size="sm"></dsfr-tag>
        </div>
      {/each}
    </dsfr-table>
  {/snippet}
</Story>

<Story name="Avec uniquement deux colonnes personnalisées via slot">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-rich-partial"
      caption="Tableau avec uniquement deux colonnes personnalisées via slot (rich partiel)"
      columns={citiesColumnsRich}
      rows={citiesRows}
    >
      {#each citiesRows as city, rowIndex}
        <div slot={`cell:ville:${rowIndex}`}>
          <strong>{city["ville"]}</strong>
        </div>

        <div slot={`cell:superficie:${rowIndex}`}>
          <dsfr-tag label={city["superficie"]} size="sm"></dsfr-tag>
        </div>
      {/each}
    </dsfr-table>
  {/snippet}
</Story>

<Story name="Sélectionnable (mode columns/rows)">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-selectable-rows"
      caption="Grandes villes de France"
      selectable={true}
      columns={citiesColumns}
      rows={citiesRows.slice(0, 5)}
      select-all={_args.selectAll || undefined}
    ></dsfr-table>
  {/snippet}
</Story>

<Story name="Sélectionnable avec rowKey et pré-sélection">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-selectable-rowkey"
      caption="Grandes villes de France (clé = `id`)"
      selectable={true}
      row-key="id"
      selected-row-keys={JSON.stringify(["ville-0", "ville-1", "ville-5"])}
      columns={citiesColumns}
      select-all={_args.selectAll || undefined}
      rows={villesAvecId}
    ></dsfr-table>
  {/snippet}
</Story>

<Story name="Sélectionnable contrôlée avec callback">
  {#snippet template(_args: Args)}
    <p class="fr-text--sm">
      Sélection : {selectedKeys.length === 0 ? "aucune" : selectedKeys.join(", ")}
      ({selectedRowsCount} Row{selectedRowsCount > 1 ? "s" : ""} renvoyée{selectedRowsCount > 1
        ? "s"
        : ""}
      par le callback)
    </p>
    <dsfr-table
      id="table-selectable-controlled"
      caption="Grandes villes de France (sélection contrôlée)"
      selectable={true}
      row-key="id"
      columns={citiesColumns}
      select-all={_args.selectAll || undefined}
      rows={villesAvecId}
      selected-row-keys={JSON.stringify(selectedKeys)}
      onselectionchanged={(
        event: CustomEvent<{
          keys: (string | number)[];
          rows: Record<string, unknown>[];
        }>,
      ) => {
        selectedKeys = event.detail.keys;
        selectedRowsCount = event.detail.rows.length;
      }}
    ></dsfr-table>
  {/snippet}
</Story>

<Story name="Sélectionnable avec checkbox 'Tout sélectionner'">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-selectable-all"
      caption="Grandes villes de France"
      selectable={true}
      select-all={true}
      columns={citiesColumns}
      rows={citiesRows.slice(0, 8)}
    ></dsfr-table>
  {/snippet}
</Story>
