<svelte:options
  customElement={{
    tag: "lab-anssi-fonctionnalites",
    props: {
      titre: { attribute: "titre", type: "String" },
      description: { attribute: "description", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      avecControleSegmente: { attribute: "avec-controle-segmente", type: "Boolean" },
      elementsDuControleSegmente: { attribute: "elements-du-controle-segmente", type: "Array" },
      tailleControleSegmente: { attribute: "taille-controle-segmente", type: "String" },
      fonctionnalites: { attribute: "fonctionnalites", type: "Array" },
      baliseDesSousTitres: { attribute: "balise-des-sous-titres", type: "String" },
      cliquable: { attribute: "cliquable", type: "Boolean" },
      avecCTA: { attribute: "avec-cta", type: "Boolean" },
      orientationMedia: { attribute: "orientation-media", type: "String" },
      imagePlaceholder: { attribute: "image-placeholder", type: "String" },
      activeDefilement: { attribute: "active-defilement", type: "Boolean" },
      delaiDefilement: { attribute: "delai-defilement", type: "Number" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Accent, Size, Status } from "$lib/types";
  import { setThemeable, withIconsStyleSheet } from "$lib/utilitaires";
  import { createSlot } from "$lib/directives/actions.svelte.ts";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
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
    description?: string;
    id?: string;
    illustration?: string;
    badge?: Badge;
    lien?: Lien;
    rich?: boolean;
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
    /** Description du bloc fonctionnalités
     * _(L'absence de contenu dans cette prop masque automatiquement la zone d'affichage associée)_
     **/
    description?: string;
    /** Balise Hn du titre du composant (default: h3) */
    baliseTitre?: "h2" | "h3" | "h4";
    /** Permet d'afficher un contrôle segmenté pour filtrer les fonctionnalités */
    avecControleSegmente?: boolean;
    /** Taille du contrôle segmenté (default: md) */
    tailleControleSegmente?: Extract<Size, "sm" | "md">;
    /** Les éléments du contrôle segmenté */
    elementsDuControleSegmente?: Segmented[];
    /** Fonctionnalités de la carte */
    fonctionnalites: Fonctionnalite[] | Fonctionnalite[][];
    /** Balise Hn des sous-titres du composant (default: h3) */
    baliseDesSousTitres?: "h3" | "h4" | "h5";
    /** Permet de définir les items du composant comme "cliquable" ou non */
    cliquable?: boolean;
    /** Permet d'afficher un bouton dans le pied de page du composant */
    avecCTA?: boolean;
    /** Orientation du visuel par rapport aux items de fonctionnalités (default: droite) */
    orientationMedia?: "droite" | "gauche";
    /** Image "bouche trou" qui s'affiche dans le cadre de la version non cliquable */
    imagePlaceholder?: string;
    /** Délai en millisecondes entre chaque transition automatique (default: 5000) */
    delaiDefilement?: number;
    /** Active ou désactive le défilement automatique (default: false) */
    activeDefilement?: boolean;
  }

  let {
    titre,
    description,
    baliseTitre = "h2",
    avecControleSegmente = false,
    tailleControleSegmente = "md",
    elementsDuControleSegmente = [],
    fonctionnalites,
    baliseDesSousTitres = "h3",
    cliquable = false,
    avecCTA = false,
    orientationMedia = "droite",
    imagePlaceholder,
    delaiDefilement = 5000,
    activeDefilement = false,
  }: Props = $props();

  setThemeable($host());

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

  const elementsModifiesDuControleSegmente = $derived(
    elementsDuControleSegmente.map((element, index) => ({
      ...element,
      value: element.value ? `liste-${element.value}` : `liste-${index + 1}`,
    })),
  );

  let valeurListeActive = $derived(elementsModifiesDuControleSegmente[0]?.value ?? "liste-1");

  const indexListeActive = $derived(
    Math.max(
      0,
      elementsModifiesDuControleSegmente.findIndex((e) => e.value === valeurListeActive),
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
  function selectionneUnControleSegmente(controleSelectionne: CustomEvent<string | number>) {
    valeurListeActive = controleSelectionne.detail.toString();
  }

  let enPauseSurvol = $state(false);
  let enPauseManuelle = $state(false);
  let prefereMouvementReduit = $state(false);
  let mediaCloneContainer = $state<HTMLDivElement>();

  const hasMediaSlotContent = $derived(
    !$host().querySelector('[slot="media"]') &&
      !!fonctionnaliteActive?.id &&
      !!$host().querySelector(`[slot="media-${fonctionnaliteActive.id}"]`),
  );

  $effect(() => {
    const mediaQueryReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefereMouvementReduit = mediaQueryReducedMotion.matches;

    const gereLaPreferenceMouvementReduit = (e: MediaQueryListEvent) => {
      prefereMouvementReduit = e.matches;
    };
    mediaQueryReducedMotion.addEventListener("change", gereLaPreferenceMouvementReduit);

    return () =>
      mediaQueryReducedMotion.removeEventListener("change", gereLaPreferenceMouvementReduit);
  });

  $effect(() => {
    if (!cliquable || !activeDefilement || !delaiDefilement || delaiDefilement <= 0) return;
    if (enPauseSurvol || enPauseManuelle || prefereMouvementReduit) return;

    const nombreElements = (tableauDeFonctionnalites[indexListeActive] ?? []).length;
    if (nombreElements <= 1) return;

    const interval = setInterval(() => {
      indexActif = (indexActif + 1) % nombreElements;
    }, delaiDefilement);

    return () => clearInterval(interval);
  });

  $effect(() => {
    const host = $host();
    const activeId = fonctionnaliteActive?.id;

    if (activeId) {
      host.dataset.activeItem = activeId;
    } else {
      delete host.dataset.activeItem;
    }

    if (!mediaCloneContainer) return;

    mediaCloneContainer.innerHTML = "";

    if (activeId) {
      const source = host.querySelector(`[slot="media-${activeId}"]`);
      if (source) {
        const clone = source.cloneNode(true) as HTMLElement;
        clone.removeAttribute("slot");
        mediaCloneContainer.appendChild(clone);
      }
    }
  });

  function pauseDefilement() {
    enPauseSurvol = true;
  }

  function reprendDefilement() {
    enPauseSurvol = false;
  }
</script>

{#snippet illustrationFonctionnalite(fonctionnalite: Fonctionnalite, hasSlot: boolean)}
  <figure
    class={[
      hasSlot ? "lab-anssi-fonctionnalites__visuel" : "lab-anssi-fonctionnalites__illustration",
    ]}
  >
    <img src={fonctionnalite.illustration} class="lab-anssi-fonctionnalites__image" alt="" />
  </figure>
{/snippet}

{#snippet unElementFonctionnalite(fonctionnalite: Fonctionnalite, index: number)}
  <article
    id={fonctionnalite.id}
    class={[
      "lab-anssi-fonctionnalites__element",
      { "lab-anssi-fonctionnalites__element--cliquable": cliquable },
    ]}
  >
    <div class="lab-anssi-fonctionnalites__wrap">
      {#if fonctionnalite.rich && fonctionnalite.id}
        <div use:createSlot={`badge-${fonctionnalite.id}`}>
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
        </div>
      {:else if fonctionnalite.badge}
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

      <svelte:element this={baliseDesSousTitres} class="lab-anssi-fonctionnalites__sous-titre">
        {#if cliquable}
          <button
            type="button"
            role="tab"
            aria-selected={indexActif === index}
            aria-controls={hasMediaSlotContent ? undefined : "activeImage"}
            tabindex={indexActif === index ? 0 : -1}
            class="lab-anssi-fonctionnalites__bouton"
            onclick={() => (indexActif = index)}
          >
            {fonctionnalite.titre}
          </button>
        {:else}
          {fonctionnalite.titre}
        {/if}
      </svelte:element>

      {#if fonctionnalite.description}
        <p class="lab-anssi-fonctionnalites__description">
          {fonctionnalite.description}
        </p>
      {/if}

      {#if fonctionnalite.rich && fonctionnalite.id}
        <div use:createSlot={`lien-${fonctionnalite.id}`}>
          {#if !cliquable && fonctionnalite.lien}
            <DsfrLink
              label={fonctionnalite.lien.label}
              size="md"
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
      {:else if !cliquable && fonctionnalite.lien}
        <DsfrLink
          label={fonctionnalite.lien.label}
          size="md"
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
      {#if fonctionnalite.rich && fonctionnalite.id}
        <div
          use:createSlot={`media-${fonctionnalite.id}`}
          class="lab-anssi-fonctionnalites__illustration"
        >
          {#if fonctionnalite.illustration}
            {@render illustrationFonctionnalite(fonctionnalite, true)}
          {/if}
        </div>
      {:else if fonctionnalite.illustration}
        {@render illustrationFonctionnalite(fonctionnalite, false)}
      {/if}
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

    {#if avecControleSegmente && elementsModifiesDuControleSegmente.length > 0}
      <dsfr-segmented
        elements={elementsModifiesDuControleSegmente}
        no-legend
        onvaluechanged={selectionneUnControleSegmente}
        size={tailleControleSegmente}
        value={valeurListeActive}
      ></dsfr-segmented>
    {/if}

    <div
      class="lab-anssi-fonctionnalites__corps"
      role="group"
      onmouseenter={pauseDefilement}
      onmouseleave={reprendDefilement}
      onfocusin={pauseDefilement}
      onfocusout={reprendDefilement}
    >
      {#if tableauDeFonctionnalites.length > 1}
        {#each elementsModifiesDuControleSegmente as element, i}
          <div
            id={element.value}
            class={[
              "lab-anssi-fonctionnalites__liste",
              { actif: valeurListeActive === element.value },
            ]}
            aria-labelledby={element.id}
            role="tabpanel"
            tabindex="0"
          >
            {#each tableauDeFonctionnalites[i] ?? [] as fonctionnalite, j}
              {@render unElementFonctionnalite(fonctionnalite, j)}
            {/each}
          </div>
        {/each}
      {:else}
        <div class="lab-anssi-fonctionnalites__liste" role="group">
          {#each tableauDeFonctionnalites[0] ?? [] as fonctionnalite, k}
            {@render unElementFonctionnalite(fonctionnalite, k)}
          {/each}
        </div>
      {/if}

      <div class="lab-anssi-fonctionnalites__media">
        <slot name="media">
          {#if hasMediaSlotContent}
            <div
              bind:this={mediaCloneContainer}
              class="lab-anssi-fonctionnalites__media-wrapper"
            ></div>
          {:else}
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
          {/if}
        </slot>

        {#if activeDefilement && cliquable}
          <dsfr-button
            label={enPauseManuelle
              ? "Lancer le défilement automatique"
              : "Mettre en pause le défilement automatique"}
            class="lab-anssi-fonctionnalites__bouton-defilement"
            kind="secondary"
            size="sm"
            has-icon
            icon-place="only"
            icon={enPauseManuelle ? "play-circle-line" : "pause-circle-line"}
            onclick={() => (enPauseManuelle = !enPauseManuelle)}
            onkeydown={(event: KeyboardEvent) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                enPauseManuelle = !enPauseManuelle;
              }
            }}
            role="button"
            tabindex="0"
          ></dsfr-button>
        {/if}
      </div>
    </div>

    {#if avecCTA}
      <footer class="lab-anssi-fonctionnalites__pied">
        <slot name="cta"></slot>
      </footer>
    {/if}
  </section>
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
    padding: var(--padding-composant, 0);

    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    &__conteneur {
      display: flex;
      flex-direction: column;
      gap: rem(48px);
    }

    &__entete {
      @include respond-from("md") {
        flex: 0 0 calc(800% / 12);
        width: calc(800% / 12);
        max-width: calc(800% / 12);
        display: flex;
        flex-direction: column;
        gap: rem(24px);
      }
    }

    &__titre {
      color: var(--text-title-grey);
      font-size: rem(40px);
      line-height: rem(48px);
      margin-block: 0;
    }

    &__description,
    &__chapeau {
      font-size: rem(18px);
      line-height: rem(28px);
      margin-block: 0;
    }

    &__corps {
      display: flex;
      flex-direction: column-reverse;
      gap: 48px;

      @include respond-from("md") {
        align-items: center;
        flex-direction: row;
        gap: rem(24px);
        padding-block-end: rem(16px);
      }
    }

    &__liste,
    &__media {
      flex: 1;
    }

    &__media {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      &-wrapper {
        width: 100%;
      }
    }

    [role="tabpanel"]:not(.actif) {
      display: none;
    }

    &__element {
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
          padding-block-end: rem(24px);
        }

        .lab-anssi-fonctionnalites {
          &__wrap {
            &::after {
              content: "";
              position: absolute;
              left: 0;
              top: rem(24px);
              bottom: rem(24px);
              width: rem(4px);
              background-color: var(--border-active-alt-blue-france-lab, #000091);
            }
          }

          &__sous-titre {
            color: var(--text-active-blue-france, #000091);
          }
        }
      }

      &--cliquable {
        .lab-anssi-fonctionnalites {
          &__wrap {
            padding-inline-start: rem(20px);
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
      padding: rem(24px);
      padding-inline-start: 0;
      position: relative;
    }

    &__sous-titre {
      color: var(--text-title-grey);
      font-size: rem(20px);
      line-height: rem(28px);
      margin-block: 0 rem(8px);

      &:not(:first-child) {
        margin-block-start: rem(8px);
      }
    }

    &__description {
      color: var(--text-default-grey);
      margin-block: 0;
      font-size: rem(16px);
      line-height: rem(24px);

      &:not(:last-child) {
        margin-block-end: rem(16px);
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
      text-align: left;

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

    &__bouton-defilement {
      position: absolute;
      bottom: 0;
      right: 0;

      @include respond-from("md") {
        position: static;
        align-self: flex-end;
      }
    }

    &:has(.lab-anssi-fonctionnalites__bouton-defilement) {
      @include respond-to("md") {
        padding-block-end: rem(72px);
        position: relative;
      }
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
          .lab-anssi-fonctionnalites__visuel,
          .lab-anssi-fonctionnalites__media-wrapper {
            @include respond-to("md") {
              display: none;
            }
          }
        }
      }
    }
  }

  .fr-sr-only {
    @include visually-hidden();
  }
</style>
