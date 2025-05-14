<script lang="ts">
  import type { Image } from "$lib/types.js";

  export let titre: string;
  export let illustration: Image;
  export let contenu: string;
  export let classe: string = '';
</script>

<div class="tuile {classe ?? ''}">
  <div class="conteneur-image">
    <img src={illustration.lien} alt={illustration.alt} />
  </div>
  <p>{titre}</p>
  <span>{contenu}</span>
</div>

<style>
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
    width: 384px;
    min-width: 212px;
  }

  p {
    margin: 0;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
  }

  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }
</style>
