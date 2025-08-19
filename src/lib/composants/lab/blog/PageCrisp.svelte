<svelte:options
  customElement={{
    tag: "lab-anssi-page-crisp",
    props: {
      contenu: { reflect: false, type: "String", attribute: "contenu" },
      tableDesMatieres: { reflect: false, type: "Array", attribute: "table-des-matieres" },
    },
  }}
/>

<script lang="ts">
  import { run } from "svelte/legacy";

  import type { TableDesMatieres } from "$lib/types";
  import SommaireMobile from "$lib/lab/blog/SommaireMobile.svelte";
  import { onDestroy, tick } from "svelte";
  import SommaireBureau from "$lib/lab/blog/SommaireBureau.svelte";

  interface Props {
    contenu: string;
    tableDesMatieres: TableDesMatieres;
  }

  let { contenu, tableDesMatieres }: Props = $props();

  let composant: HTMLDivElement = $state();
  let observateurDIntersection: IntersectionObserver;

  const observeLesSections = () => {
    observateurDIntersection = new IntersectionObserver(
      (sections) => {
        sections.forEach((section) => {
          const titreDeLaSection = section.target.querySelector("h2");
          const lesLiens = composant.querySelectorAll(
            `.sommaire ul li a[href='#${titreDeLaSection!.id}']`,
          );

          if (!lesLiens) return;

          if (section.isIntersecting) {
            lesLiens.forEach((l) => l.parentElement!.classList.add("actif"));

            const menuMobileVisible = composant.querySelector("#section-active");
            if (menuMobileVisible) menuMobileVisible.textContent = titreDeLaSection!.textContent;
          } else lesLiens.forEach((l) => l.parentElement!.classList.remove("actif"));
        });
      },
      { rootMargin: "-30% 0% -62% 0%" },
    );

    const lesSections = composant.querySelectorAll("article .contenu section");
    lesSections.forEach((s) => observateurDIntersection.observe(s));
  };

  run(() => {
    if (contenu) tick().then(observeLesSections);
  });

  const attendChargementImages = async () => {
    const images = composant.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((res) => {
          image.addEventListener("load", res);
          image.addEventListener("error", res);
        });
      }),
    );
  };

  const scroll = (cible: string) => {
    if (cible) {
      tick().then(async () => {
        const ancre = composant && composant.querySelector(cible);
        if (ancre) {
          await attendChargementImages();
          ancre.scrollIntoView(true);
        }
      });
    }
  };

  run(() => {
    if (contenu) scroll(window.location.hash);
  });

  const ancreOuverte = (evenement: CustomEvent) => scroll(`#${evenement.detail}`);

  onDestroy(() => {
    const lesSections = composant!.querySelectorAll("section");
    lesSections.forEach((s) => {
      if (observateurDIntersection) observateurDIntersection.unobserve(s);
    });
  });
</script>

<div bind:this={composant}>
  <SommaireMobile {tableDesMatieres} on:ancreOuverte={ancreOuverte} />

  <article>
    <SommaireBureau {tableDesMatieres} on:ancreOuverte={ancreOuverte} />
    <div class="contenu">
      <!-- eslint-disable-next-line svelte/no-at-html-tags-->
      {@html contenu}
    </div>
  </article>
</div>

<style lang="scss">
  article {
    font-family: $police;
    color: $texte-secondaire;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 16px 72px;

    @include a-partir-de(desktop) {
      padding: 48px 24px 72px;
      flex-direction: row;
      gap: 48px;
    }

    .contenu {
      display: flex;
      flex-direction: column;
      gap: 72px;

      :global(section) {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      :global(p) {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 400;
      }

      :global(h2) {
        color: $texte-defaut;
        font-size: 1.75rem;
        line-height: 2.25rem;
        font-weight: 700;
        margin: 0;
        scroll-margin-top: 50px; /* Hauteur de la barre de navigation */
        @include a-partir-de(tablette) {
          font-size: 2rem;
          line-height: 2.5rem;
        }
        @include a-partir-de(desktop) {
          scroll-margin-top: 0;
        }
      }

      :global(h3) {
        color: $texte-defaut;
        font-size: 1.375rem;
        line-height: 1.75rem;
        font-weight: 700;
        margin: 0;
        @include a-partir-de(tablette) {
          font-size: 1.5rem;
          line-height: 2rem;
        }
      }

      :global(h4) {
        color: $texte-defaut;
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 700;
        margin: 0;
        @include a-partir-de(tablette) {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
      }

      :global(img),
      :global(video) {
        width: 100%;
      }

      :global(video) {
        border-radius: 10px;
      }

      :global(.conteneur-video .legende) {
        font-style: italic;
        text-align: center;
        margin: 0;
        padding: 0;
      }

      :global(.information) {
        background: #e8edff;
        padding: 16px 16px 16px 24px;
        border-radius: 4px;
        color: #0163cb;
        border-left: 4px solid #0163cb;
        font-size: 0.875rem;
        line-height: 1.5rem;
        display: flex;
        flex-direction: column;

        &:before {
          content: "Information";
          font-weight: bold;
        }
      }

      :global(.aide) {
        background: #f6f6f6;
        position: relative;
        padding: 24px 24px 24px 64px;
        border-radius: 4px;
        font-size: 0.875rem;
        line-height: 1.5rem;

        &:before {
          content: "";
          display: block;
          background-image: url-asset("/icones/aide.svg");
          width: 24px;
          height: 24px;
          position: absolute;
          top: 24px;
          left: 24px;
        }
      }

      :global(a) {
        color: $couleur-lien;
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-thickness: 1px;

        &:hover {
          text-decoration-thickness: 2px;
        }
      }

      :global(a.telechargement) {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        position: relative;

        &:after {
          content: "";
          display: block;
          background: url-asset("/icones/telecharger.svg");
          filter: $filtre-couleur-primaire;
          width: 16px;
          height: 16px;
        }

        &:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: $couleur-lien;
        }

        &:hover {
          &:before {
            bottom: -1px;
            height: 2px;
          }
        }
      }

      :global(ul li) {
        padding-bottom: 8px;
      }
    }
  }
</style>
