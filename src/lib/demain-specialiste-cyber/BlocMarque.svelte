<script lang="ts">
  export let title: string;
  export let size: "sm" | "md" | "lg" | undefined = undefined;
</script>

<p class="fr-logo" class:size={`${size ? `fr-logo--${size}` : ""}`}>
  {title}
</p>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/component/logo/logo.main.min.css";
</style>
