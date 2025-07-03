<svelte:options
  customElement={{
    tag: "lab-anssi-icone",
    props: {
      nom: { reflect: false, type: "String", attribute: "nom" },
      taille: { reflect: false, type: "String", attribute: "taille" },
    },
  }}
/>

<script lang="ts">
  export let nom: string;
  export let taille: "sm" | "md" | "lg" = "md";
</script>

<span class="icone fr-icon-{nom} {taille}"></span>

<style lang="scss">
  .icone {
    font-family: Marianne, arial, sans-serif;
    line-height: var(--icon-size);

    &:before {
      content: "";
      background-color: currentColor;
      display: inline-block;
      flex: 0 0 auto;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      vertical-align: calc((0.75em - var(--icon-size)) * 0.5);
      width: var(--icon-size);
      height: var(--icon-size);
    }

    &.sm {
      &:before {
        --icon-size: 1rem;
      }
    }

    &.md {
      &:before {
        --icon-size: 1.5rem;
      }
    }

    &.lg {
      &:before {
        --icon-size: 2rem;
      }
    }
  }

  @import "jeu-icone.scss";
</style>
