<svelte:options
  customElement={{
    tag: "lab-anssi-marelle",
    props: {
      titre: { attribute: "titre", type: "String" },
      baliseTitre: { attribute: "balise-titre", type: "String" },
      etapesmarelle: { attribute: "etapesmarelle", type: "Array" },
      baliseSousTitre: { attribute: "balise-sous-titre", type: "String" },
      action: { attribute: "action", type: "Object" },
    },
  }}
/>

<script lang="ts">
  import type { Action, EtapeMarelle } from "$lib/types";
  import { setThemeable } from "$lib/utilitaires";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  import Etape from "$lib/composants/marelle/Etape.svelte";

  interface Props {
    /** Titre affiché en haut de la brique Marelle */
    titre?: string;
    /** Balise Hn du titre du composant (default: h3) */
    baliseTitre?: "h2" | "h3" | "h4" | "div";
    /** Étapes de la marelle */
    etapesmarelle?: EtapeMarelle[];
    /** Balise Hn du sous-titre des étapes composant */
    baliseSousTitre?: "h3" | "h4" | "h5";
    /** Propriétés du bouton d'action */
    action?: Action;
  }

  let {
    titre = "",
    baliseTitre = "div",
    etapesmarelle = [],
    baliseSousTitre,
    action,
  }: Props = $props();

  setThemeable($host());
</script>

<div class="lab-anssi-marelle">
  <DsfrContainer>
    <section class="lab-anssi-marelle__conteneur">
      <slot name="marelle-titre">
        <svelte:element this={baliseTitre} class="lab-anssi-marelle__titre">
          {titre}
        </svelte:element>
      </slot>

      <section class="lab-anssi-marelle__etapes">
        <slot>
          {#each etapesmarelle as etapeMarelle, index}
            <Etape {index} {etapeMarelle} baliseTitre={baliseSousTitre} />
          {/each}
        </slot>
      </section>

      {#if action || $$slots["marelle-action"]}
        <div class="lab-anssi-marelle__action">
          <slot name="marelle-action">
            <DsfrButton label={action.titre} href={action.lien} target={action.target} markup="a" />
          </slot>
        </div>
      {/if}
    </section>
  </DsfrContainer>
</div>

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/setting/breakpoint";
  @import "@gouvfr/dsfr/src/dsfr/core/style/selector/tool/breakpoint";

  :host(lab-anssi-marelle) {
    display: block;
    box-sizing: border-box;
  }

  .lab-anssi-marelle {
    color: var(--text-default-grey, #3a3a3a);
    padding: var(--padding-section, 72px 0);

    *,
    *::after,
    *::before {
      box-sizing: inherit;
    }

    &__conteneur {
      display: flex;
      flex-direction: column;
      gap: 72px;
    }

    &__titre {
      color: var(--brique-marelle-titre-couleur, var(--text-title-grey, #161616));
      font-size: 32px;
      font-weight: 700;
      line-height: 40px;
      margin-block: 0;
      text-align: center;
    }

    &__etapes {
      display: flex;
      flex-direction: column;
      gap: 48px;

      @include respond-from("md") {
        gap: 32px;
        padding-block-end: 24px;
      }
    }

    &__action {
      display: flex;
      justify-content: center;
    }
  }
</style>
