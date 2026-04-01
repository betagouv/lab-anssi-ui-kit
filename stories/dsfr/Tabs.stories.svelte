<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    tabsArgTypes,
    tabsArgs,
    tabsProps,
  } from "@gouvfr/dsfr/src/dsfr/component/tab/template/stories/tabs-arg-types.js";

  import DsfrTabs from "$lib/dsfr/DsfrTabs.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tabs",
    component: DsfrTabs,
    args: tabsArgs,
    argTypes: {
      ...tabsArgTypes,
      "panel-n": {
        name: "panel-{n}",
        description:
          "Slot dynamique pour le contenu du panneau n (ex&nbsp;: `panel-1`, `panel-2`…). " +
          "Remplace `Tab.content` pour ce panneau.",
        table: {
          category: "Slots",
          type: { summary: "HTMLElement" },
        },
        control: false,
      },
      ontabchanged: {
        description:
          "Déclenché lors du changement d'onglet actif (clic ou navigation clavier).<br>" +
          "`detail: { index: number, tab: { id, label, content, icon? } }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ index: number, tab: Tab }>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["tabchanged"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-tabs"),
        },
      },
    },
    render: template,
  });

  let selectedTab = $state(0);

  type Args = ComponentProps<DsfrTabs>;
</script>

{#snippet template(args: Args)}
  <dsfr-tabs
    tabs={tabsProps(args).tabs}
    aria-label="Exemple d'onglets"
    has-icon={args.hasIcon || undefined}
  >
  </dsfr-tabs>
{/snippet}

<Story name="Défaut" />

<Story
  name="Avec Icones"
  args={{
    hasIcon: true,
  }}
/>

<Story name="Avec Slots" args={{ ...tabsArgs, hasIcon: false }}>
  {#snippet template(args: Args)}
    <dsfr-tabs
      tabs={tabsProps(args).tabs}
      aria-label="Exemple d'onglets avec Slots"
      has-icon={args.hasIcon || undefined}
      ontabchanged={(e) => (selectedTab = e.detail.index)}
    >
      {#each args.tabs as tab, i}
        <span slot={`tab-${i + 1}`} class="custom-tab">
          Libellé de l'onglet
          <span class={["custom-tag", selectedTab === i ? "selected" : ""]}>
            {i + 1}
          </span>
        </span>
        <div slot={`panel-${i + 1}`}>
          <p>
            <strong>
              Contenu de l'onglet <dsfr-badge label={i + 1} type="accent" accent="green-archipel"
              ></dsfr-badge>
            </strong>
          </p>
        </div>
      {/each}
    </dsfr-tabs>

    <style>
      .custom-tab {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
      }

      .custom-tag {
        border: 1px solid white;
        display: inline-flex;
        align-items: center;
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        justify-content: center;
        font-size: 0.75rem;

        &.selected {
          background-color: var(--border-active-blue-france);
          color: white;
        }
      }
    </style>
  {/snippet}
</Story>
