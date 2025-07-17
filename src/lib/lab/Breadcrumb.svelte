<svelte:options
  customElement={{
    tag: "lab-anssi-breadcrumb",
    props: {
      path: { reflect: false, type: "Array", attribute: "path" },
    },
  }}
/>

<script lang="ts">
  import Icone from "./Icone.svelte";

  type BreadcrumbItem = {
    label: string;
    lien?: string;
  };

  export let path: BreadcrumbItem[];

  let openMenu = false;
</script>

<div class="breadcrumb">
  <div class="breadcrumb-desktop">
    {#each path as item, i (item)}
      {#if item.lien}
        <a href={item.lien} class="breadcrumb-item">{item.label}</a>
      {:else}
        <span class="breadcrumb-item">{item.label}</span>
      {/if}
      {#if i < path.length - 1}
        <Icone nom="arrow-right-s-line" taille="sm" />
      {/if}
    {/each}
  </div>
  <div class="breadcrumb-mobile">
    <button
      class="breadcrumb-item"
      aria-haspopup="true"
      aria-expanded={openMenu}
      aria-label="Voir le fil d'Ariane"
      aria-controls="breadcrumb-dropdown"
      on:click={() => (openMenu = !openMenu)}
    >
      Voir le fil d'Ariane
    </button>
    {#if openMenu}
      <ul class="breadcrumb-dropdown">
        {#each path as item}
          <li>
            {#if item.lien}
              <a href={item.lien} class="breadcrumb-item">{item.label}</a>
            {:else}
              <span class="breadcrumb-item">{item.label}</span>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  .breadcrumb {
    font-size: 0.75rem;
    font-family: $police;
    color: white;

    &-desktop {
      display: none;

      @include a-partir-de(tablette) {
        display: block;
      }
    }

    &-mobile {
      display: block;

      @include a-partir-de(tablette) {
        display: none;
      }
    }

    &-item {
      color: white;
      background: none;
      padding: 0;
      border: none;
      border-radius: 0.25rem;

      &:focus-visible {
        outline: 2px solid $couleur-focus;
        outline-offset: 2px;
      }
    }

    &-dropdown {
      margin: 0 0 0.5rem;

      li {
        padding: 1rem 0 0;
      }
    }
  }
</style>
