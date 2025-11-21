<script lang="ts">
  import type { TableDesMatieres } from "$lib/types";
  import { createEventDispatcher } from "svelte";
  import IconeMenuLateral from "$lib/composants/blog/IconeMenuLateral.svelte";
  import IconeChevronBas from "$lib/composants/blog/IconeChevronBas.svelte";

  interface Props {
    tableDesMatieres: TableDesMatieres;
  }

  let { tableDesMatieres }: Props = $props();

  let detailsElement: HTMLDetailsElement = $state();

  const emets = createEventDispatcher<{
    ancreOuverte: string;
  }>();

  const ouvreEntree = (ancre: string) => {
    detailsElement.open = false;
    emets("ancreOuverte", ancre);
  };
</script>

<div class="sommaire sommaire-replie">
  <details bind:this={detailsElement}>
    <summary>
      <div class="entete-filtres">
        <IconeMenuLateral />
        <span id="section-active" class="titre-menu">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html tableDesMatieres[0]?.texte}
        </span>
        <IconeChevronBas />
      </div>
    </summary>

    <ul>
      {#each tableDesMatieres as entree (entree.id)}
        <li>
          <a href={`#${entree.id}`} onclick={() => ouvreEntree(entree.id)}>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html entree.texte}</a
          >
        </li>
      {/each}
    </ul>
  </details>
</div>

<style lang="scss">
  .sommaire-replie {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: white;
    position: sticky;
    top: 0;
    z-index: 2;
    font-family: $police;

    @include a-partir-de(desktop) {
      display: none;
    }

    &:has(:global(details[open])) {
      position: fixed;
      top: 0;
      height: 100vh;
      width: 100%;
      box-sizing: border-box;
      overflow: auto;
    }

    details {
      .entete-filtres {
        padding: 12px 16px;
        background: white;
        color: $sommaire-actif-couleur;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 16px;

        li {
          border-bottom: 1px solid #ddd;
          padding-top: 12px;
          padding-bottom: 12px;

          &.actif {
            a {
              color: $sommaire-actif-couleur;
              border-left: 2px solid $sommaire-actif-indicateur-couleur;
              padding-left: 14px;
              border-bottom: none;
            }
          }

          a {
            color: $texte-defaut;
            text-decoration: none;
            padding-left: 16px;
            display: inline-block;
            border-bottom: none;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.5rem;
          }
        }
      }

      &[open] {
        summary {
          .entete-filtres {
            background: $sommaire-mobile-fond;

            :global(.chevron) {
              transform: rotate(180deg);
            }
          }
        }
      }

      summary {
        list-style: none;
        &::marker {
          content: "";
        }

        &::-webkit-details-marker {
          display: none;
        }

        .entete-filtres {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .titre-menu {
        flex-grow: 1;
      }
    }
  }
</style>
