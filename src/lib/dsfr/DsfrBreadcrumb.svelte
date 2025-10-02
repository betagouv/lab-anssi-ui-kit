<svelte:options
  customElement={{
    tag: "dsfr-breadcrumb",
    props: {
      id: { attribute: "id", type: "String" },
      segments: { attribute: "segments", type: "Array" },
      buttonAriaLabel: { attribute: "button-aria-label", type: "String" },
      buttonLabel: { attribute: "button-label", type: "String" },
      markup: { attribute: "markup", type: "String" },
      inverse: { attribute: "inverse", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  type Segment = {
    id: string;
    label: string;
    href: string;
  };
  type Markup = "a" | "button";
  interface Props {
    /** Attribut 'id' du collapse du fil d'arianne */
    id: string;
    /** Liste des segments du fil d'arianne */
    segments: Segment[];
    /** Attribut 'aria-label' du bouton déclencheur */
    buttonAriaLabel: string;
    /** Texte du bouton déclencheur */
    buttonLabel: string;
    /** Variation inverse */
    inverse?: boolean;
    /** Tag html des boutons (default: a) */
    markup?: Markup;
  }

  let { id, segments = [], markup = "a", buttonAriaLabel, buttonLabel, inverse }: Props = $props();

  let isExpanded = $state(false);

  function isLastItem(index: number) {
    return index === segments.length - 1;
  }
</script>

<nav
  role="navigation"
  class={["fr-breadcrumb", { "fr-breadcrumb--inverse": inverse }]}
  aria-label={buttonAriaLabel}
>
  <button
    type="button"
    class="fr-breadcrumb__button"
    aria-expanded={isExpanded}
    aria-controls={id}
    onclick={() => (isExpanded = !isExpanded)}
  >
    {buttonLabel}
  </button>
  <div {id} class={["fr-collapse", { "fr-collapse--expanded": isExpanded }]}>
    <ol class="fr-breadcrumb__list">
      {#each segments as segment, index (segment.id)}
        <li>
          <svelte:element
            this={markup === "button" ? "button" : "a"}
            class="fr-breadcrumb__link"
            id={segment.id}
            type={markup === "button" ? "button" : undefined}
            href={markup === "a" && !isLastItem(index) ? segment.href : undefined}
            aria-current={isLastItem(index) ? "page" : undefined}
          >
            {segment.label}
          </svelte:element>
        </li>
      {/each}
    </ol>
  </div>
</nav>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/dist/core/core.min.css";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/breadcrumb/breadcrumb.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("breadcrumb");

  .fr-breadcrumb {
    &--inverse {
      --text-mention-grey: var(--grey-1000-50);
      --text-default-grey: var(--grey-1000-50);
    }
  }
</style>
