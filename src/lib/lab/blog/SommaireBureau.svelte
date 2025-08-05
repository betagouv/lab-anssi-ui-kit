<script lang="ts">
  import type { TableDesMatieres } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  interface Props {
    tableDesMatieres: TableDesMatieres;
  }

  let { tableDesMatieres }: Props = $props();

  const emets = createEventDispatcher<{
    ancreOuverte: string;
  }>();

  const ouvreEntree = (ancre: string) => {
    emets("ancreOuverte", ancre);
  };
</script>

<div class="sommaire sommaire-deplie">
  <ul>
    {#each tableDesMatieres as entree (entree.id)}
      <li>
        <a href={`#${entree.id}`} onclick={() => ouvreEntree(entree.id)}>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html entree.texte}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .sommaire-deplie {
    display: none;
    width: 282px;
    flex: 0 0 auto;
    align-self: flex-start;
    font-family: $police;

    @include a-partir-de(desktop) {
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0 0 40px;

      li {
        padding-top: 12px;
        padding-bottom: 12px;

        &.actif {
          a {
            color: $sommaire-actif-couleur;
            border-left: 2px solid $sommaire-actif-indicateur-couleur;
            padding-left: 6px;
          }
        }

        a {
          color: $texte-defaut;
          border-bottom: none;
          text-decoration: none;
          padding-left: 8px;
          display: inline-block;
          font-size: 1rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.5rem;
        }
      }
    }

    span {
      margin-bottom: 16px;
      font-size: 0.85rem;
      line-height: 1.5rem;
    }
  }
</style>
