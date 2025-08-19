<svelte:options
  customElement={{
    tag: "lab-anssi-bandeau-titre",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      description: { reflect: false, type: "String", attribute: "description" },
      filAriane: { reflect: false, type: "Array", attribute: "fil-ariane" },
      tag: { reflect: false, type: "Object", attribute: "tag" },
    },
  }}
/>

<script lang="ts">
  import type { Lien, NoeudFilAriane, InfosTag } from "$lib/types";
  import Tag from "$lib/lab/Tag.svelte";

  const estLien = (noeud: NoeudFilAriane): noeud is Lien => (noeud as Lien).href !== undefined;

  interface Props {
    titre: string;
    description?: string;
    filAriane?: NoeudFilAriane[];
    infosTag?: InfosTag | null;
  }

  let { titre, description = "", filAriane = [], infosTag = null }: Props = $props();

  let filArianeVisible = $state(window.matchMedia("(min-width: 576px)").matches);
</script>

<div class="conteneur-bandeau-entete">
  <div class="contenu-bandeau-entete">
    {#if filAriane.length}
      <div class="fil-ariane">
        {#if !filArianeVisible}
          <button onclick={() => (filArianeVisible = true)}>Voir le fil d'Ariane</button>
        {:else}
          {#each filAriane as noeud, index (index)}
            {#if estLien(noeud)}
              <a href={noeud.href}>{noeud.label}</a>
            {:else}
              <span>{noeud.label}</span>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
    <div class="conteneur-texte">
      {#if infosTag}
        <div class="conteneur-tag">
          <Tag
            couleurFond={infosTag.couleurFond}
            couleurTexte={infosTag.couleurTexte}
            label={infosTag.label}
          />
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
