<script lang="ts">
  export let direction: "gauche" | "droite" = "gauche";
</script>

<svg
  class={direction}
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5.21875 7.33336H13.3334V8.6667H5.21875L8.79475 12.2427L7.85208 13.1854L2.66675 8.00003L7.85208 2.8147L8.79475 3.75736L5.21875 7.33336Z"
    fill="black"
  />
</svg>

<style lang="scss">
  svg.droite {
    transform: rotate(180deg);

    path {
      fill: $liste-articles-couleur-fleche;
    }
  }
</style>
