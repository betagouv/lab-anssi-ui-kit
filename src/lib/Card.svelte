<script lang="ts">
  import Tag from "$lib/lab/blog/Tag.svelte";
  import Fleche from "$lib/lab/icones/Fleche.svelte";
  import LienExterne from "$lib/lab/icones/LienExterne.svelte";

  export let title: string = "";
  export let label: string = "";
  export let tags: string[] = [];
  export let link: string = "";
  export let image: string = "";
  export let externalLink: boolean = false;

</script>

<div class="lab-card">
  <div class="lab-card__illustration">
    <img class="lab-card__image" src={image} alt={title} />
  </div>

  <div class="lab-card__content">
    <h3 class="lab-card__label">{label}</h3>

    <h2 class="lab-card__title">{title}</h2>

    <div class="lab-card__tags">
      {#each tags as tag, index (index)}
        <Tag {tag} />
      {/each}
    </div>

    <div class="lab-card__icon">
      {#if externalLink}
        <LienExterne/>
      {:else}
        <Fleche direction="droite" />
      {/if}
    </div>
  </div>

  <a class="lab-card__link" href="{link}" aria-label="{title}"></a>
</div>

<style lang="scss">
    @use "assets/card/styles";
</style>
