<svelte:options
  customElement={{
    tag: "lab-anssi-presentation-anssi",
    props: {
      titre: { attribute: "titre", type: "String" },
      labelBouton: { attribute: "label-bouton", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets.js";
  import { setThemeable } from "$lib/utilitaires";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  interface Props {
    /** Titre de la section */
    titre?: string;
    /** Libellé du bouton */
    labelBouton?: string;
  }

  const { titre = "Qu'est-ce que l'ANSSI ?", labelBouton = "En savoir plus" }: Props = $props();

  setThemeable($host());
</script>

<section class="presentation-anssi">
  <DsfrContainer>
    <div class="presentation-anssi__conteneur">
      <figure class="presentation-anssi__visuel">
        <img
          src={srcAsset("/illustrations/logo-anssi.svg")}
          alt="Logo de l'ANSSI"
          class="presentation-anssi__logo"
        />
      </figure>

      <div class="presentation-anssi__contenu">
        <h2 class="presentation-anssi__titre">{titre}</h2>
        <div class="presentation-anssi__description">
          <slot>
            <p>
              Créée en 2009, l'Agence nationale de la sécurité des systèmes d'information (<abbr
                >ANSSI</abbr
              >) est l'autorité nationale en matière de cybersécurité et de cyberdéfense.
            </p>
            <p>
              <strong>
                Son action pour la protection de la Nation face aux cyberattaques se traduit en cinq
                grandes missions : défendre, connaître, partager, accompagner, réguler.
              </strong>
            </p>
          </slot>
        </div>
        <DsfrButton
          class="presentation-anssi__bouton"
          label={labelBouton}
          kind="secondary"
          markup="a"
          href="https://cyber.gouv.fr/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  </DsfrContainer>
</section>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .presentation-anssi {
    color: var(--text-default-grey);
    padding: var(--padding-section, 4.5rem 0);

    &__conteneur {
      --colonnes-gap: 1.5rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--colonnes-gap);

      @include a-partir-de(desktop-dsfr) {
        --colonnes-gap: 0;

        flex-direction: row;
        align-items: center;
      }
    }

    &__visuel,
    &__contenu {
      @include a-partir-de(desktop-dsfr) {
        flex: 0 0 var(--colonne-taille);
        max-width: var(--colonne-taille);
        width: var(--colonne-taille);
      }
    }

    &__contenu {
      --colonne-taille: calc(800% / 12);

      padding-block-end: 1rem;
      text-align: center;

      @include a-partir-de(desktop-dsfr) {
        text-align: left;
      }
    }

    &__titre {
      color: var(--presentation-anssi-couleur-titre, var(--text-title-grey));

      margin: 0 auto 1rem;
      font-size: 2rem;
      font-weight: 700;
      line-height: 2.5rem;
    }

    &__description {
      font-size: 1rem;
      line-height: 1.5rem;
      margin-block-end: 1.5rem;
    }

    abbr {
      text-decoration: none;
    }

    p {
      &:first-of-type {
        margin-block-start: 0;
      }

      &:last-of-type {
        margin-block-end: 0;
      }
    }

    &__visuel {
      --colonne-taille: calc(400% / 12);

      @include a-partir-de(desktop-dsfr) {
        order: 1;
      }
    }

    &__visuel,
    &__logo {
      margin: 0 auto;
    }

    &__logo {
      display: block;
      height: auto;
      width: 140px;
    }
  }
</style>
