<script lang="ts">
  export let variation: 'primaire' | 'transparent' = 'primaire';

</script>

<section class={variation}>
  <div class="contenu-brique">
    <slot />
  </div>
</section>

<style lang="scss">
  section {
    font-family: Marianne;
    padding: 48px 16px;
    text-align: left;
    width: calc(100vw - 32px);
    color: white;

    @include a-partir-de(tablette) {
      padding: 72px 24px;
      width: calc(100vw - 48px);
    }

    @include a-partir-de(desktop) {
      padding: 48px 24px;
      width: calc(100vw - 48px);
    }

    &.primaire {
      background: $brique-background-primaire;
    }
    &.transparent {
      background: none;
    }
  }

  .contenu-brique {
    max-width: 1200px;
    margin: 0 auto;
  }




</style>