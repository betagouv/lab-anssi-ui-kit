<svelte:options
  customElement={{
    tag: "dsfr-highlight",
    props: {
      text: { attribute: "text", type: "String" },
      id: { attribute: "id", type: "String" },
      size: { attribute: "size", type: "String" },
      accent: { attribute: "accent", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";

  type HighlightSize = Extract<Size, "sm" | "md" | "lg">;
  interface Props {
    /** Contenu texte de la mise en exergue */
    text: string;
    /** Attribut id de la mise en exergue */
    id?: string;
    /** Taille du texte de la mise en exergue */
    size?: HighlightSize;
    /** Couleur d'accentuation */
    accent?: Accent;
  }

  let { text, id, size = "md", accent }: Props = $props();

  const accentClass = $derived(accent && `fr-highlight--${accent}`);
</script>

{#if text}
  <div {id} class={["fr-highlight", accentClass]}>
    <slot name="title"></slot>
    <p class={`fr-text--${size}`}>{text}</p>
  </div>
{/if}

<style lang="scss">
  // DSFR Core styles
  // @import "@gouvfr/dsfr/dist/core/core.min.css";
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/font-weight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/typography";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/highlight/highlight.main.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("highlight");
</style>
