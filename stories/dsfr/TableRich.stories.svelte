<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tableArgTypes,
    tableArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/table/template/stories/table-arg-types.js";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";
  import DsfrTable from "$lib/dsfr/DsfrTable.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  type Nis2Correspondance = "ÉLEVÉE" | "MOYENNE" | "FAIBLE / NULLE";

  interface Nis2Exigence {
    entityTypes: ("EE" | "EI")[];
    objective: string;
    category: string;
    ref: string;
    content: string;
  }

  interface Nis2IsoRef {
    ref: string;
    label: string;
  }

  interface NisRow extends Record<string, unknown> {
    exigence: Nis2Exigence;
    correspondance: Nis2Correspondance;
    isoRefs: Nis2IsoRef[];
    observation: string;
  }

  const nisRows: NisRow[] = [
    {
      exigence: {
        entityTypes: ["EE", "EI"],
        objective: "Objectif de sécurité 1 : Recensement des systèmes d'information",
        category: "Recensement des SI",
        ref: "1.1-EI/EE",
        content:
          "L'entité liste l'ensemble de ses activités et services qui ne correspondent pas aux critères pour lesquels l'entité est devenue une entité importante ou essentielle (par exemple : une entité essentielle au titre d'une activité exploitation d'oléoduc, tous les autres activités et services qu'elle fournit).",
      },
      correspondance: "MOYENNE",
      isoRefs: [
        {
          ref: "27002:2022:6.9",
          label: "Inventaire des informations et autres actifs associés",
        },
      ],
      observation:
        "Afin de valider la mesure du référentiel NIS2, la recommandation ISO doit être contextualisée par un travail de l'inventaire des activités et services de l'entité.",
    },
    {
      exigence: {
        entityTypes: ["EE", "EI"],
        objective: "Objectif de sécurité 1 : Recensement des systèmes d'information",
        category: "Recensement des SI",
        ref: "1.2-EI/EE",
        content:
          "L'entité identifie dans la liste prévue au (a) les systèmes d'information qui ne sont exposés à aucun des risques mentionnés à l'alinéa 2 de l'objectif de sécurité.",
      },
      correspondance: "MOYENNE",
      isoRefs: [
        {
          ref: "27002:2022:6.2",
          label: "Appréciation des risques de sécurité de l'information",
        },
        {
          ref: "27002:2022:6.9",
          label: "Inventaire des informations et autres actifs associés",
        },
      ],
      observation:
        "L'appréciation des risques effectuée dans le cadre des mesures ISO peut être réutilisée pour identifier les SI n'étant exposés à aucun des risques mentionnés à l'alinéa 2 de l'objectif de sécurité 1.",
    },
    {
      exigence: {
        entityTypes: ["EE", "EI"],
        objective: "Objectif de sécurité 1 : Recensement des systèmes d'information",
        category: "Recensement des SI",
        ref: "1.3-EI/EE",
        content:
          "L'entité valide et réexamine annuellement, ou en tant que de besoin notamment en cas de mise en service d'un nouveau système d'information, la liste prévue au (a).",
      },
      correspondance: "FAIBLE / NULLE",
      isoRefs: [],
      observation: "",
    },
    {
      exigence: {
        entityTypes: ["EE", "EI"],
        objective:
          "Objectif de sécurité 2 : Mise en œuvre d'un cadre de gouvernance de la sécurité numérique",
        category: "Rôles et responsabilités",
        ref: "2.A.1-EI/EE",
        content:
          "Le dirigeant exécutif de l'entité est responsable de la conformité de la sécurité numérique au sein de son entité et en particulier du suivi de la conformité des systèmes d'information aux présentes mesures.",
      },
      correspondance: "ÉLEVÉE",
      isoRefs: [
        { ref: "27001:2022:5.1", label: "Leadership et engagement" },
        { ref: "27002:2022:6.4", label: "Responsabilités de la direction" },
        {
          ref: "27002:2022:5.31",
          label: "Exigences légales, statutaires, réglementaires et contractuelles",
        },
      ],
      observation: "Il convient d'expliciter la responsabilité du dirigeant exécutif.",
    },
    {
      exigence: {
        entityTypes: ["EE", "EI"],
        objective:
          "Objectif de sécurité 2 : Mise en œuvre d'un cadre de gouvernance de la sécurité numérique",
        category: "Rôles et responsabilités",
        ref: "2.A.2-EI/EE",
        content:
          "Il désigne au moins une personne qui le conseille et l'accompagne dans l'exercice de cette responsabilité. Cette personne est le point de contact privilégié de l'Agence nationale de la sécurité des systèmes d'information pour tous les sujets relatifs à la sécurité numérique.",
      },
      correspondance: "ÉLEVÉE",
      isoRefs: [
        {
          ref: "27002:2022:5.2",
          label: "Fonctions et responsabilités liées à la sécurité de l'information",
        },
        { ref: "27002:2022:5.3", label: "Contacts avec les autorités" },
      ],
      observation:
        "Il est nécessaire de préciser l'organisation (rôles et responsabilités) mise en place dans le cadre de l'ISO en identifiant une personne conseillant le dirigeant exécutif, et point de contact de l'ANSSI.",
    },
  ];

  /** Action locale : pose l'attribut `slot` dynamiquement, contourne la restriction compile-time. */
  function setSlot(node: HTMLElement, slotName: string) {
    node.setAttribute("slot", slotName);
    return {
      update(newSlotName: string) {
        node.setAttribute("slot", newSlotName);
      },
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
    },
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
      itemsPerPage: [5, 10, 20],
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

<Story name="Avec contenu riche (Maquette NIS2)">
  {#snippet template(_args: Args)}
    <dsfr-table
      id="table-nis2"
      caption="Liste des exigences NIS 2"
      multiline
      rich
      columns={[
        { key: "exigence", label: "Exigence NIS 2", multiline: true },
        { key: "correspondance", label: "Correspondance" },
        { key: "isoRefs", label: "Référence ISO 27001/27002", multiline: true },
        { key: "observation", label: "Observations", multiline: true },
      ]}
      rows={nisRows}
    >
      {#each nisRows as row, i}
        <div use:setSlot={`cell:exigence:${i}`}>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; gap:4px; flex-wrap:wrap;">
              {#each row.exigence.entityTypes as type}
                <dsfr-badge
                  label={type}
                  type="accent"
                  accent={type === "EE" ? "green-bourgeon" : "blue-ecume"}
                  size="sm"
                  has-no-icon
                ></dsfr-badge>
              {/each}
            </div>
            <div style="display:flex; gap:4px; flex-wrap:wrap; align-items:center;">
              <dsfr-tag label={row.exigence.objective} size="sm"></dsfr-tag>
              <dsfr-tag label={row.exigence.category} size="sm"></dsfr-tag>
              <dsfr-tag label={row.exigence.ref} size="sm"></dsfr-tag>
            </div>
            <p style="margin:0; font-size:0.875rem; line-height:1.5;">{row.exigence.content}</p>
          </div>
        </div>

        <div use:setSlot={`cell:correspondance:${i}`}>
          <dsfr-badge
            label={row.correspondance}
            type="status"
            status={row.correspondance === "ÉLEVÉE"
              ? "error"
              : row.correspondance === "MOYENNE"
                ? "warning"
                : "success"}
          ></dsfr-badge>
        </div>

        {#if row.isoRefs.length > 0}
          <div use:setSlot={`cell:isoRefs:${i}`}>
            <div style="display:flex; flex-direction:column; gap:4px;">
              {#each row.isoRefs as isoRef}
                <p style="margin:0; font-size:0.875rem;">+ {isoRef.ref} {isoRef.label}</p>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </dsfr-table>
  {/snippet}
</Story>
