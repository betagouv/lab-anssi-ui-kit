<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  export let title: string;
  export let hasDetailStart: boolean = false;
  export let detailStart: string | undefined = undefined;
  export let hasTag: boolean = false;
  export let href: string | undefined = "#";
  export let blank: boolean = false;
  export let size: "sm" | "md" | "lg" | undefined = "sm";
  export let src: string | undefined = undefined;
  export let alt: string | undefined = "";
  export let tagItems: string[] | undefined = undefined;
  export let badgeItems: string[] | undefined = undefined;
</script>

<div class={`fr-card fr-enlarge-link dsc-card ${size ? `fr-card--${size}` : ""}`}>
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title fr-mb-7v dsc-card__title">
        <a
          {href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
        >
          {title}
        </a>
      </h3>
      {#if hasDetailStart && detailStart}
        <div class="fr-card__start">
          <p class="fr-card__detail fr-text--sm fr-mb-0">{detailStart}</p>
        </div>
      {/if}
      <!-- TAGS -->
      {#if hasTag && tagItems && tagItems.length > 0}
        <ul class="fr-tags-group fr-tags-group--sm dsc-card__tags-group">
          {#each tagItems as tag}
            <li>
              <p class="fr-tag fr-tag--défaut">{tag}</p>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img dsc-card__visual">
      <img
        class="fr-responsive-img dsc-card__img"
        src={srcAsset(`${src || "/illustrations/placeholder.16x9.png"}`)}
        {alt}
      />
    </div>
    <!-- BADGES -->
    {#if badgeItems && badgeItems.length > 0}
      <ul class="fr-badges-group">
        {#each badgeItems ?? [] as badge}
          <li>
            <p class="fr-badge fr-icon-booklet-fill fr-badge--icon-left fr-badge--purple-glycine">
              {badge}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  .dsc-card {
    &__title {
      font-size: 1.25rem; // 20px
      line-height: 2rem; // 32px
    }

    &__visual {
      aspect-ratio: 1.7777777778;
      background-color: #f4f4f4;
      position: relative;
      overflow: hidden;
    }

    &__img {
      box-shadow: 0px 6px 18px 0px rgba(0, 0, 18, 0.16);
      position: absolute;
      top: 20%; // 32px
      width: calc((234 * 100 / 282) * 1%);
      left: 50%;
      transform: translateX(-50%);
      transition: top 0.4s;
    }

    &__tags-group {
      order: 3;

      > li {
        line-height: initial;
      }
    }

    &:hover {
      .dsc-card__img {
        top: 17%; // 27px
      }
    }
  }
</style>
