<svelte:options
  customElement={{
    tag: "lab-anssi-icone",
    props: {
      nom: { reflect: false, type: "String", attribute: "nom" },
      taille: { reflect: false, type: "String", attribute: "taille" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import { withIconsStyleSheet, setIconClass } from "$lib/utilitaires";

  interface Props {
    nom: string;
    taille?: "sm" | "md" | "lg" | undefined;
  }

  let { nom, taille = undefined }: Props = $props();
  let iconClass = $derived(nom && setIconClass(nom));
</script>

<span class={["icone", taille, iconClass]}></span>

<style lang="scss">
  .icone {
    line-height: var(--icon-size, 1rem);
    height: var(--icon-size, 1rem);

    &:before {
      content: "";
      background-color: currentColor;
      display: inline-block;
      flex: 0 0 auto;
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      vertical-align: calc((0.75em - var(--icon-size, 1rem)) * 0.5);
      width: var(--icon-size, 1rem);
      height: var(--icon-size, 1rem);
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
</style>
