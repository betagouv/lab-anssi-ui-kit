<script lang="ts">
  import type { Image } from "$lib/types.js";

  export let titre: string;
  export let illustration: Image;
  export let contenu: string;
  export let position: "premiere" | "derniere" | null = null;
</script>

<div class="tuile {position ?? ''}">
  <div class="conteneur-image">
    <img src={illustration.lien} alt={illustration.alt} />
  </div>
  <p>{titre}</p>
  <span>{contenu}</span>
</div>

<style lang="scss">
  .tuile {
    --couleur-texte: #000000;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: #fff;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    color: var(--couleur-texte);
    min-width: 212px;
    box-sizing: border-box;
    scroll-snap-align: center;
    flex-shrink: 0;
    width: calc(100vw - 60px);
    max-width: 384px;

    &.premiere {
      margin-left: var(--espacement);

      @include a-partir-de(largeur-max-contenu) {
        margin-left: 0;
      }
    }

    &.derniere {
      margin-right: var(--espacement);

      @include a-partir-de(largeur-max-contenu) {
        margin-right: 0;
      }
    }

    .conteneur-image {
      img {
        max-width: 96px;
        max-height: 96px;
      }
    }
  }

  p {
    margin: 0;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 700;

    @include a-partir-de(tablette-grand) {
      font-size: 20px;
      line-height: 28px;
    }
  }

  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
</style>
