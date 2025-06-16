<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  export let valeur: string;
  export let options: { label: string; valeur: unknown }[];
</script>

<div class="conteneur-liste-deroulante">
  <div class="conteneur-select">
    <img
      src={srcAsset("/icones/fleche-basse-noir.svg")}
      alt="Icône de flêche de la liste déroulante"
    />
    <select bind:value={valeur}>
      {#each options as option, index (index)}
        <option label={option.label} value={option.valeur} />
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  .conteneur-select {
    position: relative;
    width: fit-content;
    max-width: 100%;

    img {
      position: absolute;
      right: 12px;
      top: 12px;
      pointer-events: none;
    }

    select {
      appearance: none;
      padding: 8px 38px 8px 16px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: none;
      box-shadow: inset 0 -2px 0 0 $texte-secondaire;
      cursor: pointer;
      color: $texte-secondaire;
      font-family: Marianne;
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5rem;
      background: #eeeeee;
      max-width: 100%;

      &:hover {
        background: $background-default-grey-hover;
      }

      &:focus-visible {
        outline: 2px solid $couleur-focus;
        outline-offset: 2px;
      }

      option {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
</style>
