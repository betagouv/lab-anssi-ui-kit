<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { tabsArgs } from "@gouvfr/dsfr/src/dsfr/component/tab/template/stories/tabs-arg-types.js";

  import DsfrTabs from "$lib/dsfr/DsfrTabs.svelte";
  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { Story } = defineMeta({
    title: "Exemples/MSS",
    component: DsfrTabs,
    args: {
      ...tabsArgs,
      tabs: [
        {
          label: "A faire",
          id: "notifications-tabs-1",
          content: "",
        },
        {
          label: "Nouveautés",
          id: "notifications-tabs-2",
        },
        {
          label: "Toutes",
          id: "notifications-tabs-3",
        },
      ],
      hasIcon: false,
    },
    tags: ["!autodocs"],
  });

  let selectedTab = $state(0);

  type Args = ComponentProps<DsfrTabs>;
</script>

<Story name="Tabs notifications">
  {#snippet template(args: Args)}
    <dsfr-tabs tabs={args.tabs} aria-label="Notifications" has-icon={args.hasIcon || undefined}>
      {#each args.tabs as tab, i}
        <!-- Onglets -->
        <span slot={`tab-${i + 1}`} class="notification-tab">
          {args.tabs[i].label}
          <span class={["notification-tab__indicator", selectedTab === i ? "selected" : ""]}>
            {i + 1}
          </span>
        </span>

        <!-- Panneaux -->
        <!-- <div slot={`panel-${i + 1}`}>
          <div class="panel-container">
            <p>
              <strong>
                Contenu de l'onglet <dsfr-badge label={i + 1} type="accent" accent="green-archipel"
                ></dsfr-badge>
              </strong>
            </p>
            {#if i === 0}
              <div class="card-container">
                {#each Array(10) as _, j}
                  <dsfr-card
                    title={`Intitulé de la carte ${j + 1}`}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et"
                    detail-start="détail (optionnel)"
                    detail-start-icon="warning-fill"
                    detail-end="détail (optionnel)"
                    detail-end-icon="warning-fill"
                    markup="h3"
                    action-markup="a"
                    href="[URL - à modifier]"
                    size="md"
                    src="https://betagouv.github.io/lab-anssi-ui-kit/assets/placeholder.16x9-BgJU1mfU.png"
                    alt="[À MODIFIER - vide ou texte alternatif de l’image]"
                    image-ratio="default"
                    variations="none"
                    has-description
                    enlarge
                    horizontal
                  ></dsfr-card>
                {/each}
              </div>
            {/if}

            <dsfr-button class="fr-mt-2w" size="sm" variant="secondary">
              Action de l'onglet {i + 1}
            </dsfr-button>
          </div>
        </div> -->
      {/each}

      <div slot="panel-1" class="panel-container">
        <!-- Carte n°1 -->
        <dsfr-card
          title="Mettez à jour votre SIRET"
          has-description
          description="Nous vous invitons à renseigner le nom ou le numéro de SIRET de votre organisation."
          has-badge
          href="#"
          size="sm"
          horizontal
          has-buttons
        >
          <!-- Badges Group (slot: badgesgroup) -->
          <dsfr-badges-group
            slot="badgesgroup"
            badges={[{ label: "A faire", type: "status", status: "warning" }]}
            size="sm"
          ></dsfr-badges-group>

          <!-- Buttons Group (slot: buttonsgroup) -->
          <dsfr-buttons-group
            slot="buttonsgroup"
            buttons={[
              {
                label: "Mettre à jour",
                kind: "secondary",
              },
            ]}
            inline="true"
          ></dsfr-buttons-group>
        </dsfr-card>

        <!-- Carte n°2 -->
        <dsfr-card
          title="Passez au nouveau référentiel"
          has-description
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          has-badge
          href="#"
          size="sm"
          horizontal
          has-buttons
        >
          <!-- Badges Group (slot: badgesgroup) -->
          <dsfr-badges-group
            slot="badgesgroup"
            badges={[{ label: "A faire", type: "status", status: "warning" }]}
            size="sm"
          ></dsfr-badges-group>

          <!-- Buttons Group (slot: buttonsgroup) -->
          <dsfr-buttons-group
            slot="buttonsgroup"
            buttons={[
              {
                label: "Nouveau référentiel",
                kind: "secondary",
              },
            ]}
            inline="true"
          ></dsfr-buttons-group>
        </dsfr-card>
      </div>
    </dsfr-tabs>

    <style lang="scss">
      .notification-tab {
        display: inline-flex;
        align-items: center;
        gap: 12px;

        &__indicator {
          background-color: var(--background-default-grey);
          color: var(--text-action-high-grey);
          display: inline-flex;
          align-items: center;
          border-radius: 50%;
          height: 16px;
          width: 16px;
          justify-content: center;
          font-size: 12px;
          font-weight: 400;

          &.selected {
            background-color: var(--background-active-blue-france);
            color: var(--text-inverted-grey);
          }
        }
      }

      .panel-container {
        display: flex;
        gap: 12px;
        flex-direction: column;
      }
    </style>
  {/snippet}
</Story>
