<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrDropdown from "$lib/dsfr/DsfrDropdown.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import Reactions from "$lib/composants/Reactions.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import Icone from "$lib/composants/Icone.svelte";

  const { Story } = defineMeta({
    title: "Exemple/ANSSI/Carte Jeu",
    component: Reactions,
    args: {
      reactions: [
        { id: "1", emoji: "🔥", compteur: 0 },
        { id: "2", emoji: "❤️", compteur: 0 },
        { id: "3", emoji: "👍", compteur: 0 },
      ],
      style: "tertiaire-sans-bordure",
      tooltipTexte: "Ajouter une réaction",
      tooltipId: "tooltipReactions",
      dropdownId: "dropdown-id",
      dropdownCollapseId: "dropdown-collapse-id",
      dropdownButtonTitle: "Choisir une option",
      dropdownButtonKind: "tertiary-no-outline",
      dropdownButtonSize: "sm",
      dropdownButtonIcon: "more-line",
      dropdownContentType: "custom",
      dropdownAlign: "right",
      dropdownButtonIconPlace: "only",
      masque: false,
    },
    tags: ["!autodocs"],
    parameters: {
      layout: "centered",
    },
  });

  type Args = ComponentProps<Reactions>;
</script>

<Story name="Défaut">
  {#snippet template(args: Args)}
    <div style="width: 300px;">
      <!-- CarteJeu exemple -->
      <div class="lab-anssi-carte-jeux">
        <div class="lab-anssi-carte-jeux__header">
          <div class="lab-anssi-carte-jeux__actions">
            <dsfr-button
              size="sm"
              kind="tertiary-no-outline"
              label="Modifier"
              hasIcon
              icon="edit-line"
            ></dsfr-button>
            <dsfr-dropdown
              align={args.dropdownAlign}
              collapseId={args.dropdownCollapseId}
              id={args.dropdownId}
              buttonTitle={args.dropdownButtonTitle}
              buttonKind={args.dropdownButtonKind}
              buttonSize={args.dropdownButtonSize}
              buttonIcon={args.dropdownButtonIcon}
              buttonIconPlace={args.dropdownButtonIconPlace}
            >
              <dsfr-toggle
                left
                label="Masquer de la vitrine des jeux"
                id="toggleExemple"
                onchange={() => (args.masque = !args.masque)}
              ></dsfr-toggle>
            </dsfr-dropdown>
          </div>

          {#if args.masque}
            <p class="lab-anssi-carte-jeux__masque">
              <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
              Masqué de la vitrine des jeux
            </p>
          {/if}
        </div>

        <!-- Conteneur -->
        <div class="lab-anssi-carte-jeux__conteneur">
          <dsfr-card
            title="Titre de la carte"
            src={Placeholder}
            hasHeaderBadge
            hasDescription={false}
            hasDetailStart={true}
            hasDetailEnd={true}
            detailStart="Détail"
            disabled={false}
            href="#"
            size="sm"
          >
            <dsfr-badges-group
              badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
              size="sm"
            ></dsfr-badges-group>

            <dsfr-tags-group
              tags={[{ id: "tag-1", label: "Libellé du tag" }]}
              size="sm"
              groupMarkup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        </div>

        <div class="lab-anssi-carte-jeux__reactions">
          <lab-anssi-reactions
            reactions={args.reactions}
            style={args.style}
            tooltipTexte={args.tooltipTexte}
            tooltipId={args.tooltipId}
          ></lab-anssi-reactions>
        </div>
      </div>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>

<Story
  name="Cas Intermédiaire"
  args={{
    reactions: [
      { id: "1", emoji: "🔥", compteur: 9 },
      { id: "2", emoji: "❤️", compteur: 0 },
      { id: "3", emoji: "👍", compteur: 0 },
    ],
  }}
>
  {#snippet template(args: Args)}
    <div style="width: 300px;">
      <!-- CarteJeu exemple -->
      <div class="lab-anssi-carte-jeux">
        <div class="lab-anssi-carte-jeux__header">
          <div class="lab-anssi-carte-jeux__actions">
            <dsfr-button
              size="sm"
              kind="tertiary-no-outline"
              label="Modifier"
              hasIcon
              icon="edit-line"
            ></dsfr-button>
            <dsfr-dropdown
              align={args.dropdownAlign}
              collapseId={args.dropdownCollapseId}
              id={args.dropdownId}
              buttonTitle={args.dropdownButtonTitle}
              buttonKind={args.dropdownButtonKind}
              buttonSize={args.dropdownButtonSize}
              buttonIcon={args.dropdownButtonIcon}
              buttonIconPlace={args.dropdownButtonIconPlace}
            >
              <dsfr-toggle
                left
                label="Masquer de la vitrine des jeux"
                id="toggleExemple"
                onchange={() => (args.masque = !args.masque)}
              ></dsfr-toggle>
            </dsfr-dropdown>
          </div>

          {#if args.masque}
            <p class="lab-anssi-carte-jeux__masque">
              <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
              Masqué de la vitrine des jeux
            </p>
          {/if}
        </div>

        <!-- Conteneur -->
        <div class="lab-anssi-carte-jeux__conteneur">
          <dsfr-card
            title="Titre de la carte"
            src={Placeholder}
            hasHeaderBadge
            hasDescription={false}
            hasDetailStart={true}
            hasDetailEnd={true}
            detailStart="Détail"
            disabled={false}
            href="#"
            size="sm"
          >
            <dsfr-badges-group
              badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
              size="sm"
            ></dsfr-badges-group>

            <dsfr-tags-group
              tags={[{ id: "tag-1", label: "Libellé du tag" }]}
              size="sm"
              groupMarkup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        </div>

        <div class="lab-anssi-carte-jeux__reactions">
          <lab-anssi-reactions
            reactions={args.reactions}
            style={args.style}
            tooltipTexte={args.tooltipTexte}
            tooltipId={args.tooltipId}
          ></lab-anssi-reactions>
        </div>
      </div>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>

<Story
  name="Cas Intermédiaire (actif)"
  args={{
    reactions: [
      { id: "1", emoji: "🔥", compteur: 9 },
      { id: "2", emoji: "❤️", compteur: 12, actif: true },
      { id: "3", emoji: "👍", compteur: 0 },
    ],
  }}
>
  {#snippet template(args: Args)}
    <div style="width: 300px;">
      <!-- CarteJeu exemple -->
      <div class="lab-anssi-carte-jeux">
        <div class="lab-anssi-carte-jeux__header">
          <div class="lab-anssi-carte-jeux__actions">
            <dsfr-button
              size="sm"
              kind="tertiary-no-outline"
              label="Modifier"
              hasIcon
              icon="edit-line"
            ></dsfr-button>
            <dsfr-dropdown
              align={args.dropdownAlign}
              collapseId={args.dropdownCollapseId}
              id={args.dropdownId}
              buttonTitle={args.dropdownButtonTitle}
              buttonKind={args.dropdownButtonKind}
              buttonSize={args.dropdownButtonSize}
              buttonIcon={args.dropdownButtonIcon}
              buttonIconPlace={args.dropdownButtonIconPlace}
            >
              <dsfr-toggle
                left
                label="Masquer de la vitrine des jeux"
                id="toggleExemple"
                onchange={() => (args.masque = !args.masque)}
              ></dsfr-toggle>
            </dsfr-dropdown>
          </div>

          {#if args.masque}
            <p class="lab-anssi-carte-jeux__masque">
              <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
              Masqué de la vitrine des jeux
            </p>
          {/if}
        </div>

        <!-- Conteneur -->
        <div class="lab-anssi-carte-jeux__conteneur">
          <dsfr-card
            title="Titre de la carte"
            src={Placeholder}
            hasHeaderBadge
            hasDescription={false}
            hasDetailStart={true}
            hasDetailEnd={true}
            detailStart="Détail"
            disabled={false}
            href="#"
            size="sm"
          >
            <dsfr-badges-group
              badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
              size="sm"
            ></dsfr-badges-group>

            <dsfr-tags-group
              tags={[{ id: "tag-1", label: "Libellé du tag" }]}
              size="sm"
              groupMarkup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        </div>

        <div class="lab-anssi-carte-jeux__reactions">
          <lab-anssi-reactions
            reactions={args.reactions}
            style={args.style}
            tooltipTexte={args.tooltipTexte}
            tooltipId={args.tooltipId}
          ></lab-anssi-reactions>
        </div>
      </div>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>

<Story
  name="Cas Max"
  args={{
    reactions: [
      { id: "1", emoji: "🔥", compteur: 9 },
      { id: "2", emoji: "❤️", compteur: 12, actif: true },
      { id: "3", emoji: "👍", compteur: 34 },
    ],
  }}
>
  {#snippet template(args: Args)}
    <div style="width: 300px;">
      <!-- CarteJeu exemple -->
      <div class="lab-anssi-carte-jeux">
        <div class="lab-anssi-carte-jeux__header">
          <div class="lab-anssi-carte-jeux__actions">
            <dsfr-button
              size="sm"
              kind="tertiary-no-outline"
              label="Modifier"
              hasIcon
              icon="edit-line"
            ></dsfr-button>
            <dsfr-dropdown
              align={args.dropdownAlign}
              collapseId={args.dropdownCollapseId}
              id={args.dropdownId}
              buttonTitle={args.dropdownButtonTitle}
              buttonKind={args.dropdownButtonKind}
              buttonSize={args.dropdownButtonSize}
              buttonIcon={args.dropdownButtonIcon}
              buttonIconPlace={args.dropdownButtonIconPlace}
            >
              <dsfr-toggle
                left
                label="Masquer de la vitrine des jeux"
                id="toggleExemple"
                onchange={() => (args.masque = !args.masque)}
              ></dsfr-toggle>
            </dsfr-dropdown>
          </div>

          {#if args.masque}
            <p class="lab-anssi-carte-jeux__masque">
              <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
              Masqué de la vitrine des jeux
            </p>
          {/if}
        </div>

        <!-- Conteneur -->
        <div class="lab-anssi-carte-jeux__conteneur">
          <dsfr-card
            title="Titre de la carte"
            src={Placeholder}
            hasHeaderBadge
            hasDescription={false}
            hasDetailStart={true}
            hasDetailEnd={true}
            detailStart="Détail"
            disabled={false}
            href="#"
            size="sm"
          >
            <dsfr-badges-group
              badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
              size="sm"
            ></dsfr-badges-group>

            <dsfr-tags-group
              tags={[{ id: "tag-1", label: "Libellé du tag" }]}
              size="sm"
              groupMarkup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        </div>

        <div class="lab-anssi-carte-jeux__reactions">
          <lab-anssi-reactions
            reactions={args.reactions}
            style={args.style}
            tooltipTexte={args.tooltipTexte}
            tooltipId={args.tooltipId}
          ></lab-anssi-reactions>
        </div>
      </div>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>

<Story name="Masqué" args={{ masque: true }}>
  {#snippet template(args: Args)}
    <div style="width: 300px;">
      <!-- CarteJeu exemple -->
      <div class="lab-anssi-carte-jeux">
        <div class="lab-anssi-carte-jeux__header">
          <div class="lab-anssi-carte-jeux__actions">
            <dsfr-button
              size="sm"
              kind="tertiary-no-outline"
              label="Modifier"
              hasIcon
              icon="edit-line"
            ></dsfr-button>
            <dsfr-dropdown
              align={args.dropdownAlign}
              collapseId={args.dropdownCollapseId}
              id={args.dropdownId}
              buttonTitle={args.dropdownButtonTitle}
              buttonKind={args.dropdownButtonKind}
              buttonSize={args.dropdownButtonSize}
              buttonIcon={args.dropdownButtonIcon}
              buttonIconPlace={args.dropdownButtonIconPlace}
            >
              <dsfr-toggle
                left
                label="Masquer de la vitrine des jeux"
                id="toggleExemple"
                checked={args.masque}
                onchange={() => (args.masque = !args.masque)}
              ></dsfr-toggle>
            </dsfr-dropdown>
          </div>

          {#if args.masque}
            <p class="lab-anssi-carte-jeux__masque">
              <lab-anssi-icone nom="eye-off-line"></lab-anssi-icone>
              Masqué de la vitrine des jeux
            </p>
          {/if}
        </div>

        <!-- Conteneur -->
        <div class="lab-anssi-carte-jeux__conteneur">
          <dsfr-card
            title="Titre de la carte"
            src={Placeholder}
            hasHeaderBadge
            hasDescription={false}
            hasDetailStart={true}
            hasDetailEnd={true}
            detailStart="Détail"
            disabled={false}
            href="#"
            size="sm"
          >
            <dsfr-badges-group
              badges={[{ label: "Libellé badge", accent: "purple-glycine" }]}
              size="sm"
            ></dsfr-badges-group>

            <dsfr-tags-group
              tags={[{ id: "tag-1", label: "Libellé du tag" }]}
              size="sm"
              groupMarkup="div"
            ></dsfr-tags-group>
          </dsfr-card>
        </div>

        <div class="lab-anssi-carte-jeux__reactions">
          <lab-anssi-reactions
            reactions={args.reactions}
            style={args.style}
            tooltipTexte={args.tooltipTexte}
            tooltipId={args.tooltipId}
          ></lab-anssi-reactions>
        </div>
      </div>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>
