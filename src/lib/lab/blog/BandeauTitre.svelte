<script lang="ts">
  import type { Lien, Tag } from "$lib/types.js";

  export let titre: string;
  export let description: string = "";
  export let filAriane: Lien[] = [];
  export let tag: Tag | null = null;

  let filArianeVisible = window.matchMedia("(min-width: 576px)").matches;
</script>

<div class="conteneur-bandeau-entete">
  <div class="contenu-bandeau-entete">
    {#if filAriane.length}
      <div class="fil-ariane">
        {#if !filArianeVisible}
          <button on:click={() => (filArianeVisible = true)}>Voir le fil d'Ariane</button>
        {:else}
          {#each filAriane as lien, index (index)}
            {#if index === filAriane.length - 1}
              <span>{lien.label}</span>
            {:else}
              <a href={lien.href}>{lien.label}</a>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
    <div class="conteneur-texte">
      {#if tag}
        <div class="conteneur-tag">
          <span class="tag" style="background: {tag.couleurFond}; color: {tag.couleurTexte};"
            >{tag.label}</span
          >
        </div>
      {/if}
      <div class="conteneur-corps">
        <h1>{titre}</h1>
        {#if description}
          <span>{description}</span>
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .conteneur-bandeau-entete {
    background: $bandeau-titre-background;

    .contenu-bandeau-entete {
      padding: 16px;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: Marianne;
      max-width: 1200px;
      margin: 0 auto;
      text-align: left;

      .conteneur-texte {
        display: flex;
        padding: 8px 0 12px 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;

        .conteneur-tag {
          padding-top: 8px;

          .tag {
            padding: 2px 8px;
            border-radius: 12px;
            font-family: Marianne;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1.25rem;
          }
        }

        .conteneur-corps {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;

          h1 {
            font-family: Marianne;
            font-size: 2rem;
            font-weight: 700;
            line-height: 2.5rem;
            margin: 0;

            @include a-partir-de(tablette) {
              font-size: 2.5rem;
              line-height: 3rem;
            }
          }

          span {
            font-family: Marianne;
            font-size: 1.125rem;
            font-weight: 400;
            line-height: 1.75rem;
            margin: 0;
          }
        }
      }

      .fil-ariane {
        display: flex;
        flex-direction: row;
        gap: 4px;
        flex-wrap: wrap;

        a,
        span,
        button {
          color: white;
          font-family: Marianne;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.25rem;
        }

        button {
          border: none;
          background: none;
          margin: 0;
          padding: 0;
        }

        button,
        a {
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        a {
          display: flex;
          flex-direction: row;
          gap: 4px;
          align-items: center;
          white-space: nowrap;

          &:after {
            content: url-asset("/icones/fleche-droite-blanche.svg");
            width: 16px;
            height: 16px;
            display: flex;
          }
        }
      }
    }
  }
</style>
