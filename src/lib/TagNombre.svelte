<svelte:options
  customElement={{
    tag: "lab-anssi-tag-nombre",
    props: {
      nombre: { reflect: true, type: "Number", attribute: "nombre" },
    },
  }}
/>

<script lang="ts">
  export let nombre: number;
</script>

<span>{nombre}</span>

<style lang="scss">
  span {
    display: flex;
    width: fit-content;
    min-width: 0.75rem;
    height: 1rem;
    padding: 2px 4px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid white;
    color: $tag-nombre-couleur-texte;
    background: $tag-nombre-background;
    font-family: Marianne;
    font-size: 0.75rem;
    line-height: 1.25rem;
  }
</style>