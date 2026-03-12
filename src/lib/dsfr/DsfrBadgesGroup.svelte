<svelte:options
  customElement={{
    tag: "dsfr-badges-group",
    props: {
      badges: { attribute: "badges", type: "Array" },
      size: { attribute: "size", type: "String" },
      groupMarkup: { attribute: "group-markup", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type BadgesGroupSize = Extract<Size, "sm" | "md">;
  type GroupMarkup = "div" | "ul";
  type Badge = {
    label: string;
    accent?: Accent;
    hasIcon?: boolean;
    hasNoIcon?: boolean;
    ellipsis?: boolean;
    icon?: string;
  };
  interface Props {
    /** Liste des badges à afficher dans le groupe */
    badges: Badge[];
    /** Taille du badge */
    size?: BadgesGroupSize;
    /** Type de balise HTML pour la liste du groupe de badges */
    groupMarkup?: GroupMarkup;
  }

  let { badges, size = "md", groupMarkup = "ul" }: Props = $props();

  let sizeClass = $derived(`fr-badges-group--${size}`);
</script>

{#snippet badgeItem(badge: Badge)}
  {@const iconClass =
    badge.hasIcon && badge.icon && `fr-badge--icon-left ${setIconClass(badge.icon)}`}
  <p class={["fr-badge", `fr-badge--${badge.accent}`, iconClass]}>
    {#if badge.ellipsis}
      <span class="fr-ellipsis">{badge.label}</span>
    {:else}
      {badge.label}
    {/if}
  </p>
{/snippet}

<svelte:element this={groupMarkup} class={["fr-badges-group", sizeClass]}>
  {#each badges as badge}
    {#if groupMarkup === "ul"}
      <li>
        {@render badgeItem(badge)}
      </li>
    {:else}
      {@render badgeItem(badge)}
    {/if}
  {/each}
</svelte:element>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/display/module/ellipsis";
  @import "@gouvfr/dsfr/src/dsfr/utility/icons/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/badge/badge.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("badges-group");
</style>
