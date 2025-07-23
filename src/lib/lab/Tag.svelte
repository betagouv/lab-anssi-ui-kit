<svelte:options
  customElement={{
    tag: "lab-anssi-tag",
    props: {
      couleurFond: { reflect: false, type: "String", attribute: "couleur-fond" },
      couleurTexte: { reflect: false, type: "String", attribute: "couleur-texte" },
      label: { reflect: false, type: "String", attribute: "label" },
      taille: { reflect: false, type: "String", attribute: "taille" },
      type: { reflect: false, type: "String", attribute: "type" },
    },
  }}
/>

<script lang="ts">
  export let label: string;
  export let couleurTexte: string | undefined;
  export let couleurFond: string | undefined;
  export let taille: "sm" | "md" = "sm";
  export let type: "defaut" | "selectionnable" = "defaut";
  let selectionne = false;

  const bascule = () => {
    selectionne = !selectionne;
  };
</script>

{#if type === "defaut"}
  <span class="tag {taille}" style:background={couleurFond} style:color={couleurTexte}>
    {label}
  </span>
{:else}
  <button
    class="tag {taille}"
    aria-pressed={selectionne}
    style:background={couleurFond}
    style:color={couleurTexte}
    on:click={bascule}
    on:click
  >
    {label}
  </button>
{/if}

<style lang="scss">
  .tag {
    color: $tag-couleur-texte;
    background-color: $tag-couleur-fond;
    font-family: Marianne;
    font-weight: 400;
    display: inline-block;
    width: fit-content;
    white-space: nowrap;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;

    &.sm {
      font-size: 0.75rem;
      line-height: 1.25rem;
      padding: 2px 8px;
      border-radius: 12px;
    }

    &.md {
      font-size: 0.875rem;
      line-height: 1.5rem;
      padding: 4px 12px;
      border-radius: 16px;
    }

    &:focus {
      outline: 2px solid #0a76f6;
      outline-offset: 2px;
    }
  }
  button.tag {
    color: $tag-selectionnable-couleur-texte;
    background-color: $tag-selectionnable-couleur-fond;
    border: none;
    display: inline-flex;
    position: relative;
    overflow: visible;
    cursor: pointer;
    &:hover {
      background-color: $tag-selectionnable-couleur-fond-survol;
    }
    &:active {
      background-color: $tag-selectionnable-couleur-fond-clique;
    }
    &[aria-pressed="true"] {
      color: $tag-selectionne-couleur-texte;
      background-color: transparent;
      background-image: radial-gradient(
        circle at 100% 0.25rem,
        transparent 0.578125rem,
        $tag-selectionne-couleur-fond 0.625rem
      );
      &:hover {
        background-image: radial-gradient(
          circle at 100% 0.25rem,
          transparent 0.578125rem,
          $tag-selectionne-couleur-fond-survol 0.625rem
        );
      }
      &:active {
        background-image: radial-gradient(
          circle at 100% 0.25rem,
          transparent 0.578125rem,
          $tag-selectionne-couleur-fond-clique 0.625rem
        );
      }
      &::after {
        -webkit-mask-image: url-asset("/icones/dsfr/system/checkbox-circle-line.svg");
        mask-image: url-asset("/icones/dsfr/system/checkbox-circle-line.svg");
        background-color: $tag-selectionnable-couleur-texte;

        --icon-size: 1rem;
        content: "";
        display: inline-block;
        flex: 0 0 auto;
        height: var(--icon-size);
        margin: -0.5rem;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        position: absolute;
        right: 0;
        top: 4px;
        vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
        width: var(--icon-size);
      }
    }
  }
</style>
