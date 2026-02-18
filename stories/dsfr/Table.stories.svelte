<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/table/template/stories/table-arg-types.js";

  import DsfrTable from "$lib/dsfr/table/DsfrTable.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Table",
    component: DsfrTable,
    argTypes: tableArgTypes,
    args: {
      ...tableArgs,
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
    size={args.size}
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
  >
    <!-- Boutons -->
    <!-- <p slot="footerbuttons">Lorem ipseum</p> -->
    <dsfr-buttons-group slot="footerbuttons" buttons={args.buttons} inline="true"
    ></dsfr-buttons-group>
  </dsfr-table>
{/snippet}

<Story name="Defaut" />
