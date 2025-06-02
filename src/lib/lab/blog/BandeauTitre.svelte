<script lang="ts">
  export let titre: string;
  export let description: string = "";
</script>

<div class="conteneur-bandeau-entete">
  <div class="contenu-bandeau-entete">
    <div class="conteneur-texte">
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

      .conteneur-texte {
        display: flex;
        padding: 8px 0 12px 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;

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
            margin-top: 4px;
            margin-bottom: 0;

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
            margin-top: 8px;
            margin-bottom: 16px;
          }
        }
      }
    }
  }
</style>
