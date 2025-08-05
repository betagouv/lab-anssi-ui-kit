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
  interface Props {
    nom: string;
    taille?: "sm" | "md" | "lg" | undefined;
  }

  let { nom, taille = undefined }: Props = $props();
</script>

<span class="icone fr-icon-{nom} {taille}"></span>

<style lang="scss">
  .icone {
    font-family: Marianne, arial, sans-serif;
    --icon-size: 1em;
    line-height: var(--icon-size);
    height: var(--icon-size);

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
      --icon-size: 1rem;
    }

    &.md {
      --icon-size: 1.5rem;
    }

    &.lg {
      --icon-size: 2rem;
    }
  }

  @import "jeu-icone.scss";
</style>
