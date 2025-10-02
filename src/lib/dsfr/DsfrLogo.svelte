<script lang="ts">
  import type { Size } from "$lib/types";

  type LogoSize = Extract<Size, "sm" | "md" | "lg">;
  interface Props {
    /** Titre du logo (nom de l'entité) */
    title: string;
    /** Taille du logo */
    size?: LogoSize;
  }

  let { title, size = "md" }: Props = $props();
</script>

<p class={["fr-logo", `fr-logo--${size}`]}>
  {@html title}
</p>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/logo/logo.min.css";

  @include set-shadow-host("inline-block");
  @include set-dsfr-sizing("logo");
</style>
