<svelte:options customElement={{ tag: "lab-anssi-centre-aide", extend: withIconsStyleSheet }} />

<script lang="ts">
  import { run } from "svelte/legacy";
  import { fly } from "svelte/transition";
  import { MediaQuery } from "svelte/reactivity";

  import { setThemeable, withIconsStyleSheet } from "$lib/utilitaires";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  interface Lien {
    texte: string;
    href?: string;
    preventDefault?: boolean;
    id?: string;
  }

  interface Props {
    nomService: string;
    liens: string | Lien[];
    /** Callback appelé lorsqu'un lien est cliqué */
    onlienclique?: (detail: { target: EventTarget & HTMLAnchorElement }) => void;
  }

  let { nomService, liens, onlienclique }: Props = $props();

  setThemeable($host());

  let liensMisEnForme: { texte: string; href?: string; preventDefault?: boolean; id?: string }[] =
    $state([]);
  run(() => {
    liensMisEnForme = typeof liens === "string" ? JSON.parse(liens) : liens;

    if (!Array.isArray(liensMisEnForme) || liensMisEnForme.some((l) => !l.texte)) {
      throw new Error(
        "Les liens doivent respecter le type : { texte: string; href?: string; preventDefault?: boolean; id?: string }[]",
      );
    }
  });

  let ouvert: boolean = $state(false);

  $effect(() => {
    $host()?.toggleAttribute("data-open", ouvert);
  });

  const desktop = new MediaQuery("min-width: 992px");
</script>

{#if !ouvert}
  <div class="declencheur-centre-aide" transition:fly={{ y: 300 }}>
    <DsfrButton
      label="Centre d'aide"
      hasIcon
      iconPlace="left"
      icon="question-line"
      onclick={() => (ouvert = true)}
      size={desktop.current ? "lg" : "md"}
    />
  </div>
{/if}

{#if ouvert}
  <div class="centre-aide" transition:fly={{ y: 300 }}>
    <div class="entete">
      <span class="fr-icon fr-icon-question-line"></span>
      <p class="titre">Centre d'aide</p>
      <DsfrButton label="Fermer" preset="close" onclick={() => (ouvert = false)} />
    </div>

    <div class="contenu">
      <slot>
        <p class="message">
          Bonjour et bienvenue sur <b>{nomService}</b>. Comment pouvons-nous vous aider ?
        </p>

        {#if liensMisEnForme}
          {#each liensMisEnForme as lien, id (id)}
            <DsfrButton
              label={lien.texte}
              id={lien.id}
              markup={lien.preventDefault ? "button" : "a"}
              href={lien.href}
              target="_blank"
              onclick={(e: Event) => {
                if (lien.preventDefault) e.preventDefault();
                const detail = { target: e.currentTarget as EventTarget & HTMLAnchorElement };
                onlienclique?.(detail);
                $host()?.dispatchEvent(new CustomEvent("lienclique", { detail, bubbles: true }));
              }}
            />
          {/each}
        {/if}

        <p class="message marge-haute">Vous souhaitez faire une autre demande à l'ANSSI ?</p>

        <DsfrButton
          label="️⚠️ Signaler un incident ou une vulnérabilité"
          class="lien secondaire centre-aide-signaler-incident"
          kind="secondary"
          markup="a"
          href="https://club.ssi.gouv.fr/#/declarations"
          target="_blank"
        />
        <DsfrButton
          label="️️📩 Contacter d’autres services de l’ANSSI"
          class="lien secondaire centre-aide-contacter-anssi"
          kind="secondary"
          markup="a"
          href="https://cyber.gouv.fr/contacter-lanssi"
          target="_blank"
        />
      </slot>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";

  .declencheur-centre-aide {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    border-radius: 1.5rem;
    border: 1px solid var(--background-default-grey);
    box-shadow: 0 0.25rem 0.75rem 0 rgba(0, 0, 18, 0.16);
    overflow: hidden;
    z-index: var(--centre-aide-z-index, 950);

    @include a-partir-de(tablette) {
      bottom: 3rem;
      right: 3rem;
    }
  }

  .centre-aide {
    background-color: var(--background-default-grey);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: var(--centre-aide-z-index, 950);
    overflow-y: scroll;

    @include a-partir-de(tablette) {
      border: 1px solid var(--background-default-grey);
      border-radius: 0.5rem;
      box-shadow: 0 0.375rem 1.125rem 0 rgba(0, 0, 18, 0.16);
      max-width: 508px;
      height: 578px;
      top: unset;
      left: unset;
      bottom: 3rem;
      right: 3rem;
    }
  }

  .entete {
    align-items: center;
    background-color: var(--background-contrast-blue-france);
    color: var(--text-title-blue-france);
    display: flex;
    padding: 1.5rem 2rem;
    gap: 0.5rem;
    position: relative;
  }

  .titre {
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;
    margin-block: 0;

    @include a-partir-de(tablette) {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  .contenu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1rem;

    @include a-partir-de(tablette) {
      padding-inline: 2rem;
    }

    p {
      margin-block: 1rem 0.5rem;

      &:first-of-type {
        margin-block-start: 0;
      }
    }
  }
</style>
