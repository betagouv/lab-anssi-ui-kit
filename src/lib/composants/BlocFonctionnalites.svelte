<svelte:options
  customElement={{
    tag: "lab-anssi-fonctionnalites",
    props: {
      titre: { attribute: "titre", type: "String" },
      description: { attribute: "description", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      avecControleSegmente: { attribute: "avec-controle-segmente", type: "Boolean" },
      elementsDuControleSegmente: { attribute: "elements-du-controle-segmente", type: "Array" },
      fonctionnalites: { attribute: "fonctionnalites", type: "Array" },
      baliseSousTitre: { attribute: "balise-sous-titre", type: "String" },
      cliquable: { attribute: "cliquable", type: "Boolean" },
      avecBouton: { attribute: "avec-bouton", type: "Boolean" },
      orientationMedia: { attribute: "orientation-media", type: "String" },
      imagePlaceholder: { attribute: "image-placeholder", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size, Status } from "$lib/types";

  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import DsfrSegmented from "$lib/dsfr/DsfrSegmented.svelte";

  type BadgeSize = Extract<Size, "sm" | "md">;
  type BadgeType = "default" | "accent" | "status";
  interface Badge {
    label: string;
    accent?: Accent;
    ellipsis?: boolean;
    hasIcon?: boolean;
    hasNoIcon?: boolean;
    icon?: string;
    size?: BadgeSize;
    status?: Status;
    type?: BadgeType;
  }

  type LinkSize = Extract<Size, "sm" | "md" | "lg">;
  type IconPlace = "left" | "right";
  interface Lien {
    label: string;
    size?: LinkSize;
    id?: string;
    disabled?: boolean;
    blank?: boolean;
    href?: string;
    download?: string;
    hasIcon?: boolean;
    icon?: string;
    iconPlace?: IconPlace;
    neutral?: boolean;
  }

  interface Fonctionnalite {
    titre: string;
    description: string;
    illustration?: string;
    badge?: Badge;
    lien?: Lien;
  }

  type Segmented = {
    id: string;
    label: string;
    name: string;
    checked?: boolean;
    value?: string | number;
    disabled?: boolean;
    icon?: string;
  };

  interface Props {
    /** Titre principal */
    titre: string;
    /** Description de la carte */
    description: string;
    /** Balise Hn du titre du composant (default: h3) */
    baliseTitre?: "h2" | "h3" | "h4";
    /** Permet d'afficher un contrôle segmenté pour filtrer les fonctionnalités */
    avecControleSegmente?: boolean;
    /** Les éléments du contrôle segmenté */
    elementsDuControleSegmente: Segmented[];
    /** Fonctionnalités de la carte */
    fonctionnalites: Fonctionnalite[] | Fonctionnalite[][];
    /** Balise Hn des sous-titres du composant (default: h4) */
    baliseSousTitre?: "h3" | "h4" | "h5";
    /** Permet de définir les items du composant comme "cliquable" ou non */
    cliquable?: boolean;
    /** Permet d'afficher un bouton dans le pied de page du composant */
    avecBouton?: boolean;
    /** Orientation du visuel par rapport aux items de fonctionnalités */
    orientationMedia: "droite" | "gauche";
    /** Image "bouche trou" qui s'affiche dans le cadre de la version non cliquable */
    imagePlaceholder?: string;
  }

  let {
    titre,
    description,
    baliseTitre = "h2",
    avecControleSegmente = false,
    elementsDuControleSegmente = [],
    fonctionnalites,
    baliseSousTitre = "h3",
    cliquable = false,
    avecBouton = false,
    orientationMedia = "droite",
    imagePlaceholder,
  }: Props = $props();

  let indexActif = $state(0);

  /**
   * Vérifie si le tableau de fonctionnalités est un tableau multidimensionnel (tableau de tableaux)
   *
   * @param tableau - Le tableau de fonctionnalités à vérifier
   *
   * @returns true si le tableau est imbriqué, false sinon
   */
  function estUnTableauImbrique(tableau: Props["fonctionnalites"]): tableau is Fonctionnalite[][] {
    return tableau.length > 0 && Array.isArray(tableau[0]);
  }

  const tableauDeFonctionnalites = $derived(
    estUnTableauImbrique(fonctionnalites) ? fonctionnalites : [fonctionnalites],
  );

  const elementsModifies = $derived(
    elementsDuControleSegmente.map((element, index) => ({
      ...element,
      value: `liste-${index + 1}`,
    })),
  );

  let valeurListeActive = $derived(elementsModifies[0]?.value ?? "liste-1");

  const indexListeActive = $derived(
    Math.max(
      0,
      elementsModifies.findIndex((e) => e.value === valeurListeActive),
    ),
  );

  const fonctionnaliteActive = $derived(
    tableauDeFonctionnalites[indexListeActive]?.[indexActif] ?? null,
  );

  const srcImageFonctionnaliteActive = $derived(
    cliquable ? (fonctionnaliteActive?.illustration ?? imagePlaceholder) : imagePlaceholder,
  );

  const legendeImageFonctionnaliteActive = $derived(
    cliquable ? (fonctionnaliteActive?.titre ?? "") : "",
  );

  /**
   * Met à jour la valeur active du contrôle segmenté.
   *
   * @param {string | number} controleSelectionne - La valeur du contrôle sélectionné
   */
  function selectionneUnControleSegmente(controleSelectionne: string | number) {
    valeurListeActive = controleSelectionne.toString();
  }
</script>

{#snippet fonctionnaliteItem(fonctionnalite: Fonctionnalite, i: number)}
  <article
    class={[
      "lab-anssi-fonctionnalites__item",
      { "lab-anssi-fonctionnalites__item--cliquable": cliquable },
    ]}
  >
    <div class="lab-anssi-fonctionnalites__wrap">
      {#if fonctionnalite.badge}
        <DsfrBadge
          label={fonctionnalite.badge.label}
          size={fonctionnalite.badge.size}
          accent={fonctionnalite.badge.accent}
          status={fonctionnalite.badge.status}
          has-icon={fonctionnalite.badge.hasIcon || undefined}
          has-no-icon={fonctionnalite.badge.hasNoIcon || undefined}
          icon={fonctionnalite.badge.icon}
          ellipsis={fonctionnalite.badge.ellipsis || undefined}
          type={fonctionnalite.badge.type}
        />
      {/if}

      <svelte:element this={baliseSousTitre} class="lab-anssi-fonctionnalites__sous-titre">
        {#if cliquable}
          <button
            type="button"
            role="tab"
            aria-selected={indexActif === i}
            aria-controls="imageActive"
            tabindex={indexActif === i ? 0 : -1}
            class="lab-anssi-fonctionnalites__bouton"
            onclick={() => (indexActif = i)}
          >
            {fonctionnalite.titre}
          </button>
        {:else}
          {fonctionnalite.titre}
        {/if}
      </svelte:element>
      <p class="lab-anssi-fonctionnalites__description">
        {fonctionnalite.description}
      </p>

      {#if !cliquable && fonctionnalite.lien}
        <DsfrLink
          label={fonctionnalite.lien.label}
          size={fonctionnalite.lien.size}
          id={fonctionnalite.lien.id}
          disabled={fonctionnalite.lien.disabled || undefined}
          blank={fonctionnalite.lien.blank || undefined}
          href={fonctionnalite.lien.href}
          download={fonctionnalite.lien.download || undefined}
          has-icon={fonctionnalite.lien.hasIcon || undefined}
          icon={fonctionnalite.lien.icon}
          icon-place={fonctionnalite.lien.iconPlace}
          neutral={fonctionnalite.lien.neutral || undefined}
        />
      {/if}
    </div>

    {#if cliquable}
      <figure class="lab-anssi-fonctionnalites__illustration">
        <img src={fonctionnalite.illustration} class="lab-anssi-fonctionnalites__image" alt="" />
      </figure>
    {/if}
  </article>
{/snippet}

<div
  class={[
    "lab-anssi-fonctionnalites",
    {
      "lab-anssi-fonctionnalites--cliquable": cliquable,
      "lab-anssi-fonctionnalites--media-gauche": orientationMedia === "gauche",
    },
  ]}
>
  <DsfrContainer>
    <section class="lab-anssi-fonctionnalites__conteneur">
      <header class="lab-anssi-fonctionnalites__entete">
        <slot name="hautentete"></slot>
        <svelte:element this={baliseTitre} class="lab-anssi-fonctionnalites__titre">
          {titre}
        </svelte:element>
        <slot name="description">
          {#if description}
            <p class="lab-anssi-fonctionnalites__chapeau">
              {description}
            </p>
          {/if}
        </slot>
      </header>

      {#if avecControleSegmente && elementsModifies.length > 0}
        <dsfr-segmented
          elements={elementsModifies}
          no-legend
          onvaluechanged={selectionneUnControleSegmente}
          value={valeurListeActive}
        ></dsfr-segmented>
      {/if}

      <div class="lab-anssi-fonctionnalites__corps">
        {#if tableauDeFonctionnalites.length > 1}
          {console.log("tableauDeFonctionnalites", tableauDeFonctionnalites)}
          {#each elementsModifies as element, i}
            <div
              id={element.value}
              class={[
                "lab-anssi-fonctionnalites__liste",
                { actif: valeurListeActive === element.value },
              ]}
              aria-labelledby={element.id}
              role="tabpanel"
            >
              {#each tableauDeFonctionnalites[i] ?? [] as fonctionnalite, j}
                {@render fonctionnaliteItem(fonctionnalite, j)}
              {/each}
            </div>
          {/each}
        {:else}
          <div class="lab-anssi-fonctionnalites__liste">
            {#each tableauDeFonctionnalites[0] ?? [] as fonctionnalite, k}
              {@render fonctionnaliteItem(fonctionnalite, k)}
            {/each}
          </div>
        {/if}

        <div class="lab-anssi-fonctionnalites__media">
          <figure class="lab-anssi-fonctionnalites__visuel">
            <img
              src={srcImageFonctionnaliteActive}
              class="lab-anssi-fonctionnalites__image"
              id="activeImage"
              alt=""
            />
            {#if cliquable && legendeImageFonctionnaliteActive}
              <figcaption class="fr-sr-only">{legendeImageFonctionnaliteActive}</figcaption>
            {/if}
          </figure>
        </div>
      </div>

      {#if avecBouton}
        <footer class="lab-anssi-fonctionnalites__pied">
          <slot name="bouton"></slot>
        </footer>
      {/if}
    </section>
  </DsfrContainer>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  :host(lab-anssi-fonctionnalites) {
    display: block;
    box-sizing: border-box;
  }

  .lab-anssi-fonctionnalites {
    color: var(--text-default-grey);
    padding: var(--padding-component, 96px 0);

    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    &__conteneur {
      display: flex;
      flex-direction: column;
      gap: 48px;
    }

    &__entete {
      @include respond-from("md") {
        flex: 0 0 calc(800% / 12);
        width: calc(800% / 12);
        max-width: calc(800% / 12);
        diplay: flex;
        flex-direction: column;
        gap: 24px;
      }
    }

    &__titre {
      color: var(--text-title-grey);
      font-size: 40px;
      line-height: 48px;
      margin-block: 0;
    }

    &__description {
      margin-block: 0;
      font-size: 18px;
      line-height: 28px;
    }

    &__corps {
      display: flex;
      flex-direction: column-reverse;
      gap: 48px;

      @include respond-from("md") {
        align-items: center;
        flex-direction: row;
        gap: 24px;
        padding-block-end: 16px;
      }
    }

    &__liste,
    &__media {
      flex: 1;
    }

    [role="tabpanel"]:not(.actif) {
      display: none;
    }

    &__item {
      position: relative;

      box-shadow: inset 0 -1px 0 0 var(--border-default-grey);

      &:has(button[aria-selected="false"]) {
        .lab-anssi-fonctionnalites__illustration {
          @include respond-to("md") {
            display: none;
          }
        }
      }

      &:has(button[aria-selected="true"]) {
        @include respond-to("md") {
          padding-block-end: 24px;
        }

        .lab-anssi-fonctionnalites {
          &__wrap {
            &::after {
              content: "";
              position: absolute;
              left: 0;
              top: 24px;
              bottom: 24px;
              width: 4px;
              background-color: #000091;
            }
          }

          &__sous-titre {
            color: #000091;
          }
        }
      }

      &--cliquable {
        .lab-anssi-fonctionnalites {
          &__wrap {
            padding-inline-start: 20px;
          }
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }

        &:active {
          background-color: rgba(0, 0, 0, 0.08);
        }
      }
    }

    &__wrap {
      padding: 24px;
      padding-inline-start: 0;
      position: relative;
    }

    &__sous-titre {
      font-size: 20px;
      line-height: 28px;
      margin-block: 0 8px;

      &:not(:first-child) {
        margin-block-start: 8px;
      }
    }

    &__description {
      color: var(--text-title-grey);
      margin-block: 0;
      font-size: 16px;
      line-height: 24px;

      &:not(last-child) {
        margin-block-end: 16px;
      }
    }

    &__illustration {
      margin: 0;
    }

    &__bouton {
      background-color: transparent;
      border-width: 0;
      color: currentColor;
      cursor: pointer;
      font: inherit;
      padding-inline: 0;

      &::after {
        content: "";
        position: absolute;
        inset: 0;
      }
    }

    &__visuel {
      margin: 0;
    }

    &__placeholder,
    &__image {
      display: block;
      max-width: 100%;
      height: auto;
    }

    &__pied {
      display: flex;
      justify-content: center;
    }

    &--media-gauche {
      .lab-anssi-fonctionnalites__corps {
        @include respond-from("md") {
          flex-direction: row-reverse;
        }
      }
    }

    &--cliquable {
      .lab-anssi-fonctionnalites {
        &__illustration {
          @include respond-from("md") {
            display: none;
          }
        }

        &__media {
          @include respond-to("md") {
            display: none;
          }
        }
      }
    }
  }

  .fr-sr-only {
    @include visually-hidden();
  }
</style>
