<script lang="ts">
  export let variation: 'primaire' | 'transparent' | 'secondaire' = 'primaire';
  export let sansMargeHaute = false;
  export let sansMargeLaterale = false;
</script>

<section class={variation} class:sans-marge-haute={sansMargeHaute} class:sans-marge-laterale={sansMargeLaterale}>
  <div class="contenu-brique">
    <slot />
  </div>
</section>

<style lang="scss">
  section {
    font-family: Marianne;
    padding: 48px 16px;
    box-sizing: border-box;
    text-align: left;
    color: white;
    width: 100vw;

    &.sans-marge-haute {
      padding-top: 0;
    }

    &.sans-marge-laterale {
      padding-left: 0;
      padding-right: 0;
    }

    @include a-partir-de(tablette) {
      padding: 72px 24px;
    }

    @include a-partir-de(desktop) {
      padding: 48px 24px;
    }

    &.primaire {
      background: $brique-background-primaire;
    }
    &.transparent {
      background: none;
    }
    &.secondaire {
      background: $brique-background-secondaire;
    }
  }

  .contenu-brique {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>