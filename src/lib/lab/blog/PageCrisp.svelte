<svelte:options
  customElement={{
    tag: "lab-anssi-page-crisp",
    props: {
      contenu: { reflect: false, type: "String", attribute: "contenu" },
      tableDesMatieres: { reflect: false, type: "Array", attribute: "tableDesMatieres" },
    },
  }}
/>

<script lang="ts">
  export type TableDesMatieres = {
    profondeur: number;
    texte: string;
    id: string;
  }[];

  export let contenu: string;
  export let tableDesMatieres: TableDesMatieres;
</script>

<div class="sommaire sommaire-replie">
  <details>
    <summary>
      <div class="entete-filtres">
        <img class="menu" src="/assets/images/icone-menu-lateral.svg" alt="" />
        <span id="section-active" class="titre-menu">
          {tableDesMatieres[0]?.texte}
        </span>
        <img
          class="chevron"
          src="/assets/images/icone-chevron-bas.svg"
          alt=""
        />
      </div>
    </summary>

    <ul>
      {#each tableDesMatieres as entree (entree.id)}
        <li><a href={`#${entree.id}`}>{entree.texte}</a></li>
      {/each}
    </ul>
  </details>
</div>

<div class="article">
  <div class="contenu-section">
    <div class="sommaire sommaire-deplie">
      <ul>
        {#each tableDesMatieres as entree (entree.id)}
          <li><a href={`#${entree.id}`}>{entree.texte}</a></li>
        {/each}
      </ul>
    </div>

    <div class="contenu">
      <!-- eslint-disable-next-line svelte/no-at-html-tags-->
      {@html contenu}
    </div>
  </div>
</div>

<style lang="scss">
  .sommaire-replie {
    padding: 12px var(--gouttiere);
    border: 1px solid #ddd;
    background: white;
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .sommaire-replie:has(details[open]) {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
  }
  @media (min-width: 992px) {
    .sommaire-replie {
      display: none;
    }
  }
  .sommaire-replie details ul {
    list-style-type: none;
    padding: 0;
  }
  .sommaire-replie details ul li {
    border-bottom: 1px solid #ddd;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .sommaire-replie details ul li.actif {
    background: #fff7db;
  }
  .sommaire-replie details ul li.actif a {
    border-left: 2px solid var(--jaune-msc);
    padding-left: 14px;
    border-bottom: none;
  }
  .sommaire-replie details ul li a {
    color: var(--noir);
    text-decoration: none;
    padding-left: 16px;
    display: inline-block;
    border-bottom: none;
  }
  .sommaire-replie details[open] summary .entete-filtres .chevron {
    transform: rotate(180deg);
  }
  .sommaire-replie details summary::marker {
    content: "";
  }
  .sommaire-replie details summary::-webkit-details-marker {
    display: none;
  }
  .sommaire-replie details summary .entete-filtres {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sommaire-replie details img {
    width: 16px;
    height: 16px;
  }
  .sommaire-replie details .titre-menu {
    flex-grow: 1;
  }
  .sommaire-deplie {
    display: none;
    width: 300px;
    flex: 0 0 auto;
    align-self: flex-start;
  }
  @media (min-width: 992px) {
    .sommaire-deplie {
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
    }
  }
  .sommaire-deplie ul {
    list-style-type: none;
    padding: 0;
    margin: 0 0 40px;
  }
  .sommaire-deplie ul li {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .sommaire-deplie ul li.actif {
    font-weight: bold;
  }
  .sommaire-deplie ul li.actif a {
    border-left: 2px solid var(--jaune-msc);
    padding-left: 6px;
  }
  .sommaire-deplie ul li a {
    color: var(--noir);
    border-bottom: none;
    text-decoration: none;
    padding-left: 8px;
    display: inline-block;
  }
  .sommaire-deplie span {
    margin-bottom: 16px;
    font-size: 0.85rem;
    line-height: 1.5rem;
  }
  .article {
    padding: 40px var(--gouttiere) 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
  }
  @media (min-width: 992px) {
    .article {
      padding-top: 48px;
    }
  }
  :global(.article .contenu-section) {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 992px) {
    :global(.article .contenu-section) {
      flex-direction: row;
      gap: 32px;
    }
  }
  :global(.article > .contenu) {
    padding-top: 40px;
  }
  @media (min-width: 992px) {
    :global(.article > .contenu) {
      padding-top: 48px;
      padding-left: 0;
    }
  }
  
  :global(.article section) {
    padding-bottom: 36px;
    border-bottom: 1px solid var(--gris-clair);
    margin-bottom: 36px;
  }
  :global(.article section:last-of-type) {
    margin-bottom: 0;
    border-bottom: none;
  }
  :global(.article .information) {
    background: #e8edff;
    padding: 16px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    margin: 16px 0;
    font-size: 14px;
    color: #0163cb;
    border-left: 3px solid #0079d0;
  }
  :global(.article .aide) {
    background: #f6f6f6;
    position: relative;
    padding: 20px 16px 16px 64px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    margin: 16px 0;
    font-size: 14px;
  }
  :global(.article .aide:before) {
    content: "";
    display: block;
    background-image: url("/assets/icones/aide.svg");
    width: 24px;
    height: 24px;
    position: absolute;
    top: 20px;
    left: 24px;
  }
  :global(.article .information:before) {
    content: "Information";
    font-weight: bold;
  }
  :global(.article h2) {
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2.25rem;
    margin: 0;
    padding-bottom: 32px;
  }
  @media (min-width: 992px) {
    :global(.article h2) {
      font-size: 2rem;
      line-height: 2.5rem;
    }
  }
  :global(.article h3) {
    color: #161616;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem;
  }
  :global(.article h4) {
    color: #161616;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;
    margin: 0;
  }
  :global(.article h6) {
    color: #161616;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.75rem;
  }
  :global(.article p) {
    color: var(--noir);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    padding: 16px 0;
    margin: 0;
  }
  :global(.article p:has(img)) {
    padding: 0;
  }
  :global(.article ul li) {
    padding-bottom: 8px;
  }
  .article img,
  :global(.article video) {
    width: 100%;
    margin: 32px 0;
  }
  :global(.article video) {
    border-radius: 10px;
  }
  :global(.article .conteneur-video p) {
    font-style: italic;
    margin: 0;
    padding: 0;
  }
  :global(.article a) {
    color: var(--noir);
    text-decoration: underline;
    display: inline;
    gap: 2px;
    align-items: center;
    width: fit-content;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }
  :global(.article a[target=_blank]::after) {
    display: none;
  }
  :global(.article a.telechargement) {
    display: flex;
  }
  :global(.article a.telechargement[target=_blank]::after) {
    display: flex;
    content: "";
    background: url("/assets/icones/telecharger.svg");
    width: 16px;
    height: 16px;
  }

  /*# sourceMappingURL=article-crisp.css.map */
</style>