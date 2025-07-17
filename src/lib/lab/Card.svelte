<svelte:options
  customElement={{
    tag: "lab-anssi-card",
    props: {
      titre: { reflect: false, type: "String", attribute: "titre" },
      surtitre: { reflect: false, type: "String", attribute: "surtitre" },
      badge: { reflect: false, type: "Object", attribute: "badge" },
      tags: { reflect: false, type: "Array", attribute: "tags" },
      image: { reflect: false, type: "String", attribute: "image" },
      lien: { reflect: false, type: "String", attribute: "lien" },
      externe: { reflect: false, type: "Boolean", attribute: "externe" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";

  export let titre: string;
  export let surtitre: string;
  export let badge: { label: string; couleur: string; icone: string } | undefined;
  export let tags: string[] = [];
  export let image: string;
  export let lien: string;
  export let externe: boolean = false;
</script>

<a
  class="card"
  href={lien}
  target={externe ? "_blank" : undefined}
  rel={externe ? "noopener noreferrer" : undefined}
  aria-label={titre}
>
  <div class="card-image-wrapper">
    {#if badge}
      <div class="card-badge" style="background-color: {badge.couleur};">
        <Icone nom={badge.icone} taille="sm" />
        <span class="card-badge-label">{badge.label}</span>
      </div>
    {/if}
    <img class="card-image" src={image} alt={titre} loading="lazy" />
  </div>
  <div class="card-content">
    <div class="card-title-wrapper">
      <span class="card-title-overline">{surtitre}</span>
      <span class="card-title">{titre}</span>
    </div>
    <div class="card-tags">
      {#each tags as tag}
        <span class="card-tag">{tag}</span>
      {/each}
    </div>
  </div>
  <div class="card-icon">
    {#if externe}
      <Icone nom="external-link-line" taille="sm" />
    {:else}
      <Icone nom="arrow-right-line" taille="sm" />
    {/if}
  </div>
</a>

<style lang="scss">
  @import "apparence-card.scss";
</style>
