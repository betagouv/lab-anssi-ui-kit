<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
    getColSizeTableArgs,
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
      headersegmented: {
        description: "Contrôles de segmentation dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      headersearch: {
        description: "Barre de recherche dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      headerbuttons: {
        description: "Boutons d'action dans l'en-tête du tableau",
        control: false,
        table: { category: "Slots" },
      },
      tableheader: {
        description: "En-tête personnalisé du tableau (remplace le rendu automatique)",
        control: false,
        table: { category: "Slots" },
      },
      tablecontent: {
        description: "Corps personnalisé du tableau (remplace le rendu automatique des lignes)",
        control: false,
        table: { category: "Slots" },
      },
      empty: {
        description: "Contenu affiché quand le tableau ne contient aucune ligne",
        control: false,
        table: { category: "Slots" },
      },
      footerselect: {
        description: "Sélecteur du nombre d'éléments par page (remplace le DsfrSelect par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      footerpagination: {
        description: "Pagination personnalisée (remplace le DsfrPagination par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      footerbuttons: {
        description: "Boutons d'action dans le pied du tableau",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: tableArgs,
    parameters: {
      docs: {
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
    table={args.table}
  ></dsfr-table>
{/snippet}

<Story name="Defaut" />

<Story name="Taille small" args={{ size: "sm" }} />

<Story name="Taille medium" args={{ size: "md" }} />

<Story name="Taille large" args={{ size: "lg" }} />

<Story name="Avec bordure" args={{ bordered: true }} />

<Story name="Sans scroll" args={{ noScroll: true }} />

<Story name="Multiligne" args={{ multiline: true }} />

<Story
  name="Multiligne avec taille de colonnes minimale"
  args={{ multiline: true, table: adaptColSize(getColSizeTableArgs()) }}
/>

<!--
  Stories DSFR ci-dessous masquées : elles nécessitent des fonctionnalités absentes
  du composant DsfrTable actuel. À décommenter au fur et à mesure de leur implémentation.
-->

<!--
  TODO: nécessite un row header (<th scope="row">) sur la 1ère colonne, non géré par
  le composant qui rend systématiquement des <td>.
<Story
  name="Avec une colonne fixe"
  args={{ table: getFixedColTableArgs() }}
/>
-->

<!--
  TODO: idem "Avec une colonne fixe" + breakpoint sur la cellule fixée.
<Story
  name="Avec une colonne fixe à partir du breakpoint md"
  args={{ table: getFixedColTableArgs("md") }}
/>
-->

<!--
  TODO: nécessite un row header avec checkbox, non géré par le composant.
<Story
  name="Sélectionnable"
  args={{ table: getSelectableTableArgs() }}
/>
-->

<!--
  TODO: idem "Sélectionnable" + état "ligne sélectionnée".
<Story
  name="Sélectionnable avec ligne sélectionnée"
  args={{ table: getSelectableTableSelectedLineArgs() }}
/>
-->

<!--
  TODO: nécessite la prise en charge de rowspan / colspan / headers, non géré par le composant.
<Story
  name="Complexe"
  args={{
    bordered: true,
    captionDetail: getComplexTableCaptionDetails(),
    table: getComplexTableArgs(),
  }}
/>
-->

<!--
  TODO: nécessite un row header + des contenus HTML riches injectables, non géré par
  le composant en l'état (la prop `rich` ne couvre pas les cellules d'en-tête de ligne).
<Story
  name="Divers"
  args={{ table: getMiscellaneousTableArgs() }}
/>
-->
