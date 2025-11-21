<script lang="ts">
  interface Props {
    variation?: "primaire" | "transparent" | "secondaire";
    sansMargeHaute?: boolean;
    sansMargeLaterale?: boolean;
    children?: import("svelte").Snippet;
  }

  let {
    variation = "primaire",
    sansMargeHaute = false,
    sansMargeLaterale = false,
    children,
  }: Props = $props();
</script>

<section
  class={variation}
  class:sans-marge-haute={sansMargeHaute}
  class:sans-marge-laterale={sansMargeLaterale}
>
  <div class="contenu-brique">
    {@render children?.()}
  </div>
</section>

<style lang="scss">
  section {
    font-family: Marianne;
    padding: 48px 16px;
    box-sizing: border-box;
    text-align: left;
    color: white;

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
