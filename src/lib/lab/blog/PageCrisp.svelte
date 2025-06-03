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
  import type { TableDesMatieres } from "$lib/types";

  export let contenu: string;
  export let tableDesMatieres: TableDesMatieres;
</script>

<article>
  <div class="contenu">
    <!-- eslint-disable-next-line svelte/no-at-html-tags-->
    {@html contenu}
  </div>
</article>

<style lang="scss">
  article {
    font-family: $police;
    color: $texte-secondaire;

    .contenu {
      padding: 48px 16px 72px;
      display: flex;
      flex-direction: column;
      gap: 72px;

      @include a-partir-de(desktop) {
        padding: 48px 24px 72px;
      }

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
        @include a-partir-de(tablette) {
          font-size: 2rem;
          line-height: 2.5rem;
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
